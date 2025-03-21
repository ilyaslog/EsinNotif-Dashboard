import React, { useState } from 'react';
import { Calendar, Clock, Users, GraduationCap, Building2, Pencil, Trash2 } from 'lucide-react';
import { Course, DAYS, TIME_SLOTS, GROUPS, TimeSlot } from '../constants/types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TimeTable() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState(GROUPS[0].id);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAddCourse = (day: string, timeSlot: TimeSlot) => {
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      professor: '',
      room: '',
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      group: selectedGroup,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      day: day
    };
    setEditingCourse(newCourse);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
  };

  const handleSaveCourse = (course: Course) => {
    if (editingCourse) {
      setCourses(prev => [...prev.filter(c => c.id !== editingCourse.id), course]);
    } else {
      setCourses(prev => [...prev, course]);
    }
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#167BB4]">Emploi du Temps</h1>
          {/* Bouton Retour */}
          <button 
            onClick={() => navigate(-1)} 
            className="mb-4 flex items-center space-x-2 px-4 py-2 rounded-lg text-white" 
            style={{ backgroundColor: '#167BB4' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <div className="flex items-center space-x-4">
            <Users className="text-[#167BB4]" />
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#167BB4]"
            >
              {GROUPS.map(group => (
                <option key={group.id} value={group.id}>
                  {group.id} - {group.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-7 gap-0">
            <div className="bg-[#167BB4] text-white p-4">Horaire</div>
            {DAYS.map(day => (
              <div key={day} className="bg-[#167BB4] text-white p-4 text-center font-medium">
                {day}
              </div>
            ))}

            {TIME_SLOTS.map((timeSlot, i) => (
              <React.Fragment key={i}>
                <div className="border p-4 bg-gray-50">
                  {timeSlot.start} - {timeSlot.end}
                </div>
                {DAYS.map(day => (
                  <div
                    key={`${day}-${timeSlot.start}`}
                    className="border p-2 min-h-[120px] relative cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleAddCourse(day, timeSlot)}
                  >
                    {courses
                      .filter(course => 
                        course.group === selectedGroup &&
                        course.startTime === timeSlot.start &&
                        course.day === day
                      )
                      .map(course => (
                        <div
                          key={course.id}
                          className="absolute inset-1 rounded-lg p-2 text-sm group"
                          style={{ backgroundColor: course.color + '20', borderLeft: `4px solid ${course.color}` }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="font-medium mb-1">{course.name}</div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <GraduationCap size={14} />
                            <span>{course.professor}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Building2 size={14} />
                            <span>{course.room}</span>
                          </div>
                          <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditCourse(course)}
                              className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {editingCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingCourse.id ? 'Modifier le cours' : 'Ajouter un cours'}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveCourse({
                    ...editingCourse,
                    name: formData.get('name') as string,
                    professor: formData.get('professor') as string,
                    room: formData.get('room') as string,
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Nom du cours</label>
                  <input
                    name="name"
                    defaultValue={editingCourse.name}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Professeur</label>
                  <input
                    name="professor"
                    defaultValue={editingCourse.professor}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Salle</label>
                  <input
                    name="room"
                    defaultValue={editingCourse.room}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#167BB4] text-white rounded-lg hover:bg-[#1369a0]"
                  >
                    {editingCourse.id ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}