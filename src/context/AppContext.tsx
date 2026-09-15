import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  ScreeningSubmission,
  ConsultationRequest,
  TeacherProfile,
  SchoolSettings,
  AppNotification,
  ScreeningCategory,
  ScreeningOptionValue,
  ConsultationTopic,
} from '../types';
import {
  DEFAULT_USERS,
  DEFAULT_TEACHERS,
  DEFAULT_SCHOOL_SETTINGS,
  INITIAL_SUBMISSIONS,
  INITIAL_CONSULTATIONS,
  INITIAL_NOTIFICATIONS,
  SCREENING_QUESTIONS,
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // Auth
  loginAsRole: (role: UserRole, customData?: Partial<User>) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  // Screening
  submissions: ScreeningSubmission[];
  studentSubmissions: ScreeningSubmission[];
  submitScreening: (answers: Record<string, ScreeningOptionValue>) => ScreeningSubmission;
  updateSubmissionTeacherNote: (submissionId: string, note: string) => void;
  // Consultations
  consultations: ConsultationRequest[];
  studentConsultations: ConsultationRequest[];
  teacherConsultations: ConsultationRequest[];
  createConsultationRequest: (
    topic: ConsultationTopic,
    message: string,
    teacherId: string,
    preferredDays?: string
  ) => ConsultationRequest;
  updateConsultation: (
    id: string,
    updates: Partial<ConsultationRequest>
  ) => void;
  // Teachers & School Settings
  teachers: TeacherProfile[];
  schoolSettings: SchoolSettings;
  updateSchoolSettings: (settings: Partial<SchoolSettings>) => void;
  updateTeacherProfile: (teacher: TeacherProfile) => void;
  updateTeacherPhone: (teacherId: string, phone: string, alsoSetAsSchoolPhone?: boolean) => void;
  // Notifications
  notifications: AppNotification[];
  unreadNotifsCount: number;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'sahabat_bk_user',
  SUBMISSIONS: 'sahabat_bk_submissions',
  CONSULTATIONS: 'sahabat_bk_consultations',
  TEACHERS: 'sahabat_bk_teachers',
  SETTINGS: 'sahabat_bk_settings',
  NOTIFICATIONS: 'sahabat_bk_notifications',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name?.includes('Siti Nurhaliza')) {
          return DEFAULT_USERS.find(u => u.id === 'guru-1') || DEFAULT_USERS[1];
        }
        if (parsed.email?.includes('sekolah.sch.id')) {
          parsed.email = parsed.email.replace('sekolah.sch.id', 'mtsn2bombana.sch.id');
        }
        return parsed;
      } catch (e) { console.error(e); }
    }
    return DEFAULT_USERS[0]; // Start logged in as Siswa (Ana) for immediate pleasant preview
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Submissions
  const [submissions, setSubmissions] = useState<ScreeningSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SUBMISSIONS;
  });

  // Consultations
  const [consultations, setConsultations] = useState<ConsultationRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONSULTATIONS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(c => {
            if (c.teacherName?.includes('Siti Nurhaliza')) {
              return { ...c, teacherName: 'Ibu Hasni', location: c.location?.includes('MTsN') ? c.location : 'Ruang BK MTsN 2 Bombana' };
            }
            return c;
          });
        }
        return parsed;
      } catch (e) { console.error(e); }
    }
    return INITIAL_CONSULTATIONS;
  });

  // Teachers
  const [teachers, setTeachers] = useState<TeacherProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If old demo teachers exist in storage, migrate smoothly to new teachers
        if (Array.isArray(parsed) && parsed.some(t => t.name?.includes('Siti Nurhaliza') || t.name?.includes('Dimas Wicaksono'))) {
          return DEFAULT_TEACHERS;
        }
        return parsed;
      } catch (e) { console.error(e); }
    }
    return DEFAULT_TEACHERS;
  });

  // School Settings
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If old demo school name exists in storage, migrate to MTsN 2 Bombana
        if (parsed.schoolName?.includes('SMP Negeri 1')) {
          return DEFAULT_SCHOOL_SETTINGS;
        }
        return parsed;
      } catch (e) { console.error(e); }
    }
    return DEFAULT_SCHOOL_SETTINGS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Sync to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(schoolSettings));
  }, [schoolSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Auth actions
  const loginAsRole = (role: UserRole, customData?: Partial<User>) => {
    const defaultForRole = DEFAULT_USERS.find(u => u.role === role) || DEFAULT_USERS[0];
    const newUser: User = {
      ...defaultForRole,
      ...customData,
      role,
      id: customData?.id || defaultForRole.id,
      name: customData?.name || defaultForRole.name,
    };
    setCurrentUser(newUser);
    setActiveTab('dashboard');
  };

  const switchRole = (role: UserRole) => {
    const targetUser = DEFAULT_USERS.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      setActiveTab('dashboard');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('login');
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });

    if (updates.name && currentUser) {
      const newName = updates.name;
      setSubmissions(prev =>
        prev.map(s => (s.studentId === currentUser.id ? { ...s, studentName: newName } : s))
      );
      setConsultations(prev =>
        prev.map(c => (c.studentId === currentUser.id ? { ...c, studentName: newName } : c))
      );
    }
  };

  // Screening Submission
  const submitScreening = (answers: Record<string, ScreeningOptionValue>): ScreeningSubmission => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);
    const maxScore = SCREENING_QUESTIONS.length * 4;

    let category: ScreeningCategory = 'baik';
    const scorePct = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    if (scorePct >= 60) {
      category = 'konsultasi';
    } else if (scorePct >= 30) {
      category = 'perhatian';
    } else {
      category = 'baik';
    }

    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newSubmission: ScreeningSubmission = {
      id: `sub-${Date.now()}`,
      studentId: currentUser?.id || 'siswa-1',
      studentName: currentUser?.name || 'Ana Zahra Maharani',
      studentClass: currentUser?.studentClass || 'VIII-B',
      answers,
      totalScore,
      maxScore,
      category,
      submittedAt: dateStr,
      followedUp: false,
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    // Send notification to Guru BK
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'guru_bk',
      targetUserId: 'guru-1',
      title: 'Screening Masuk dari ' + newSubmission.studentName,
      message: `Siswa ${newSubmission.studentName} (${newSubmission.studentClass}) telah menyelesaikan screening dengan status ${
        category === 'konsultasi' ? 'Disarankan Konsultasi' : category === 'perhatian' ? 'Perlu Perhatian' : 'Kondisi Baik'
      }.`,
      createdAt: dateStr,
      read: false,
      linkTab: 'screening_data',
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newSubmission;
  };

  const updateSubmissionTeacherNote = (submissionId: string, note: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId
          ? { ...sub, teacherNote: note, followedUp: true }
          : sub
      )
    );
  };

  // Consultations
  const createConsultationRequest = (
    topic: ConsultationTopic,
    message: string,
    teacherId: string,
    preferredDays?: string
  ): ConsultationRequest => {
    const teacher = teachers.find(t => t.id === teacherId) || teachers[0];
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newReq: ConsultationRequest = {
      id: `cons-${Date.now()}`,
      studentId: currentUser?.id || 'siswa-1',
      studentName: currentUser?.name || 'Ana Zahra Maharani',
      studentClass: currentUser?.studentClass || 'VIII-B',
      teacherId: teacher.id,
      teacherName: teacher.name,
      topic,
      message,
      preferredDays,
      status: 'menunggu',
      createdAt: dateStr,
    };

    setConsultations(prev => [newReq, ...prev]);

    // Notification for Guru BK
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'guru_bk',
      targetUserId: teacher.id,
      title: 'Permintaan Konsultasi Baru 🔔',
      message: `${newReq.studentName} (${newReq.studentClass}) meminta konsultasi mengenai topik: ${topic.replace('_', ' ')}.`,
      createdAt: dateStr,
      read: false,
      linkTab: 'konsultasi',
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newReq;
  };

  const updateConsultation = (id: string, updates: Partial<ConsultationRequest>) => {
    setConsultations(prev =>
      prev.map(c => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          // If status changed to terjadwal, notify student
          if (updates.status === 'terjadwal' && c.status !== 'terjadwal') {
            const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
            const studentNotif: AppNotification = {
              id: `notif-${Date.now()}`,
              targetRole: 'siswa',
              targetUserId: c.studentId,
              title: 'Jadwal Konsultasi Dikonfirmasi! ✅',
              message: `${c.teacherName} telah menjadwalkan pertemuan pada ${updates.scheduledDayName || 'hari yang disepakati'} pukul ${updates.scheduledTime || 'waktu yang ditentukan'} di ${updates.location || 'Ruang BK'}.`,
              createdAt: dateStr,
              read: false,
              linkTab: 'jadwal',
            };
            setNotifications(p => [studentNotif, ...p]);
          }
          return updated;
        }
        return c;
      })
    );
  };

  // Settings
  const updateSchoolSettings = (newSettings: Partial<SchoolSettings>) => {
    setSchoolSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateTeacherProfile = (updatedTeacher: TeacherProfile) => {
    setTeachers(prev =>
      prev.map(t => (t.id === updatedTeacher.id ? updatedTeacher : t))
    );
  };

  const updateTeacherPhone = (teacherId: string, phone: string, alsoSetAsSchoolPhone?: boolean) => {
    setTeachers(prev =>
      prev.map(t => (t.id === teacherId ? { ...t, officialPhone: phone } : t))
    );
    if (currentUser && (currentUser.teacherId === teacherId || currentUser.id === teacherId)) {
      setCurrentUser(prev => prev ? { ...prev, phone } : null);
    }
    if (alsoSetAsSchoolPhone) {
      setSchoolSettings(prev => ({ ...prev, officialBkPhone: phone }));
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Role filtered data (ensuring strict confidentiality rules)
  // Siswa: ONLY see their own submissions & consultations!
  const studentSubmissions = submissions.filter(
    s => s.studentId === currentUser?.id
  );

  const studentConsultations = consultations.filter(
    c => c.studentId === currentUser?.id
  );

  // Guru BK: see requests assigned to them or their classes
  const teacherConsultations = consultations.filter(
    c => currentUser?.role === 'admin' || c.teacherId === currentUser?.id || currentUser?.role === 'guru_bk'
  );

  const unreadNotifsCount = notifications.filter(
    n => !n.read && (n.targetRole === currentUser?.role || n.targetUserId === currentUser?.id)
  ).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeTab,
        setActiveTab,
        loginAsRole,
        logout,
        switchRole,
        updateCurrentUser,
        submissions,
        studentSubmissions,
        submitScreening,
        updateSubmissionTeacherNote,
        consultations,
        studentConsultations,
        teacherConsultations,
        createConsultationRequest,
        updateConsultation,
        teachers,
        schoolSettings,
        updateSchoolSettings,
        updateTeacherProfile,
        updateTeacherPhone,
        notifications,
        unreadNotifsCount,
        markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
