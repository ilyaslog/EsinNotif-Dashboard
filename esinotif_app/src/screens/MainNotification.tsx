import { NotificationForm } from '../components/NotificationForm';
import { Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MainNotification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button 
            onClick={() => navigate(-1)} 
            className="mb-4 flex items-center space-x-2 px-4 py-2 rounded-lg text-white" 
            style={{ backgroundColor: '#167BB4' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-8">
            <Bell className="w-8 h-8" style={{ color: '#167BB4' }} />
            <h1 className="text-2xl font-bold" style={{ color: '#167BB4' }}>
              Système de notification des étudiants
            </h1>
          </div>
          
          <NotificationForm />
        </div>
      </div>
    </div>
  );
}

export default MainNotification;
