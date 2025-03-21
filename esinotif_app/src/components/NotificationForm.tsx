import React, { useState } from 'react';
import type { NotificationType, Notification } from '../constants/Notification';

const NOTIFICATION_TYPES: { [key in NotificationType]: string } = {
  course_cancellation: 'Annulation de cours',
  room_change: 'Changement de salle',
  schedule_change: 'Modification d\'horaire',
  exceptional_course: 'Ajout d\'un cours exceptionnel',
  deadline_reminder: 'Rappel d\'une échéance importante',
  general_info: 'Informations administratives générales'
};

export function NotificationForm() {
  const [type, setType] = useState<NotificationType>('general_info');
  const [formData, setFormData] = useState<any>({});
  const [notificationResponse, setNotificationResponse] = useState<any>(null); // État pour stocker la réponse du serveur

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const notification: Notification = {
      ...formData,
      type, // Inclure uniquement le type et les données du formulaire
    };

    try {
      const response = await fetch("http://localhost:5000/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Notification envoyée avec succès :", data);
        setNotificationResponse(data); // Stocker la réponse du serveur
        setFormData({}); // Réinitialiser les données du formulaire
      } else {
        console.error("Erreur lors de l'envoi de la notification");
        setNotificationResponse(null); // Réinitialiser la réponse en cas d'erreur
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setNotificationResponse(null); // Réinitialiser la réponse en cas d'erreur
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'course_cancellation':
        return (
          <>
            <input
              type="text"
              placeholder="Nom du cours"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <textarea
              placeholder="Motif (facultatif)"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </>
        );

      case 'room_change':
        return (
          <>
            <input
              type="text"
              placeholder="Nom du cours"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            />
            <input
              type="datetime-local"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            />
            <input
              type="text"
              placeholder="Ancienne salle"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, oldRoom: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nouvelle salle"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, newRoom: e.target.value })}
            />
          </>
        );

      case 'schedule_change':
        return (
          <>
            <input
              type="text"
              placeholder="Nom du cours"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            />
            <input
              type="datetime-local"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, oldDateTime: e.target.value })}
            />
            <input
              type="datetime-local"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, newDateTime: e.target.value })}
            />
            <textarea
              placeholder="Motif (facultatif)"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </>
        );

      case 'exceptional_course':
        return (
          <>
            <input
              type="text"
              placeholder="Nom du cours"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            />
            <input
              type="datetime-local"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            />
            <input
              type="text"
              placeholder="Salle"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            />
            <input
              type="text"
              placeholder="Professeur"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
            />
          </>
        );

      case 'deadline_reminder':
        return (
          <>
            <input
              type="text"
              placeholder="Nom de l'échéance"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="datetime-local"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
            <textarea
              placeholder="Détails supplémentaires"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            />
          </>
        );

      case 'general_info':
        return (
          <>
            <input
              type="text"
              placeholder="Titre du message"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Contenu détaillé"
              className="w-full p-2 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#167BB4' }}>
          Type de notification
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as NotificationType)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}
        >
          {Object.entries(NOTIFICATION_TYPES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {renderFormFields()}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded transition-colors"
        style={{ 
          backgroundColor: '#167BB4',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Envoyer la notification
      </button>

      {/* Afficher les informations de la notification envoyée */}
      {notificationResponse && (
        <div className="mt-6 p-4 border rounded" style={{ borderColor: '#9F9E9E', backgroundColor: '#fff' }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#167BB4' }}>Notification envoyée avec succès</h3>
          <pre className="text-sm" style={{ color: '#9F9E9E' }}>
            {JSON.stringify(notificationResponse, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}

export default NotificationForm;