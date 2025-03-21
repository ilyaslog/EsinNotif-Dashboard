import React, { useState, useEffect  } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styles du calendrier
import {
  Bell,
  Calendar as CalendarIcon,
  Clock,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquare,
  Search,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Configuration de moment pour le calendrier
const localizer = momentLocalizer(moment);

interface AppProps {
  onLogout: () => void; // Ajoutez cette prop
}

function App({ onLogout }: AppProps) {
  const [activeTab, setActiveTab] = useState('activities');
  const navigate = useNavigate();
  const [courses, setCourses] = useState<string[]>([]); // État pour stocker les cours

  // Récupérer les cours depuis l'API au chargement du composant
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data); // Mettre à jour l'état avec les cours récupérés
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des cours :", error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#167BB4] text-white p-6">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-semibold">
            FA
          </div>
        </div>
        
        <nav className="space-y-6">
          <button className="flex items-center space-x-3 w-full hover:bg-white/10 p-2 rounded"
          onClick={() => navigate('/notifications')}
          >
            <Bell size={20} />
            <span>Notifications</span>
          </button>
          <button 
            className="flex items-center space-x-3 w-full hover:bg-white/10 p-2 rounded"
            onClick={() => navigate('/timetable')} // Naviguer vers /timetable
          >
            <CalendarIcon size={20} />
            <span>Timetable</span>
          </button>
          <button className="flex items-center space-x-3 w-full hover:bg-white/10 p-2 rounded">
            <Mail size={20} />
            <span>Mailbox</span>
          </button>
          <button className="flex items-center space-x-3 w-full hover:bg-white/10 p-2 rounded">
            <Clock size={20} />
            <span>History</span>
          </button>
          <button className="flex items-center space-x-3 w-full hover:bg-white/10 p-2 rounded">
            <HelpCircle size={20} />
            <span>Help</span>
          </button>
          <button
            onClick={onLogout} // Appelez onLogout ici
            className="flex items-center space-x-3 w-full hover:bg-white/10 p-2 rounded mt-auto"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users or records..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#167BB4]"
          />
        </div>

        {/* Course Categories */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {courses.map((course) => (
            <button
              key={course}
              className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {course}
            </button>
          ))}
        </div>

        {/* Grid Layout for Users, Recent History, and Timetable */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Students</h2>
            <div className="space-y-4">
              {[
                { initials: 'EY', name: 'EL MOUKTANIA Yassine' },
                { initials: 'HI', name: 'Himit Ilyas' },
                { initials: 'ET', name: 'EL RHIRHAYI Taha' },
                { initials: 'ER', name: 'EL AMRANI Ranya' },
              ].map((user) => (
                <div key={user.name} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#167BB4]/10 flex items-center justify-center text-[#167BB4] font-medium">
                    {user.initials}
                  </div>
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-8">
            {/* Recent History */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent History</h2>
              <div className="space-y-4">
                {[
                  { action: 'Course cancelled', course: 'Web Development', time: '2h ago' },
                  { action: 'New enrollment', course: 'Design Thinking', time: '4h ago' },
                  { action: 'Schedule updated', course: 'Network Admin', time: '6h ago' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-gray-500">{item.course}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{item.time}</span>
                      <button className="text-[#167BB4] text-sm hover:underline">
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timetable (Calendar) */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Timetable</h2>
              <div style={{ height: '500px' }}>
                <Calendar
                  localizer={localizer}
                  defaultView="month" // Vue par défaut (mois, semaine, jour)
                  views={['month', 'week', 'day']} // Vues disponibles
                  events={[]} // Aucun événement pour l'instant
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Messages reçus</h2>
        
        <div className="flex space-x-2 mb-6">
          <button
            className={`flex-1 py-2 px-4 rounded ${
              activeTab === 'activities'
                ? 'bg-[#167BB4] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded ${
              activeTab === 'couriers'
                ? 'bg-[#167BB4] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab('couriers')}
          >
            Couriers
          </button>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Kenza Oufaska', avatar: '/images/Oufaska2.jpeg' },
            { name: 'Hanifi Majdouline', avatar: '/images/Hanifi2.jpeg' },
          ].map((user) => (
            <div key={user.name} className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;