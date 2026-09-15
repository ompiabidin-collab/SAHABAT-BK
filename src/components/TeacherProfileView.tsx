import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TeacherProfile } from '../types';
import {
  UserCheck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  Award,
  ExternalLink,
  X,
  Edit,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';

export const TeacherProfileView: React.FC = () => {
  const { teachers, schoolSettings, setActiveTab, currentUser, updateTeacherPhone } = useApp();
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || 'guru-1');
  const [showContactModal, setShowContactModal] = useState(false);

  // Phone input modal state
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [setAsSchoolHotline, setSetAsSchoolHotline] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Get reactive teacher data
  const currentTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

  const handleOpenPhoneModal = () => {
    setPhoneInput(currentTeacher.officialPhone || '');
    setSetAsSchoolHotline(false);
    setShowPhoneModal(true);
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeacherPhone(currentTeacher.id, phoneInput.trim(), setAsSchoolHotline);
    setShowPhoneModal(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 4000);
  };

  // Convert Indonesian phone format to WhatsApp international format
  const getCleanWaNumber = (phone?: string) => {
    if (!phone) return '';
    let digits = phone.replace(/[^0-9]/g, '');
    if (digits.startsWith('0')) {
      digits = '62' + digits.slice(1);
    }
    return digits;
  };

  const activeTeacherPhone = currentTeacher.officialPhone || schoolSettings.officialBkPhone;
  const waDigits = getCleanWaNumber(activeTeacherPhone);

  const studentGreetingName = currentUser?.name || 'Siswa';
  const studentGreetingClass = currentUser?.studentClass || 'VIII';
  const waText = encodeURIComponent(
    `Assalamu'alaikum/Halo ${currentTeacher.name}, saya ${studentGreetingName} dari kelas ${studentGreetingClass} MTsN 2 Bombana, ingin berkonsultasi bimbingan di Sahabat BK.`
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-3 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>Nomor Guru BK <strong>{currentTeacher.name}</strong> berhasil diperbarui!</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-teal-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <UserCheck className="w-4 h-4" />
          <span>Profil Guru Bimbingan dan Konseling MTsN 2 Bombana</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Guru BK Madrasah
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Guru BK adalah sahabat belajar dan pendamping tumbuh kembangmu di sekolah. Kamu bisa berkonsultasi mengenai pelajaran, teman, masa depan, atau keluh kesah harianmu secara aman.
        </p>

        {/* Teacher selector tabs */}
        {teachers.length > 1 && (
          <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {teachers.map(teacher => {
              const isSelected = currentTeacher.id === teacher.id;
              const isMale = teacher.name.toLowerCase().includes('bapak') || teacher.id === 'guru-2';
              return (
                <button
                  key={teacher.id}
                  id={`btn-select-teacher-${teacher.id}`}
                  onClick={() => setSelectedTeacherId(teacher.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{isMale ? '👨‍🏫' : '👩‍🏫'}</span>
                  <span>{teacher.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src={currentTeacher.avatarUrl}
              alt={currentTeacher.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
            />
            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-teal-100 mb-2">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentTeacher.title}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {currentTeacher.name}
              </h2>
              <p className="text-xs text-teal-100/90 mt-1">NIP: {currentTeacher.nip}</p>
              <p className="text-xs text-teal-100/80 mt-1">
                Wilayah Bimbingan: {currentTeacher.assignedClasses.join(', ')}
              </p>
            </div>

            {/* Quick Button to Input / Edit Phone */}
            <div className="sm:self-start">
              <button
                id="btn-edit-teacher-phone-quick"
                onClick={handleOpenPhoneModal}
                className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                title="Masukkan atau ubah nomor guru"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{currentTeacher.officialPhone ? 'Ubah Nomor HP' : '+ Masukkan Nomor Guru'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Details & Info List */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Bio / Greeting */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-teal-900 block mb-1">Pesan untuk Siswa:</span>
            "{currentTeacher.bio}"
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Lokasi Ruang BK */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Ruang Bimbingan & Konseling</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{currentTeacher.room}</p>
              <p className="text-xs text-slate-500 mt-1">
                {schoolSettings.roomLocation}
              </p>
            </div>

            {/* Jam Layanan */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>Jam Layanan Resmi</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{currentTeacher.serviceHours}</p>
              <p className="text-xs text-slate-500 mt-1">
                Hari aktif: {currentTeacher.activeDays.join(', ')}
              </p>
            </div>

            {/* Nomor Kontak Guru BK Spesifik */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 sm:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-1">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Nomor HP / WhatsApp: {currentTeacher.name}</span>
                  </div>
                  <p className="text-lg font-extrabold text-emerald-950">
                    {currentTeacher.officialPhone || (
                      <span className="text-sm font-normal text-emerald-700 italic">
                        Belum dimasukkan (Klik tombol di samping untuk memasukkan)
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="btn-input-phone-card"
                    onClick={handleOpenPhoneModal}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100/50 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Edit className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{currentTeacher.officialPhone ? 'Ubah Nomor' : 'Masukkan Nomor'}</span>
                  </button>
                  {currentTeacher.officialPhone && (
                    <a
                      id="link-wa-card"
                      href={`https://wa.me/${waDigits}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs text-emerald-800/80 mt-2">
                Nomor ini digunakan siswa dan orang tua untuk berkomunikasi langsung dengan {currentTeacher.name}.
              </p>
            </div>

            {/* Nomor Resmi Hotline Sekolah */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                  <PhoneCall className="w-4 h-4 text-teal-600" />
                  <span>Nomor Hotline Utama Ruang BK {schoolSettings.schoolName}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                  Kedinasan Sekolah
                </span>
              </div>
              <p className="text-base font-extrabold text-slate-800 mt-0.5">
                {schoolSettings.officialBkPhone}
              </p>
            </div>
          </div>

          {/* Requested 3 Action Buttons */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Konsultasi 1-on-1 */}
            <button
              id="btn-teacher-consult-now"
              onClick={() => setActiveTab('konsultasi')}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>💬 Konsultasi 1-on-1</span>
            </button>

            {/* 2. Hubungi Guru BK */}
            <button
              id="btn-teacher-call-official"
              onClick={() => setShowContactModal(true)}
              className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>📞 Hubungi Guru BK</span>
            </button>

            {/* 3. Buat Jadwal */}
            <button
              id="btn-teacher-create-schedule"
              onClick={() => setActiveTab('konsultasi')}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>📅 Buat Jadwal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Masukkan / Ubah Nomor Guru */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button
              id="btn-close-phone-modal"
              onClick={() => setShowPhoneModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Masukkan Nomor Guru BK
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Atur nomor kontak atau WhatsApp untuk <strong>{currentTeacher.name}</strong> ({schoolSettings.schoolName}).
            </p>

            <form onSubmit={handleSavePhone} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nomor HP / WhatsApp Guru
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={phoneInput}
                    onChange={e => setPhoneInput(e.target.value)}
                    placeholder="Contoh: 082291002233 atau +62 822-9100-2233"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 pr-9 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                  <Phone className="w-4 h-4 text-emerald-600 absolute right-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Siswa dapat langsung mengklik tombol chat WhatsApp atau telepon menuju nomor ini.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setAsSchoolHotline}
                    onChange={e => setSetAsSchoolHotline(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 mt-0.5 shrink-0"
                  />
                  <span>
                    Jadikan juga sebagai <strong>Nomor Hotline Utama Ruang BK</strong> di profil sekolah.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPhoneModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  id="btn-save-phone-modal"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
                >
                  Simpan Nomor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Official Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button
              id="btn-close-contact-modal"
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Hubungi Guru BK Madrasah
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Kamu akan terhubung dengan {currentTeacher.name} di {schoolSettings.schoolName}. Harap menghubungi pada hari kerja dan jam layanan sekolah.
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Guru Bertugas:</span>
                <span className="font-semibold text-slate-800">{currentTeacher.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Guru:</span>
                <span className="font-bold text-emerald-700">{activeTeacherPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jam Layanan:</span>
                <span className="font-semibold text-slate-800">{currentTeacher.serviceHours}</span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <a
                id="link-whatsapp-official"
                href={`https://wa.me/${waDigits}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors text-center shadow-xs"
              >
                <span>Kirim Pesan WhatsApp ({currentTeacher.name})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                id="btn-modal-to-app-consult"
                onClick={() => {
                  setShowContactModal(false);
                  setActiveTab('konsultasi');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
              >
                Gunakan Form Konsultasi Aplikasi (Direkomendasikan)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
