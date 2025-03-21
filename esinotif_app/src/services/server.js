import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql";
import fs from 'fs';
import path from 'path';
dotenv.config();

import admin from 'firebase-admin';
// Lire le fichier JSON avec fs
const serviceAccountPath = path.resolve('./serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à MySQL :", err);
  } else {
    console.log("Connecté à MySQL");
  }
});

// Route pour vérifier les informations de connexion
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Tentative de connexion avec :", email, password); // Log des données reçues

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    db.query("SELECT * FROM admins WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Erreur lors de la requête SQL :", err); // Log des erreurs SQL
        return res.status(500).json({ message: "Erreur serveur." });
      }

      if (results.length === 0) {
        console.log("Aucun utilisateur trouvé avec cet email :", email); // Log si l'email n'existe pas
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
      }

      const admin = results[0];
      console.log("Utilisateur trouvé :", admin); // Log des données de l'utilisateur

      // Comparaison du mot de passe en texte brut
      if (password !== admin.password) {
        console.log("Mot de passe incorrect pour l'email :", email); // Log si le mot de passe est incorrect
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
      }

      // Connexion réussie
      res.status(200).json({ message: "Connexion réussie", adminId: admin.id });
    });
  } catch (error) {
    console.error("Erreur serveur :", error); // Log des erreurs générales
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Route pour récupérer les groupes depuis la base de données
app.get("/groups", (req, res) => {
  db.query("SELECT nom FROM groupes", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des groupes :", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }

    // Renvoyer les noms des groupes
    const groups = results.map((row) => row.nom);
    res.status(200).json(groups);
  });
});

// Route pour récupérer les cours depuis la base de données
app.get("/courses", (req, res) => {
  db.query("SELECT nom FROM cours", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des cours :", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }

    // Renvoyer les noms des cours
    const courses = results.map((row) => row.nom);
    res.status(200).json(courses);
  });
});


// Route pour envoyer des notifications
app.post('/send-notification', async (req, res) => {
  const { type, ...notificationData } = req.body;

  // Envoyer la notification à un topic (par exemple, "all_devices")
  const topic = 'all_devices';

  // Construire le message
  const message = {
    notification: {
      title: 'Nouvelle notification',
      body: `Type: ${type}, Cours: ${notificationData.courseName}`,
    },
    data: {
      type: type,
      ...notificationData,
    },
    topic: topic, // Envoyer à tous les appareils abonnés à ce topic
  };

  try {
    // Utiliser `send` au lieu de `sendToTopic`
    const response = await admin.messaging().send(message);
    console.log('Notification envoyée avec succès :', response);
    res.status(200).json({ message: "Notification envoyée avec succès", response });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});
// Lancer le serveur sur le port 5000
app.listen(5000, () => {
  console.log("Serveur backend démarré sur le port 5000");
});