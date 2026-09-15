import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  HeartHandshake,
  GraduationCap,
  Sparkles,
  Lock,
  UserCheck,
  Shield,
  ArrowRight,
  Info,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginAsRole, schoolSettings } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('siswa');

  // Siswa Form State
  const [studentName, setStudentName] = useState('Ana Zahra Maharani');
  const [studentClass, setStudentClass] = useState('VIII-B');
  const [studentId, setStudentId] = useState('222308104');
  const [studentPassword, setStudentPassword] = useState('******');

  // Guru BK Form State
  const [teacherId, setTeacherId] = useState('BK-001');
  const [teacherPassword, setTeacherPassword] = useState('******');

  // Admin Form State
  const [adminId, setAdminId] = useState('ADMIN-01');
  const [adminPassword, setAdminPassword] = useState('******');

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('siswa', {
      name: studentName.trim() || 'Siswa Sahabat BK',
      studentClass: studentClass.trim() || 'VIII-B',
      nis: studentId.trim() || '222308104',
    });
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('guru_bk', {
      teacherId: teacherId.trim() || 'BK-001',
    });
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('admin', {
      id: adminId.trim() || 'admin-1',
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white text-center relative">
          <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center shadow-inner mb-3">
            <HeartHandshake className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Sahabat BK</h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xs mx-auto">
            {schoolSettings.schoolName} &bull; Screening &amp; Konsultasi Siswa
          </p>
        </div>

        {/* Role Tab Selector */}
        <div className="grid grid-cols-3 p-2 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          <button
            id="tab-role-siswa"
            onClick={() => setSelectedRole('siswa')}
            className={`py-2 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
              selectedRole === 'siswa'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👩‍🎓</span>
            <span>Siswa</span>
          </button>

          <button
            id="tab-role-guru"
            onClick={() => setSelectedRole('guru_bk')}
            className={`py-2 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
              selectedRole === 'guru_bk'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👩‍🏫</span>
            <span>Guru BK</span>
          </button>

          <button
            id="tab-role-admin"
            onClick={() => setSelectedRole('admin')}
            className={`py-2 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
              selectedRole === 'admin'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🛡️</span>
            <span>Admin</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {selectedRole === 'siswa' && (
            <form onSubmit={handleStudentSubmit} className="space-y-3.5">
              <div className="bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  Ruang bimbingan ramah siswa. Masukkan data kamu untuk memulai screening atau berkonsultasi secara aman.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Siswa</label>
                <input
                  id="input-siswa-nama"
                  type="text"
                  required
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  placeholder="Nama lengkap kamu"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kelas</label>
                  <select
                    id="input-siswa-kelas"
                    value={studentClass}
                    onChange={e => setStudentClass(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="VII-A">VII-A</option>
                    <option value="VII-B">VII-B</option>
                    <option value="VIII-A">VIII-A</option>
                    <option value="VIII-B">VIII-B</option>
                    <option value="VIII-C">VIII-C</option>
                    <option value="IX-A">IX-A</option>
                    <option value="IX-B">IX-B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">NIS/NISN atau ID</label>
                  <input
                    id="input-siswa-nis"
                    type="text"
                    required
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    placeholder="Nomor induk siswa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    id="input-siswa-password"
                    type="password"
                    required
                    value={studentPassword}
                    onChange={e => setStudentPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                    placeholder="••••••"
                  />
                  <Lock className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <button
                id="btn-submit-siswa"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>Masuk sebagai Siswa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {selectedRole === 'guru_bk' && (
            <form onSubmit={handleTeacherSubmit} className="space-y-3.5">
              <div className="bg-sky-50/80 border border-sky-200 text-sky-800 text-xs p-3 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-sky-600 mt-0.5" />
                <span>
                  Portal khusus Guru Bimbingan dan Konseling untuk memantau screening dan menjadwalkan konsultasi siswa.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ID Guru / NIP</label>
                <input
                  id="input-guru-id"
                  type="text"
                  required
                  value={teacherId}
                  onChange={e => setTeacherId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                  placeholder="Contoh: BK-001 atau 19820415..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password Guru</label>
                <div className="relative">
                  <input
                    id="input-guru-password"
                    type="password"
                    required
                    value={teacherPassword}
                    onChange={e => setTeacherPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    placeholder="••••••"
                  />
                  <Lock className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <button
                id="btn-submit-guru"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>Masuk sebagai Guru BK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {selectedRole === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-3.5">
              <div className="bg-amber-50/80 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Panel administrator sekolah untuk mengubah nomor kontak resmi Guru BK, jam layanan, dan profil guru.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ID Admin Sekolah</label>
                <input
                  id="input-admin-id"
                  type="text"
                  required
                  value={adminId}
                  onChange={e => setAdminId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                  placeholder="ADMIN-01"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password Admin</label>
                <div className="relative">
                  <input
                    id="input-admin-password"
                    type="password"
                    required
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                    placeholder="••••••"
                  />
                  <Lock className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <button
                id="btn-submit-admin"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>Masuk sebagai Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Access Helpers */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Masuk Cepat Uji Coba
              </span>
              <span className="text-[10px] text-teal-600 font-medium">1-Klik Langsung Masuk</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <button
                id="demo-login-siswa"
                type="button"
                onClick={() => loginAsRole('siswa')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <span>👩‍🎓</span>
                  <span className="text-slate-700 group-hover:text-emerald-800 font-medium">
                    Siswa: Ana Zahra (Kelas VIII-B)
                  </span>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Coba &rarr;
                </span>
              </button>

              <button
                id="demo-login-guru"
                type="button"
                onClick={() => loginAsRole('guru_bk', { id: 'guru-1', name: 'Ibu Hasni', teacherId: 'BK-001' })}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-xs transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <span>👩‍🏫</span>
                  <span className="text-slate-700 group-hover:text-sky-800 font-medium">
                    Guru BK: Ibu Hasni
                  </span>
                </div>
                <span className="text-[10px] text-sky-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Coba &rarr;
                </span>
              </button>

              <button
                id="demo-login-guru-2"
                type="button"
                onClick={() => loginAsRole('guru_bk', { id: 'guru-2', name: 'Bapak Bagas', teacherId: 'BK-002' })}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-xs transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <span>👨‍🏫</span>
                  <span className="text-slate-700 group-hover:text-sky-800 font-medium">
                    Guru BK: Bapak Bagas
                  </span>
                </div>
                <span className="text-[10px] text-sky-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Coba &rarr;
                </span>
              </button>

              <button
                id="demo-login-admin"
                type="button"
                onClick={() => loginAsRole('admin')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-xs transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <span>🛡️</span>
                  <span className="text-slate-700 group-hover:text-amber-800 font-medium">
                    Admin MTsN 2 Bombana: Pengaturan &amp; Nomor Guru
                  </span>
                </div>
                <span className="text-[10px] text-amber-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Coba &rarr;
                </span>
              </button>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 text-center">
            <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Asas Kerahasiaan BK Terjamin &bull; Data tidak disebar ke siswa lain</span>
          </div>
        </div>
      </div>
    </div>
  );
};
