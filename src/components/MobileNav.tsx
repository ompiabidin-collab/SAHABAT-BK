import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  ClipboardList,
  UserCheck,
  MessageCircle,
  Calendar,
  Shield,
  Settings,
  Users,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentUser, activeTab, setActiveTab } = useApp();

  if (!currentUser) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {currentUser.role === 'siswa' && (
          <>
            <button
              id="mobile-nav-home"
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'text-emerald-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Beranda</span>
            </button>

            <button
              id="mobile-nav-screening"
              onClick={() => setActiveTab('screening')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'screening' || activeTab === 'hasil_screening'
                  ? 'text-emerald-600 font-semibold'
                  : 'text-slate-500'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Screening</span>
            </button>

            <button
              id="mobile-nav-consultation"
              onClick={() => setActiveTab('konsultasi')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'konsultasi' ? 'text-emerald-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Konsultasi</span>
            </button>

            <button
              id="mobile-nav-schedule"
              onClick={() => setActiveTab('jadwal')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'jadwal' ? 'text-emerald-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Jadwal</span>
            </button>

            <button
              id="mobile-nav-teacher"
              onClick={() => setActiveTab('profil_guru')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'profil_guru' ? 'text-emerald-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <UserCheck className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Guru BK</span>
            </button>
          </>
        )}

        {currentUser.role === 'guru_bk' && (
          <>
            <button
              id="mobile-nav-guru-home"
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'text-sky-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Ringkasan</span>
            </button>

            <button
              id="mobile-nav-guru-consult"
              onClick={() => setActiveTab('konsultasi')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'konsultasi' ? 'text-sky-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Permintaan</span>
            </button>

            <button
              id="mobile-nav-guru-screening"
              onClick={() => setActiveTab('screening_data')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'screening_data' ? 'text-sky-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Screening</span>
            </button>

            <button
              id="mobile-nav-guru-schedule"
              onClick={() => setActiveTab('jadwal')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'jadwal' ? 'text-sky-600 font-semibold' : 'text-slate-500'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Jadwal</span>
            </button>
          </>
        )}

        {currentUser.role === 'admin' && (
          <>
            <button
              id="mobile-nav-admin-home"
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'text-amber-700 font-semibold' : 'text-slate-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Admin</span>
            </button>

            <button
              id="mobile-nav-admin-settings"
              onClick={() => setActiveTab('pengaturan_sekolah')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'pengaturan_sekolah' ? 'text-amber-700 font-semibold' : 'text-slate-500'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Kontak BK</span>
            </button>

            <button
              id="mobile-nav-admin-teachers"
              onClick={() => setActiveTab('kelola_guru')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                activeTab === 'kelola_guru' ? 'text-amber-700 font-semibold' : 'text-slate-500'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">Guru BK</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
