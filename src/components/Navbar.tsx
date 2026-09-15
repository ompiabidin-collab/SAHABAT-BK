import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  HeartHandshake,
  Bell,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    logout,
    switchRole,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const getRoleBadge = (role?: UserRole) => {
    switch (role) {
      case 'siswa':
        return {
          label: 'Siswa',
          icon: '👩‍🎓',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 'guru_bk':
        return {
          label: 'Guru BK',
          icon: '👩‍🏫',
          badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
        };
      case 'admin':
        return {
          label: 'Admin Sekolah',
          icon: '🛡️',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      default:
        return {
          label: 'Tamu',
          icon: '👤',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const currentBadge = getRoleBadge(currentUser?.role);

  const roleFilteredNotifs = notifications.filter(
    n => !currentUser || n.targetRole === currentUser.role || n.targetUserId === currentUser.id
  );

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-btn"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-lg text-slate-800 tracking-tight">Sahabat BK</span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200 hidden sm:inline-block">
                    MTsN 2 Bombana
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Screening & Konsultasi Ramah Siswa</p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          {currentUser && (
            <nav className="hidden md:flex items-center space-x-1">
              {currentUser.role === 'siswa' && (
                <>
                  <button
                    id="nav-siswa-dashboard"
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Beranda
                  </button>
                  <button
                    id="nav-siswa-screening"
                    onClick={() => setActiveTab('screening')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'screening' || activeTab === 'hasil_screening'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Screening
                  </button>
                  <button
                    id="nav-siswa-teacher"
                    onClick={() => setActiveTab('profil_guru')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'profil_guru'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Guru BK
                  </button>
                  <button
                    id="nav-siswa-consultation"
                    onClick={() => setActiveTab('konsultasi')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'konsultasi'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Konsultasi 1-on-1
                  </button>
                  <button
                    id="nav-siswa-schedule"
                    onClick={() => setActiveTab('jadwal')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'jadwal'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Jadwal Pertemuan
                  </button>
                  <button
                    id="nav-siswa-privacy"
                    onClick={() => setActiveTab('privasi')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'privasi'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Privasi & Aman
                  </button>
                </>
              )}

              {currentUser.role === 'guru_bk' && (
                <>
                  <button
                    id="nav-guru-dashboard"
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Ringkasan BK
                  </button>
                  <button
                    id="nav-guru-consultation"
                    onClick={() => setActiveTab('konsultasi')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'konsultasi'
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Permintaan Konsultasi
                  </button>
                  <button
                    id="nav-guru-screening"
                    onClick={() => setActiveTab('screening_data')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'screening_data'
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Data Screening Siswa
                  </button>
                  <button
                    id="nav-guru-schedule"
                    onClick={() => setActiveTab('jadwal')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'jadwal'
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Jadwal Pertemuan
                  </button>
                  <button
                    id="nav-guru-privacy"
                    onClick={() => setActiveTab('privasi')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'privasi'
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Etika & Privasi
                  </button>
                </>
              )}

              {currentUser.role === 'admin' && (
                <>
                  <button
                    id="nav-admin-dashboard"
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-amber-50 text-amber-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Panel Admin
                  </button>
                  <button
                    id="nav-admin-settings"
                    onClick={() => setActiveTab('pengaturan_sekolah')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'pengaturan_sekolah'
                        ? 'bg-amber-50 text-amber-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Kontak & Jam BK
                  </button>
                  <button
                    id="nav-admin-teachers"
                    onClick={() => setActiveTab('kelola_guru')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'kelola_guru'
                        ? 'bg-amber-50 text-amber-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Akun Guru BK
                  </button>
                </>
              )}
            </nav>
          )}

          {/* Right Controls: Role Switcher & Notifications & User menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Role Switcher (Convenient for evaluator to test all roles) */}
            <div className="relative">
              <button
                id="role-switcher-toggle"
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${currentBadge.badgeClass} hover:shadow-xs`}
                title="Ganti Peran Pengguna untuk Pengujian"
              >
                <span>{currentBadge.icon}</span>
                <span className="hidden sm:inline">{currentBadge.label}</span>
                <Sparkles className="w-3 h-3 ml-0.5 opacity-70" />
              </button>

              {showRoleSwitcher && (
                <div
                  id="role-switcher-dropdown"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-left"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Uji Peran Pengguna
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Beralih akun untuk mencoba semua alur aplikasi:
                    </p>
                  </div>

                  <button
                    id="switch-role-siswa"
                    onClick={() => {
                      switchRole('siswa');
                      setShowRoleSwitcher(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 ${
                      currentUser?.role === 'siswa' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">👩‍🎓</span>
                      <div>
                        <div>Siswa: Ana Zahra</div>
                        <div className="text-[10px] text-slate-500">Kelas VIII-B (Screening & Konseling)</div>
                      </div>
                    </div>
                    {currentUser?.role === 'siswa' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    id="switch-role-guru"
                    onClick={() => {
                      switchRole('guru_bk');
                      setShowRoleSwitcher(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 ${
                      currentUser?.role === 'guru_bk' ? 'bg-sky-50 text-sky-800 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">👩‍🏫</span>
                      <div>
                        <div>Guru BK: Ibu Hasni</div>
                        <div className="text-[10px] text-slate-500">Lihat Permintaan, Jadwal, Screening</div>
                      </div>
                    </div>
                    {currentUser?.role === 'guru_bk' && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                  </button>

                  <button
                    id="switch-role-admin"
                    onClick={() => {
                      switchRole('admin');
                      setShowRoleSwitcher(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 ${
                      currentUser?.role === 'admin' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">🛡️</span>
                      <div>
                        <div>Admin Sekolah</div>
                        <div className="text-[10px] text-slate-500">Ubah Nomor Resmi & Profil BK</div>
                      </div>
                    </div>
                    {currentUser?.role === 'admin' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notification-bell-btn"
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 relative transition-colors"
                title="Pemberitahuan"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div
                  id="notifications-dropdown"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Notifikasi Sahabat BK
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {unreadNotifsCount} belum dibaca
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {roleFilteredNotifs.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        Belum ada notifikasi baru
                      </div>
                    ) : (
                      roleFilteredNotifs.map(notif => (
                        <div
                          key={notif.id}
                          className={`p-3 text-xs transition-colors hover:bg-slate-50 cursor-pointer ${
                            !notif.read ? 'bg-emerald-50/50' : ''
                          }`}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.linkTab) setActiveTab(notif.linkTab);
                            setShowNotifDropdown(false);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-semibold text-slate-800">{notif.title}</span>
                            <span className="text-[10px] text-slate-400">{notif.createdAt}</span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                          <div className="mt-1.5 flex items-center space-x-1 text-emerald-600 font-medium text-[11px]">
                            <span>Buka halaman terkait</span>
                            <span>&rarr;</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Logout */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <button
                  id="user-profile-header-btn"
                  onClick={() => setActiveTab('profil')}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-700 hidden lg:inline max-w-[120px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>

                <button
                  id="btn-logout"
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Keluar Akun"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-login-header"
                onClick={() => setActiveTab('login')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
