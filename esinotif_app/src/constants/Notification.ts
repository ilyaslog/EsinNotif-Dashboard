export type NotificationType = 
  | 'course_cancellation'
  | 'room_change'
  | 'schedule_change'
  | 'exceptional_course'
  | 'deadline_reminder'
  | 'general_info';

export type StudentGroup = string; // Define StudentGroup as a string

export interface BaseNotification {
  type: NotificationType;
}

export interface CourseCancellation extends BaseNotification {
  type: 'course_cancellation';
  courseName: string;
  date: string;
  reason?: string;
}

export interface RoomChange extends BaseNotification {
  type: 'room_change';
  courseName: string;
  dateTime: string;
  oldRoom: string;
  newRoom: string;
}

export interface ScheduleChange extends BaseNotification {
  type: 'schedule_change';
  courseName: string;
  oldDateTime: string;
  newDateTime: string;
  reason?: string;
}

export interface ExceptionalCourse extends BaseNotification {
  type: 'exceptional_course';
  courseName: string;
  dateTime: string;
  room: string;
  professor: string;
}

export interface DeadlineReminder extends BaseNotification {
  type: 'deadline_reminder';
  title: string;
  dueDate: string;
  details: string;
}

export interface GeneralInfo extends BaseNotification {
  type: 'general_info';
  title: string;
  content: string;
}

export type Notification = 
  | CourseCancellation 
  | RoomChange 
  | ScheduleChange 
  | ExceptionalCourse 
  | DeadlineReminder 
  | GeneralInfo;