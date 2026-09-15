import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { LoginView } from './components/LoginView';
import { StudentDashboard } from './components/StudentDashboard';
import { ScreeningView } from './components/ScreeningView';
import { ScreeningResultView } from './components/ScreeningResultView';
import { TeacherProfileView } from './components/TeacherProfileView';
import { ConsultationView } from './components/ConsultationView';
import { ScheduleView } from './components/ScheduleView';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { PrivacyView } from './components/PrivacyView';
import { StudentProfileView } from './components/StudentProfileView';
import { motion, AnimatePresence } from 'motion/react';

const MainContent: React.FC = () => {
  const { currentUser, activeTab } = useApp();

  if (!currentUser || activeTab === 'login') {
    return <LoginView />;
  }

  const renderCurrentView = () => {
    // 1. Siswa Views
    if (currentUser.role === 'siswa') {
      switch (activeTab) {
        case 'screening':
          return <ScreeningView key="screening" />;
        case 'hasil_screening':
          return <ScreeningResultView key="hasil_screening" />;
        case 'profil_guru':
          return <TeacherProfileView key="profil_guru" />;
        case 'konsultasi':
          return <ConsultationView key="konsultasi" />;
        case 'jadwal':
          return <ScheduleView key="jadwal" />;
        case 'privasi':
          return <PrivacyView key="privasi" />;
        case 'profil':
          return <StudentProfileView key="profil" />;
        case 'dashboard':
        default:
          return <StudentDashboard key="dashboard" />;
      }
    }

    // 2. Guru BK Views
    if (currentUser.role === 'guru_bk') {
      switch (activeTab) {
        case 'privasi':
          return <PrivacyView key="privasi" />;
        case 'profil':
          return <StudentProfileView key="profil" />;
        case 'dashboard':
        case 'konsultasi':
        case 'screening_data':
        case 'jadwal':
        default:
          return <TeacherDashboardView key="teacher_dashboard" />;
      }
    }

    // 3. Admin Sekolah Views
    if (currentUser.role === 'admin') {
      switch (activeTab) {
        case 'privasi':
          return <PrivacyView key="privasi" />;
        case 'profil':
          return <StudentProfileView key="profil" />;
        case 'dashboard':
        case 'pengaturan_sekolah':
        case 'kelola_guru':
        default:
          return <AdminDashboardView key="admin_dashboard" />;
      }
    }

    return <StudentDashboard key="fallback" />;
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-' + (currentUser?.role || 'anon')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
