import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  GraduationCap,
  Calendar,
  ClipboardList,
  MessageCircle,
  Shield,
  LogOut,
  Sparkles,
  Phone,
  Edit3,
  Check,
  X,
  CheckCircle2,
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const {
    currentUser,
    updateCurrentUser,
    logout,
    studentSubmissions,
    studentConsultations,
    setActiveTab,
    schoolSettings,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [classInput, setClassInput] = useState(currentUser?.studentClass || 'VIII-B');
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!currentUser) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    updateCurrentUser({
      name: nameInput.trim(),
      ...(currentUser.role === 'siswa' ? { studentClass: classInput.trim() } : {}),
    });

    setIsEditing(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {currentUser.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-2xl object-cover border-4 border-emerald-100 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
          )}

          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>
                {currentUser.role === 'siswa'
                  ? `Siswa Kelas ${currentUser.studentClass || 'VIII-B'}`
                  : currentUser.role === 'guru_bk'
                  ? 'Guru Bimbingan dan Konseling'
                  : 'Administrator Sekolah'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                {currentUser.name}
              </h1>
              <button
                id="btn-trigger-edit-name"
                onClick={() => {
                  setNameInput(currentUser.name);
                  setClassInput(currentUser.studentClass || 'VIII-B');
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer w-fit mx-auto sm:mx-0"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ganti Nama</span>
              </button>
            </div>

            {showSavedToast && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Nama berhasil diperbarui!</span>
              </div>
            )}

            {currentUser.nis && (
              <p className="text-xs text-slate-500">
                NIS: <span className="font-semibold text-slate-700">{currentUser.nis}</span> &bull; NISN: {currentUser.nisn || '0098456123'}
              </p>
            )}

            {currentUser.email && (
              <p className="text-xs text-slate-500">{currentUser.email}</p>
            )}
          </div>
        </div>

        {/* Quick Stats for student */}
        {currentUser.role === 'siswa' && (
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl text-center border border-slate-100">
              <span className="text-xs text-slate-400 block">Riwayat Screening</span>
              <span className="text-xl font-bold text-slate-800 mt-0.5 block">
                {studentSubmissions.length} Kali
              </span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl text-center border border-slate-100">
              <span className="text-xs text-slate-400 block">Sesi Konsultasi</span>
              <span className="text-xl font-bold text-slate-800 mt-0.5 block">
                {studentConsultations.length} Permintaan
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Account actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-800 mb-2">Tindakan Akun</h2>

        <button
          id="btn-action-edit-name"
          onClick={() => {
            setNameInput(currentUser.name);
            setClassInput(currentUser.studentClass || 'VIII-B');
            setIsEditing(true);
          }}
          className="w-full p-3.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-900 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <Edit3 className="w-4 h-4 text-emerald-700" />
            <span>Ganti Nama & Data Profil</span>
          </div>
          <span className="text-emerald-600 font-bold">&rarr;</span>
        </button>

        <button
          onClick={() => setActiveTab('privasi')}
          className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Kerahasiaan & Hak Akses Akun Siswa</span>
          </div>
          <span className="text-slate-400">&rarr;</span>
        </button>

        <button
          onClick={logout}
          className="w-full p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-rose-700 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Keluar dari Akun (Logout)</span>
          </div>
          <span className="text-rose-400">&rarr;</span>
        </button>
      </div>

      {/* School Info Footer */}
      <div className="text-center text-xs text-slate-400 pt-2">
        <p>{schoolSettings.schoolName} &bull; Sahabat BK v1.0</p>
        <p className="mt-0.5">Ruang Aman Bimbingan & Konseling Sekolah</p>
      </div>

      {/* Edit Profile / Name Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Ganti Nama Pengguna</h3>
                  <p className="text-xs text-slate-500">Perbarui identitas yang tampil di aplikasi</p>
                </div>
              </div>
              <button
                id="btn-close-edit-name-modal"
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveName} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="input-edit-user-name"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="Masukkan nama lengkap..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {currentUser.role === 'siswa' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Kelas
                  </label>
                  <input
                    type="text"
                    id="input-edit-user-class"
                    value={classInput}
                    onChange={e => setClassInput(e.target.value)}
                    placeholder="Contoh: VIII-B"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              )}

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  id="btn-cancel-edit-name"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  id="btn-submit-save-name"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
