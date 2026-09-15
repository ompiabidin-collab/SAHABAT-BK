import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConsultationTopic } from '../types';
import {
  MessageCircle,
  BookOpen,
  Users,
  School,
  Target,
  HeartPulse,
  MoreHorizontal,
  Send,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Phone,
} from 'lucide-react';

interface TopicOption {
  value: ConsultationTopic;
  label: string;
  emoji: string;
  desc: string;
}

const TOPICS: TopicOption[] = [
  {
    value: 'belajar',
    label: 'Kesulitan Belajar',
    emoji: '📚',
    desc: 'Sulit memahami pelajaran tertentu, nilai menurun, atau bingung cara belajar efektif.',
  },
  {
    value: 'pertemanan',
    label: 'Pertemanan',
    emoji: '👭',
    desc: 'Ada masalah dengan teman sebaya, merasa dikucilkan, canggung, atau ingin memperbaiki hubungan.',
  },
  {
    value: 'masalah_sekolah',
    label: 'Masalah di Sekolah',
    emoji: '🏫',
    desc: 'Merasa tidak nyaman di kelas, adaptasi lingkungan baru, atau beban tugas sekolah.',
  },
  {
    value: 'motivasi',
    label: 'Motivasi Belajar',
    emoji: '🎯',
    desc: 'Kehilangan semangat, sering menunda-nunda, atau butuh arahan untuk membangkitkan tekad.',
  },
  {
    value: 'kekhawatiran',
    label: 'Kekhawatiran / Perasaan',
    emoji: '😟',
    desc: 'Merasa cemas, takut gagal, stres menjelang ujian, atau sedih yang mengganggu pikiran.',
  },
  {
    value: 'lainnya',
    label: 'Lainnya',
    emoji: '💬',
    desc: 'Hal pribadi atau pertanyaan lain yang ingin kamu konsultasikan dengan Guru BK.',
  },
];

