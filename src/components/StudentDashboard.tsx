import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ClipboardList,
  BarChart3,
  UserCheck,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  HeartHandshake,
  Phone,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    setActiveTab,
    studentSubmissions,
    studentConsultations,
    teachers,
    schoolSettings,
  } = useApp();
  const latestSubmission = studentSubmissions[0];
  const upcomingConsultation = studentConsultations.find(
    c => c.status === 'terjadwal' || c.status === 'disetujui'
  );
  const primaryTeacher = teachers[0];

  const getResultCategoryBadge = (cat?: string) => {
    switch (cat) {
      case 'baik':
        return {
          label: 'Kondisi Baik',
          icon: '🟢',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          desc: 'Kondisi belajar dan perasaanmu terpantau stabil.',
        };
      case 'perhatian':
        return {
          label: 'Perlu Perhatian',
          icon: '🟡',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          desc: 'Ada beberapa hal yang sebaiknya kamu ceritakan ke Guru BK.',
        };
      case 'konsultasi':
        return {
          label: 'Disarankan Konsultasi',
          icon: '🔴',
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          desc: 'Sangat dianjurkan membuat jadwal bimbingan dengan Guru BK.',
        };
      default:
        return null;
    }
  };

  const screeningBadge = latestSubmission ? getResultCategoryBadge(latestSubmission.category) : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-700 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium text-emerald-50 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ruang Bimbingan & Konseling Digital</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Halo 👋
          </h1>
          <p className="text-base sm:text-lg text-emerald-100 font-medium mt-1">
            Selamat datang di Sahabat BK
          </p>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Ruang aman untuk mendapatkan bantuan, refleksi diri, dan bimbingan di sekolah. 
            Ceritamu aman, rahasia, dan didengarkan dengan tulus.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              id="btn-banner-start-screening"
              onClick={() => setActiveTab('screening')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-semibold text-xs sm:text-sm shadow-sm hover:bg-emerald-50 transition-colors"
            >
              <ClipboardList className="w-4 h-4 text-emerald-600" />
              <span>Mulai Screening Hari Ini</span>
            </button>
            <button
              id="btn-banner-consultation"
              onClick={() => setActiveTab('konsultasi')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/40 text-white font-medium text-xs sm:text-sm backdrop-blur-xs transition-colors border border-white/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi 1-on-1</span>
            </button>
          </div>
        </div>

        {/* Decorative subtle background illustration elements */}
        <div className="absolute -right-8 -bottom-10 w-64 h-64 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-6 top-6 opacity-15 hidden sm:block pointer-events-none">
          <HeartHandshake className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Snapshot Alerts / Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Screening Terakhir */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Status Screening
              </span>
              <span className="text-[11px] text-slate-400">
                {latestSubmission ? latestSubmission.submittedAt : 'Belum pernah mengisi'}
              </span>
            </div>

            {screeningBadge ? (
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <span className="text-base">{screeningBadge.icon}</span>
                  <span className="font-bold text-slate-800 text-sm sm:text-base">
                    Hasil Terakhir: {screeningBadge.label}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {screeningBadge.desc}
                </p>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm font-semibold text-slate-700">Belum ada hasil screening</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Yuk isi kuesioner singkat 2 menit untuk memahami kondisi belajarmu.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {latestSubmission ? (
              <>
                <button
                  id="btn-view-last-result"
                  onClick={() => setActiveTab('hasil_screening')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Lihat Detail Hasil</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  id="btn-re-screen"
                  onClick={() => setActiveTab('screening')}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Screening Ulang
                </button>
              </>
            ) : (
              <button
                id="btn-start-screen-empty"
                onClick={() => setActiveTab('screening')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Mulai Screening Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Status Jadwal Konsultasi Terdekat */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Jadwal Konsultasi Terdekat
              </span>
              <span className="text-[11px] text-teal-600 font-medium">Bimbingan Terjadwal</span>
            </div>

            {upcomingConsultation ? (
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ✅ {upcomingConsultation.status === 'terjadwal' ? 'Terjadwal' : 'Disetujui'}
                  </span>
                  <span className="text-xs text-slate-500 capitalize">
                    Topik: {upcomingConsultation.topic.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>
                    {upcomingConsultation.scheduledDayName || 'Rabu'}, {upcomingConsultation.scheduledTime || '10.00 WIB'}
                  </span>
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{upcomingConsultation.location || 'Ruang BK Lantai 2'}</span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm font-semibold text-slate-700">Belum ada jadwal temu aktif</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Butuh ruang bercerita atau bimbingan? Ajukan konsultasi 1-on-1 dengan Guru BK.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {upcomingConsultation ? (
              <button
                id="btn-view-active-schedule"
                onClick={() => setActiveTab('jadwal')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <span>Lihat Detail Pertemuan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                id="btn-request-consult-empty"
                onClick={() => setActiveTab('konsultasi')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <span>Ajukan Konsultasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main 6 Cards Navigation Grid as requested in prompt */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Menu Layanan Siswa</h2>
            <p className="text-xs text-slate-500">Pilih layanan yang kamu perlukan hari ini</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Mulai Screening */}
          <button
            id="card-menu-screening"
            onClick={() => setActiveTab('screening')}
            className="group text-left p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base">📝</span>
                <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Mulai Screening
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Kuesioner singkat mengenai konsentrasi, motivasi, teman, dan kenyamanan sekolah.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600">
              <span>Isi Kuesioner</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 2. Hasil Screening */}
          <button
            id="card-menu-hasil"
            onClick={() => setActiveTab('hasil_screening')}
            className="group text-left p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base">📊</span>
                <h3 className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                  Hasil Screening
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Lihat ringkasan indikasi awal kondisimu dan saran langkah pendampingan yang tepat.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-teal-600">
              <span>Lihat Hasil & Rekomendasi</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 3. Hubungi Guru BK */}
          <button
            id="card-menu-guru"
            onClick={() => setActiveTab('profil_guru')}
            className="group text-left p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base">👩‍🏫</span>
                <h3 className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors">
                  Hubungi Guru BK
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Kenali Guru BK sekolahmu, lokasi ruang BK, jam layanan resmi, dan nomor kontak sekolah.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-sky-600">
              <span>Profil Guru & Kontak</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 4. Konsultasi 1-on-1 */}
          <button
            id="card-menu-konsultasi"
            onClick={() => setActiveTab('konsultasi')}
            className="group text-left p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base">💬</span>
                <h3 className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                  Konsultasi 1-on-1
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Pilih topik masalah (belajar, teman, motivasi) dan kirim pesan pribadi langsung ke Guru BK.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-indigo-600">
              <span>Mulai Cerita / Janji Temu</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 5. Jadwal Konsultasi */}
          <button
            id="card-menu-jadwal"
            onClick={() => setActiveTab('jadwal')}
            className="group text-left p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-cyan-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base">📅</span>
                <h3 className="font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">
                  Jadwal Konsultasi
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Cek jadwal pertemuan yang telah disepakati: hari, jam bimbingan, ruang temu, dan statusnya.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-cyan-600">
              <span>Lihat Kalender & Janji</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 6. Privasi & Keamanan */}
          <button
            id="card-menu-privasi"
            onClick={() => setActiveTab('privasi')}
            className="group text-left p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base">🔒</span>
                <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Privasi & Keamanan
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Ketahui bagaimana asas kerahasiaan konseling melindungi datamu agar tidak dilihat orang lain.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700">
              <span>Buka Asas Kerahasiaan</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Official Teacher Quick Cards */}
      <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Guru Bimbingan & Konseling MTsN 2 Bombana</span>
          </div>
          <button
            id="btn-see-all-teachers"
            onClick={() => setActiveTab('profil_guru')}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            Lihat Profil & Kontak Lengkap &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teachers.map(t => {
            const rawPhone = t.officialPhone || '';
            let cleanDigits = rawPhone.replace(/[^0-9]/g, '');
            if (cleanDigits.startsWith('0')) {
              cleanDigits = '62' + cleanDigits.slice(1);
            }

            return (
              <div
                key={t.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-800">{t.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{t.title} &bull; {t.room}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{t.officialPhone || 'Belum diisi'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  {cleanDigits ? (
                    <a
                      href={`https://wa.me/${cleanDigits}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold text-center shadow-2xs"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveTab('profil_guru')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold text-center"
                    >
                      + Isi Nomor
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('konsultasi')}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold text-center"
                  >
                    Konseling
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};
