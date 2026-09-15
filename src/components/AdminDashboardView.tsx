import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TeacherProfile, SchoolSettings } from '../types';
import {
  Shield,
  Phone,
  Clock,
  MapPin,
  Building,
  Users,
  CheckCircle2,
  Edit,
  Plus,
  Save,
  FileCheck,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    schoolSettings,
    updateSchoolSettings,
    teachers,
    updateTeacherProfile,
    submissions,
  } = useApp();

  // Settings form state
  const [schoolName, setSchoolName] = useState(schoolSettings.schoolName);
  const [officialPhone, setOfficialPhone] = useState(schoolSettings.officialBkPhone);
  const [roomLocation, setRoomLocation] = useState(schoolSettings.roomLocation);
  const [serviceHours, setServiceHours] = useState(schoolSettings.serviceHours);
  const [academicYear, setAcademicYear] = useState(schoolSettings.academicYear);
  const [emergencyContact, setEmergencyContact] = useState(schoolSettings.emergencyContact);
  const [isSavedSettings, setIsSavedSettings] = useState(false);

  // Selected teacher for editing
  const [editingTeacher, setEditingTeacher] = useState<TeacherProfile | null>(null);
  const [teacherName, setTeacherName] = useState('');
  const [teacherNip, setTeacherNip] = useState('');
  const [teacherTitle, setTeacherTitle] = useState('');
  const [teacherClasses, setTeacherClasses] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [setAsSchoolPhone, setSetAsSchoolPhone] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolSettings({
      schoolName,
      officialBkPhone: officialPhone,
      roomLocation,
      serviceHours,
      academicYear,
      emergencyContact,
    });
    setIsSavedSettings(true);
    setTimeout(() => setIsSavedSettings(false), 4000);
  };

  const handleEditTeacher = (teacher: TeacherProfile) => {
    setEditingTeacher(teacher);
    setTeacherName(teacher.name);
    setTeacherNip(teacher.nip);
    setTeacherTitle(teacher.title);
    setTeacherClasses(teacher.assignedClasses.join(', '));
    setTeacherPhone(teacher.officialPhone || '');
    setSetAsSchoolPhone(false);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    const updated: TeacherProfile = {
      ...editingTeacher,
      name: teacherName.trim(),
      nip: teacherNip.trim(),
      title: teacherTitle.trim(),
      officialPhone: teacherPhone.trim(),
      assignedClasses: teacherClasses.split(',').map(s => s.trim()).filter(Boolean),
    };

    updateTeacherProfile(updated);

    if (setAsSchoolPhone && teacherPhone.trim()) {
      updateSchoolSettings({ officialBkPhone: teacherPhone.trim() });
      setOfficialPhone(teacherPhone.trim());
    }

    setEditingTeacher(null);
  };

  // Aggregate stats
  const totalScreened = submissions.length;
  const needAttention = submissions.filter(s => s.category === 'perhatian').length;
  const needConsultation = submissions.filter(s => s.category === 'konsultasi').length;
  const goodCondition = submissions.filter(s => s.category === 'baik').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-amber-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Panel Administrator Sekolah</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Pengaturan Sekolah & Manajemen Guru BK
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Atur informasi resmi sekolah, nomor kontak resmi Guru BK, jam layanan kedinasan, dan data akun Guru BK sekolah.
        </p>
      </div>

      {/* Aggregate Overview Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
          Statistik Agregat Kesejahteraan Sekolah (Privasi Aman)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500">Total Screening</span>
            <p className="text-xl font-bold text-slate-800 mt-1">{totalScreened}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-xs text-emerald-800">Kondisi Baik</span>
            <p className="text-xl font-bold text-emerald-900 mt-1">{goodCondition}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
            <span className="text-xs text-amber-800">Perlu Perhatian</span>
            <p className="text-xl font-bold text-amber-900 mt-1">{needAttention}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100">
            <span className="text-xs text-rose-800">Disarankan Konsultasi</span>
            <p className="text-xl font-bold text-rose-900 mt-1">{needConsultation}</p>
          </div>
        </div>
      </div>

      {/* Settings Form: Official School & BK Phone */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Pengaturan Kontak Resmi & Informasi Ruang BK
            </h2>
            <p className="text-xs text-slate-500">
              Nomor ini akan ditampilkan pada profil siswa sebagai kontak dinas sekolah
            </p>
          </div>
          {isSavedSettings && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tersimpan!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Sekolah</label>
              <input
                id="input-admin-school-name"
                type="text"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                📞 Nomor Kontak Resmi Guru BK
              </label>
              <input
                id="input-admin-bk-phone"
                type="text"
                required
                value={officialPhone}
                onChange={e => setOfficialPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-bold text-slate-800 focus:ring-2 focus:ring-amber-500"
                placeholder="+62 812-xxxx-xxxx"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                * Nomor ini diatur langsung oleh pihak sekolah demi keamanan privasi guru dan siswa.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lokasi Ruang BK</label>
              <input
                id="input-admin-room"
                type="text"
                value={roomLocation}
                onChange={e => setRoomLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jam Layanan Bimbingan</label>
              <input
                id="input-admin-hours"
                type="text"
                value={serviceHours}
                onChange={e => setServiceHours(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Hotline Bantuan Darurat Siswa</label>
              <input
                id="input-admin-emergency"
                type="text"
                value={emergencyContact}
                onChange={e => setEmergencyContact(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              id="btn-save-admin-settings"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Kontak & Sekolah</span>
            </button>
          </div>
        </form>
      </div>

      {/* Teachers Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Manajemen Akun Guru BK ({teachers.length})
            </h2>
            <p className="text-xs text-slate-500">
              Daftar tenaga pengajar bimbingan dan konseling yang terdaftar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teachers.map(teacher => (
            <div
              key={teacher.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={teacher.avatarUrl}
                  alt={teacher.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-800">{teacher.name}</h3>
                  <p className="text-xs text-slate-500">NIP: {teacher.nip}</p>
                  <p className="text-xs text-teal-700 font-semibold">{teacher.title}</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1.5">
                <p><strong>Kelas Binaan:</strong> {teacher.assignedClasses.join(', ')}</p>
                <p><strong>Ruang:</strong> {teacher.room}</p>
                <div className="p-2 rounded-xl bg-slate-100/90 border border-slate-200/80 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Nomor Guru: <strong>{teacher.officialPhone || 'Belum diisi'}</strong></span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEditTeacher(teacher)}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    Ubah Nomor
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-end">
                <button
                  id={`btn-edit-teacher-${teacher.id}`}
                  onClick={() => handleEditTeacher(teacher)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Data Guru</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Edit Guru BK */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Edit Data Guru BK
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Perbarui profil, nomor kontak, dan pembagian kelas bimbingan
            </p>

            <form onSubmit={handleSaveTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={teacherName}
                  onChange={e => setTeacherName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">NIP</label>
                <input
                  type="text"
                  value={teacherNip}
                  onChange={e => setTeacherNip(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jabatan / Peran</label>
                <input
                  type="text"
                  value={teacherTitle}
                  onChange={e => setTeacherTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nomor HP / WhatsApp Guru BK
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={teacherPhone}
                    onChange={e => setTeacherPhone(e.target.value)}
                    placeholder="Contoh: 082291002233 atau +62 822-9100-2233"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white pr-8 font-medium text-slate-800"
                  />
                  <Phone className="w-4 h-4 text-emerald-600 absolute right-3 top-2.5" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Siswa dapat menghubungi nomor ini langsung melalui tombol WhatsApp / Telepon di aplikasi.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <label className="flex items-center gap-2 text-xs text-amber-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setAsSchoolPhone}
                    onChange={e => setSetAsSchoolPhone(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Jadikan juga sebagai Nomor Hotline BK Utama Madrasah</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kelas Binaan (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={teacherClasses}
                  onChange={e => setTeacherClasses(e.target.value)}
                  placeholder="VIII-A, VIII-B, VIII-C"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
