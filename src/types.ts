export type UserRole = 'siswa' | 'guru_bk' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email?: string;
  avatarUrl?: string;
  // Siswa specific
  studentClass?: string;
  nis?: string;
  nisn?: string;
  // Guru BK specific
  teacherId?: string;
  nip?: string;
  title?: string;
  phone?: string;
  officeLocation?: string;
  workHours?: string;
}

export type ScreeningOptionValue = 0 | 1 | 2 | 3 | 4;

export interface ScreeningOption {
  label: string;
  value: ScreeningOptionValue;
}

export interface ScreeningQuestion {
  id: string;
  topic: 'belajar' | 'lingkungan_sekolah' | 'pertemanan' | 'perasaan' | 'motivasi' | 'harian';
  topicLabel: string;
  topicIcon: string;
  text: string;
  helperText?: string;
}

export type ScreeningCategory = 'baik' | 'perhatian' | 'konsultasi';

export interface ScreeningResultCategoryInfo {
  category: ScreeningCategory;
  title: string;
  badgeClass: string;
  textClass: string;
  bgClass: string;
  description: string;
  advice: string[];
}

export interface ScreeningSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  answers: Record<string, ScreeningOptionValue>; // questionId -> value
  totalScore: number;
  maxScore: number;
  category: ScreeningCategory;
  submittedAt: string;
  teacherNote?: string;
  followedUp?: boolean;
}

export type ConsultationTopic = 
  | 'belajar'
  | 'pertemanan'
  | 'masalah_sekolah'
  | 'motivasi'
  | 'kekhawatiran'
  | 'lainnya';

export type ConsultationStatus = 
  | 'menunggu'
  | 'disetujui'
  | 'terjadwal'
  | 'selesai'
  | 'dibatalkan';

export interface ConsultationRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  teacherId: string;
  teacherName: string;
  topic: ConsultationTopic;
  message: string;
  preferredDays?: string;
  status: ConsultationStatus;
  createdAt: string;
  scheduledDate?: string; // YYYY-MM-DD
  scheduledDayName?: string; // e.g. "Selasa"
  scheduledTime?: string; // e.g. "10.00 - 10.45 WIB"
  location?: string; // e.g. "Ruang Konseling BK - Bilik 1"
  teacherNotes?: string;
  meetingSummary?: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  nip: string;
  title: string;
  room: string;
  serviceHours: string;
  officialPhone: string;
  avatarUrl: string;
  bio: string;
  assignedClasses: string[];
  activeDays: string[];
}

export interface SchoolSettings {
  schoolName: string;
  schoolLevel: string;
  officialBkPhone: string;
  roomLocation: string;
  serviceHours: string;
  academicYear: string;
  emergencyContact: string;
  privacyNotice: string;
}

export interface AppNotification {
  id: string;
  targetRole: UserRole;
  targetUserId?: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  linkTab?: string;
}