export const ConsultationView: React.FC = () => {
  const {
    currentUser,
    teachers,
    studentConsultations,
    createConsultationRequest,
    setActiveTab,
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<ConsultationTopic>('belajar');
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || 'guru-1');
  const [message, setMessage] = useState('');
  const [preferredDays, setPreferredDays] = useState('Saat jam istirahat sekolah');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Mohon tuliskan sedikit hal yang ingin kamu ceritakan atau bicarakan.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createConsultationRequest(selectedTopic, message.trim(), selectedTeacherId, preferredDays);
      setIsSubmitting(false);
      setMessage('');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }, 400);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'terjadwal':
        return {
          label: 'Terjadwal',
          icon: '✅',
          classes: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        };
      case 'disetujui':
        return {
          label: 'Disetujui',
          icon: '👍',
          classes: 'bg-sky-100 text-sky-800 border-sky-300',
        };
      case 'selesai':
        return {
          label: 'Selesai',
          icon: '🎯',
          classes: 'bg-slate-100 text-slate-700 border-slate-300',
        };
      case 'menunggu':
      default:
        return {
          label: 'Menunggu Konfirmasi',
          icon: '⏳',
          classes: 'bg-amber-100 text-amber-800 border-amber-300',
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Toast Alert */}
      {showSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold">Permintaan Konsultasi Berhasil Dikirim!</p>
              <p className="text-emerald-100 text-xs">
                Guru BK telah menerima pemberitahuan dan akan segera menentukan jadwal temu untukmu.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSuccessToast(false)}
            className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <MessageCircle className="w-4 h-4" />
          <span>Bimbingan Konseling 1-on-1</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Konsultasi 1-on-1 dengan Guru BK
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Ruang pribadi dan aman untuk bercerita apa pun yang sedang membebanimu. Tidak ada hal yang memalukan atau salah untuk dibicarakan. Ceritamu aman bersama Guru BK.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Asas Kerahasiaan Konseling: Informasi ini hanya dibaca oleh Guru BK tujuanmu.</span>
        </div>
      </div>

      {/* Consultation Request Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Kirim Permintaan Konsultasi Baru
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          Lengkapi formulir di bawah ini agar Guru BK dapat mempersiapkan sesi bimbingan yang sesuai
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Select Topic */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Pilih Topik Konsultasi:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOPICS.map(topic => {
                const isSelected = selectedTopic === topic.value;
                return (
                  <button
                    key={topic.value}
                    type="button"
                    id={`topic-${topic.value}`}
                    onClick={() => setSelectedTopic(topic.value)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{topic.emoji}</span>
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-indigo-900' : 'text-slate-800'
                        }`}
                      >
                        {topic.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {topic.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Teacher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                2. Pilih Guru BK Pendamping:
              </label>
              <select
                id="select-teacher-destination"
                value={selectedTeacherId}
                onChange={e => setSelectedTeacherId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.title.split('(')[0].trim()})
                  </option>
                ))}
              </select>
              {(() => {
                const curT = teachers.find(t => t.id === selectedTeacherId) || teachers[0];
                return (
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>
                      Nomor HP/WA Guru: <strong className="text-slate-700">{curT?.officialPhone || 'Belum diisi'}</strong>
                    </span>
                  </p>
                );
              })()}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                3. Preferensi Waktu Bertemu:
              </label>
              <select
                id="select-preferred-time"
                value={preferredDays}
                onChange={e => setPreferredDays(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Saat jam istirahat pertama (09.30 - 10.00 WITA)">
                  Saat istirahat pertama (09.30 - 10.00 WITA)
                </option>
                <option value="Saat jam istirahat kedua (11.45 - 12.30 WITA)">
                  Saat istirahat kedua (11.45 - 12.30 WITA)
                </option>
                <option value="Setelah jam pulang sekolah (14.00 - 14.45 WITA)">
                  Setelah jam pulang sekolah (14.00 - 14.45 WITA)
                </option>
                <option value="Kapan saja Guru BK memiliki waktu luang">
                  Kapan saja Guru BK memiliki waktu luang
                </option>
              </select>
            </div>
          </div>

          {/* Step 3: Message Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              4. Tuliskan hal yang ingin kamu bicarakan atau ceritakan:
            </label>
            <textarea
              id="textarea-consultation-msg"
              required
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Contoh: Belakangan ini saya merasa sulit berkonsentrasi saat belajar matematika dan merasa tertekan menghadapi ujian minggu depan..."
              className="w-full p-3.5 text-xs sm:text-sm rounded-2xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              * Tuliskan secukupnya. Detail lebih dalam bisa kita bicarakan secara langsung saat sesi konsultasi.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              id="btn-submit-consult-request"
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Mengirim...' : 'Kirim Permintaan Konsultasi'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of Previous & Active Requests */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Riwayat & Status Konsultasi ({studentConsultations.length})
            </h2>
            <p className="text-xs text-slate-500">
              Pantau proses konfirmasi dan jadwal bimbinganmu
            </p>
          </div>
        </div>

        {studentConsultations.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Belum ada permintaan konsultasi yang kamu kirimkan.
          </div>
        ) : (
          <div className="space-y-3.5">
            {studentConsultations.map(c => {
              const badge = getStatusBadge(c.status);

              return (
                <div
                  key={c.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-white text-slate-800 border border-slate-200 shadow-2xs">
                        Topik: {c.topic.replace('_', ' ')}
                      </span>
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.classes}`}
                      >
                        <span>{badge.icon}</span>
                        <span>{badge.label}</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Diajukan: {c.createdAt}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic bg-white p-3 rounded-xl border border-slate-100">
                    "{c.message}"
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400">Guru BK:</span>{' '}
                      <span className="font-semibold text-slate-800">{c.teacherName}</span>
                    </div>
                    {c.preferredDays && (
                      <div>
                        <span className="text-slate-400">Waktu Diinginkan:</span>{' '}
                        <span>{c.preferredDays}</span>
                      </div>
                    )}
                  </div>

                  {/* If scheduled by teacher */}
                  {c.status === 'terjadwal' && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Jadwal Bimbingan Telah Ditetapkan!</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Hari: <strong>{c.scheduledDayName || 'Rabu'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Waktu: <strong>{c.scheduledTime || '10.00 WIB'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:col-span-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Tempat: <strong>{c.location || 'Ruang BK Lantai 2'}</strong></span>
                        </div>
                      </div>
                      {c.teacherNotes && (
                        <p className="pt-1 text-[11px] text-emerald-800">
                          Catatan Guru: "{c.teacherNotes}"
                        </p>
                      )}
                      <div className="pt-2">
                        <button
                          id={`btn-view-schedule-item-${c.id}`}
                          onClick={() => setActiveTab('jadwal')}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                        >
                          <span>Buka Kalender Pertemuan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* If waiting */}
                  {c.status === 'menunggu' && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        Permintaanmu sedang dalam antrean Guru BK. Kamu akan menerima notifikasi begitu jadwal ditentukan.
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
