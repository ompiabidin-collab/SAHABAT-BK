import React from 'react';
import { useApp } from '../context/AppContext';
import { SCREENING_QUESTIONS } from '../data/mockData';
import {
  BarChart3,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
  UserCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

export const ScreeningResultView: React.FC = () => {
  const { studentSubmissions, setActiveTab, currentUser } = useApp();

  const latestSubmission = studentSubmissions[0];

  if (!latestSubmission) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Belum Ada Hasil Screening</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
          Kamu belum pernah menyelesaikan kuesioner screening. Luangkan waktu 2 menit untuk memeriksa kondisi belajarmu.
        </p>
        <button
          id="btn-goto-screening-empty"
          onClick={() => setActiveTab('screening')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-xs"
        >
          Mulai Screening Sekarang
        </button>
      </div>
    );
  }

  const getCategoryDetails = (cat: string) => {
    switch (cat) {
      case 'baik':
        return {
          iconEmoji: '🟢',
          title: 'Kondisi Baik',
          badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          containerBg: 'bg-emerald-50/70 border-emerald-200',
          titleColor: 'text-emerald-900',
          summary:
            'Alhamdulillah! Berdasarkan jawabanmu, kondisi belajar, motivasi, dan pertemananmu saat ini terpantau baik dan stabil. Kamu memiliki daya adaptasi yang positif di sekolah.',
          recommendation:
            'Tetap pertahankan kebiasaan belajar dan istirahat yang seimbang. Jika sewaktu-waktu merasa butuh teman bertukar pikiran, pintu Ruang BK selalu terbuka untukmu.',
          adviceList: [
            'Pertahankan pola istirahat dan jam belajar teratur.',
            'Tetap jaga komunikasi hangat dengan teman dan keluarga.',
            'Jangan ragu menyapa Guru BK jika ingin mendiskusikan minat dan cita-cita.',
          ],
        };
      case 'perhatian':
        return {
          iconEmoji: '🟡',
          title: 'Perlu Perhatian',
          badgeStyle: 'bg-amber-100 text-amber-800 border-amber-300',
          containerBg: 'bg-amber-50/70 border-amber-200',
          titleColor: 'text-amber-900',
          summary:
            'Beberapa jawabanmu menunjukkan bahwa kamu mungkin sedang menghadapi kesulitan atau beban pikiran tertentu yang sebaiknya dibicarakan dengan orang dewasa yang kamu percaya.',
          recommendation:
            'Merasa lelah atau bingung itu manusiawi. Kamu tidak harus memikul semua beban pikiran sendirian. Mengobrol santai dengan Guru BK bisa membantumu menemukan jalan keluar yang lebih ringan.',
          adviceList: [
            'Luangkan waktu untuk bercerita secara privat dengan Guru BK.',
            'Coba catat hal apa saja yang paling membuatmu merasa cemas atau lelah.',
            'Lakukan teknik relaksasi tarik napas dalam saat pikiran terasa penuh.',
          ],
        };
      case 'konsultasi':
      default:
        return {
          iconEmoji: '🔴',
          title: 'Disarankan Berkonsultasi dengan Guru BK',
          badgeStyle: 'bg-rose-100 text-rose-800 border-rose-300',
          containerBg: 'bg-rose-50/70 border-rose-200',
          titleColor: 'text-rose-900',
          summary:
            'Hasil screening menunjukkan bahwa kamu sedang merasakan tekanan atau kesulitan yang cukup membebani aktivitas harian dan belajarmu di sekolah.',
          recommendation:
            'Kami sangat menyarankan kamu untuk membuat jadwal konsultasi 1-on-1 bersama Guru BK. Ruang BK adalah ruang aman yang siap mendengarkan tanpa menghakimi dan menjamin kerahasiaan ceritamu.',
          adviceList: [
            'Buat janji temu 1-on-1 dengan Guru BK sekarang agar kamu segera mendapat dukungan.',
            'Ingat bahwa kamu tidak sendirian dan meminta bantuan adalah tanda keberanian.',
            'Ceritamu dilindungi asas kerahasiaan konseling sekolah.',
          ],
        };
    }
  };

  const details = getCategoryDetails(latestSubmission.category);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Hasil Screening 20 Pertanyaan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Pemeriksaan awal kondisi belajar & kesejahteraan siswa MTsN 2 Bombana
          </p>
        </div>
        <div className="text-xs text-slate-500 flex sm:flex-col items-start sm:items-end gap-1">
          <span>Diselesaikan: <strong>{latestSubmission.submittedAt}</strong></span>
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Skor Total: {latestSubmission.totalScore} / {latestSubmission.maxScore}
          </span>
        </div>
      </div>

      {/* Main Result Card */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border ${details.containerBg} shadow-xs transition-all`}
      >
        <div className="flex items-center space-x-2.5 mb-3">
          <span className="text-2xl">{details.iconEmoji}</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${details.badgeStyle}`}
          >
            {details.title}
          </span>
        </div>

        <h2 className={`text-xl sm:text-2xl font-bold ${details.titleColor} mt-1`}>
          {details.summary}
        </h2>

        <p className="text-sm text-slate-700 mt-3 leading-relaxed">
          {details.recommendation}
        </p>

        {/* Suggestion points */}
        <div className="mt-5 pt-4 border-t border-slate-200/60">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Langkah yang Dapat Kamu Lakukan:
          </h3>
          <ul className="space-y-2">
            {details.adviceList.map((adv, i) => (
              <li key={i} className="flex items-start text-xs sm:text-sm text-slate-700 gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary Call to Action Button */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 flex flex-col sm:flex-row items-center gap-3">
          <button
            id="btn-result-consult"
            onClick={() => setActiveTab('konsultasi')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>💬 Konsultasi dengan Guru BK</span>
          </button>

          <button
            id="btn-result-retake"
            onClick={() => setActiveTab('screening')}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Screening Ulang</span>
          </button>
        </div>
      </div>

      {/* Breakdown per Question Topics */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">
            Rincian Jawaban 20 Indikator Pengamatan
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            20 Butir Lengkap
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Pemetaan responmu pada 20 butir indikator bimbingan konseling dan perkembangan diri di MTsN 2 Bombana
        </p>

        <div className="space-y-3">
          {SCREENING_QUESTIONS.map((q, idx) => {
            const val = latestSubmission.answers[q.id] ?? 0;
            const labels = ['Tidak pernah (0)', 'Jarang (1)', 'Kadang-kadang (2)', 'Sering (3)', 'Sangat sering (4)'];
            const percent = (val / 4) * 100;

            let colorBar = 'bg-emerald-500';
            let badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
            if (val >= 3) {
              colorBar = 'bg-rose-500';
              badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
            } else if (val === 2) {
              colorBar = 'bg-amber-500';
              badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
            }

            return (
              <div key={q.id} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs mb-1.5 gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800">{q.topicLabel}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeBg}`}>
                    {labels[val]}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2 leading-relaxed">{q.text}</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${colorBar} h-1.5 rounded-full transition-all duration-300`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-700 block mb-0.5">
            Pemberitahuan Etika & Privasi:
          </span>
          Hasil screening ini adalah instrumen skrining awal non-medis untuk keperluan bimbingan konseling di lingkungan sekolah. <span className="font-semibold text-slate-800">Bukan diagnosis medis atau gangguan kejiwaan/psikiatri klinis</span>. Data ini tidak disebarluaskan dan hanya digunakan Guru BK untuk memberikan pendampingan yang tepat bagi siswa.
        </div>
      </div>

      {/* History of Past Submissions if multiple */}
      {studentSubmissions.length > 1 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <h3 className="font-bold text-slate-800 text-sm mb-3">
            Riwayat Screening Sebelumnya ({studentSubmissions.length})
          </h3>
          <div className="divide-y divide-slate-100">
            {studentSubmissions.slice(1).map(sub => (
              <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-600">{sub.submittedAt}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    sub.category === 'konsultasi'
                      ? 'bg-rose-100 text-rose-800'
                      : sub.category === 'perhatian'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {sub.category === 'konsultasi'
                    ? 'Disarankan Konsultasi'
                    : sub.category === 'perhatian'
                    ? 'Perlu Perhatian'
                    : 'Kondisi Baik'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
