export interface Course {
    id: string;
    name: string;
    professor: string;
    room: string;
    startTime: string;
    endTime: string;
    group: string;
    color: string;
    day: string;
  }
  
  export type TimeSlot = {
    start: string;
    end: string;
  };
  
  export type Group = {
    id: string;
    name: string;
  };
  
  export const GROUPS: Group[] = [
    { id: 'ING4-GL-2425', name: 'Génie Logiciel' },
    { id: 'ING4-CYB-2425', name: 'Cybersécurité' },
    { id: 'ING4-IA-2425', name: 'Intelligence Artificielle' },
    { id: 'ING4-CCV-2425', name: 'Cloud Computing et Virtualisation' },
  ];
  
  export const TIME_SLOTS: TimeSlot[] = [
    { start: '08:30', end: '10:30' },
    { start: '10:30', end: '12:30' },
    { start: '14:00', end: '16:00' },
    { start: '16:00', end: '18:00' },
  ];
  
  export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];