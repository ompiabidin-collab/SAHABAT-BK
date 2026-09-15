import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCREENING_QUESTIONS } from '../data/mockData';
import { ScreeningOptionValue } from '../types';
import {
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Target,
  Users,
  School,
  HeartPulse,
  Home,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Sparkle,
} from 'lucide-react';

const OPTIONS: { label: string; subLabel: string; value: ScreeningOptionValue }[] = [
  { label: 'Tidak pernah', subLabel: 'Sama sekali tidak terjadi', value: 0 },
  { label: 'Jarang', subLabel: '1–2 kali saja', value: 1 },
  { label: 'Kadang-kadang', subLabel: 'Beberapa kali dalam seminggu', value: 2 },
  { label: 'Sering', subLabel: 'Hampir setiap hari', value: 3 },
  { label: 'Sangat sering', subLabel: 'Setiap hari & sangat mengganggu', value: 4 },
];

export const ScreeningView: React.FC = () => {
  const { submitScreening, setActiveTab } = useApp();

  // Initial pre-filled answers for 20 questions so the student can easily test or adjust
  const [answers, setAnswers] = useState<Record<string, ScreeningOptionValue>>({
    q1: 2, q2: 1, q3: 2, q4: 1, q5: 1,
    q6: 2, q7: 1, q8: 0, q9: 1, q10: 1,
    q11: 2, q12: 1, q13: 2, q14: 1, q15: 2,
    q16: 0, q17: 2, q18: 1, q19: 1, q20: 2,
  });

  const [activeTopicFilter, setActiveTopicFilter] = useState<string>('semua');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = SCREENING_QUESTIONS.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleOptionSelect = (questionId: string, value: ScreeningOptionValue) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleFillDemo = () => {
    const sample: Record<string, ScreeningOptionValue> = {};
    SCREENING_QUESTIONS.forEach((q, idx) => {
      // Create a realistic variety of responses
      const pattern: ScreeningOptionValue[] = [2, 1, 2, 0, 1, 2, 1, 0, 1, 1, 2, 1, 2, 2, 1, 0, 2, 1, 1, 2];
      sample[q.id] = pattern[idx % pattern.length];
    });
    setAnswers(sample);
  };

  const handleResetAnswers = () => {
    setAnswers({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < totalQuestions) {
      const unansweredIndex = SCREENING_QUESTIONS.findIndex(q => answers[q.id] === undefined);
      const qNum = unansweredIndex >= 0 ? unansweredIndex + 1 : 1;
      alert(`Silakan jawab semua 20 pertanyaan terlebih dahulu (Pertanyaan No. ${qNum} belum terisi).`);
      
      // Scroll to unanswered question
      if (unansweredIndex >= 0) {
        const elem = document.getElementById(`question-${SCREENING_QUESTIONS[unansweredIndex].id}`);
        elem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitScreening(answers);
      setIsSubmitting(false);
      setActiveTab('hasil_screening');
    }, 400);
  };

  const getTopicIcon = (topic: string) => {
    switch (topic) {
      case 'belajar':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'motivasi':
        return <Target className="w-4 h-4 text-teal-600" />;
      case 'pertemanan':
        return <Users className="w-4 h-4 text-sky-600" />;
      case 'lingkungan_sekolah':
        return <School className="w-4 h-4 text-indigo-600" />;
      case 'perasaan':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      case 'harian':
        return <HeartPulse className="w-4 h-4 text-amber-600" />;
      case 'emosi':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'kepercayaan_diri':
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'keluarga':
        return <Home className="w-4 h-4 text-orange-600" />;
      default:
        return <ClipboardList className="w-4 h-4 text-slate-600" />;
    }
  };

  const filteredQuestions = activeTopicFilter === 'semua'
    ? SCREENING_QUESTIONS
    : SCREENING_QUESTIONS.filter(q => q.topic === activeTopicFilter);

  const topicsList = [
    { key: 'semua', label: 'Semua (20)' },
    { key: 'belajar', label: 'Belajar (4)' },
    { key: 'motivasi', label: 'Motivasi (2)' },
    { key: 'pertemanan', label: 'Pertemanan (4)' },
    { key: 'emosi', label: 'Emosi (1)' },
    { key: 'perasaan', label: 'Kecemasan (2)' },
    { key: 'kepercayaan_diri', label: 'Percaya Diri (2)' },
    { key: 'lingkungan_sekolah', label: 'Sekolah (2)' },
    { key: 'keluarga', label: 'Keluarga (2)' },
    { key: 'harian', label: 'Kebugaran (1)' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <ClipboardList className="w-4 h-4" />
          <span>Instrumen Screening Kesejahteraan Siswa MTsN 2 Bombana</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Screening 20 Pertanyaan Kondisi Belajar & Diri
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Kuesioner 20 pertanyaan ini dirancang untuk membantumu merefleksikan kondisi belajar, pertemanan, kepercayaan diri, dan perasaan dalam 
          <span className="font-semibold text-slate-800"> 2 minggu terakhir</span>. Jawablah dengan jujur sesuai apa yang kamu rasakan. Tidak ada jawaban salah ataupun benar.
        </p>

        {/* Progress Bar & Quick Tools */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600">
              Pertanyaan Terjawab: <strong className="text-slate-800">{answeredCount}</strong> dari {totalQuestions}
            </span>
            <span className="text-emerald-700 font-bold">{progressPercent}% Selesai</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Quick Helper Actions */}
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-medium transition-colors cursor-pointer text-[11px]"
                title="Isi contoh jawaban otomatis untuk uji coba"
              >
                <Sparkle className="w-3 h-3 text-emerald-600" />
                <span>Isi Contoh Lengkap</span>
              </button>
              <button
                type="button"
                onClick={handleResetAnswers}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium transition-colors cursor-pointer text-[11px]"
                title="Kosongkan semua pilihan jawaban"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" />
                <span>Kosongkan</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-400">
              {answeredCount === totalQuestions ? '✅ Semua 20 butir terisi' : `Masih ada ${totalQuestions - answeredCount} butir`}
            </span>
          </div>
        </div>

        {/* Question Grid Navigator (Pills 1..20) */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Peta Nomor Pertanyaan (Klik untuk melompat):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SCREENING_QUESTIONS.map((q, i) => {
              const isFilled = answers[q.id] !== undefined;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`question-${q.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center border ${
                    isFilled
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={`Pertanyaan ${i + 1}: ${q.topicLabel} (${isFilled ? 'Sudah terisi' : 'Belum terisi'})`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter by Topic */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Filter Tampilan Aspek:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {topicsList.map(t => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTopicFilter(t.key)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeTopicFilter === t.key
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {filteredQuestions.map((q) => {
          const originalIndex = SCREENING_QUESTIONS.findIndex(item => item.id === q.id);
          const qNumber = originalIndex + 1;
          const selectedVal = answers[q.id];

          return (
            <div
              key={q.id}
              id={`question-${q.id}`}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs transition-shadow hover:shadow-sm scroll-mt-24"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {qNumber}
                  </span>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    {getTopicIcon(q.topic)}
                    <span>{q.topicLabel}</span>
                  </div>
                </div>

                {selectedVal !== undefined ? (
                  <span className="inline-flex items-center space-x-1 text-emerald-600 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Terisi ({selectedVal})</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                    Belum dijawab
                  </span>
                )}
              </div>

              {/* Question Body */}
              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                {q.text}
              </p>
              {q.helperText && (
                <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{q.helperText}</span>
                </p>
              )}

              {/* Options Likert Scale */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2">
                {OPTIONS.map(opt => {
                  const isChecked = selectedVal === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      id={`opt-${q.id}-${opt.value}`}
                      onClick={() => handleOptionSelect(q.id, opt.value)}
                      className={`p-3 rounded-xl border text-left sm:text-center transition-all flex sm:flex-col justify-between items-center sm:justify-center gap-1 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs ring-2 ring-emerald-500/20 font-semibold'
                          : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex sm:flex-col items-center gap-1.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] ${
                            isChecked
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <span className="text-xs">{opt.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 hidden lg:block sm:mt-1">
                        {opt.subLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Mandatory Safety Notice / Disclaimer */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200/90 p-4 sm:p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold block mb-0.5">Catatan Penting:</span>
            Hasil screening 20 butir ini berfungsi hanya sebagai <span className="font-semibold">pemeriksaan awal</span> dan sarana refleksi kondisi belajar di sekolah, <span className="font-bold underline">bukan diagnosis medis atau gangguan kejiwaan psikologis klinis</span>. Seluruh data jawabanmu bersifat rahasia dan hanya dapat diakses oleh Guru BK MTsN 2 Bombana untuk pendampingan siswa.
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            id="btn-cancel-screening"
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm transition-colors text-center"
          >
            Batal & Kembali ke Beranda
          </button>

          <button
            id="btn-submit-screening"
            type="submit"
            disabled={isSubmitting || answeredCount < totalQuestions}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white shadow-sm flex items-center justify-center gap-2 transition-colors ${
              answeredCount === totalQuestions
                ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                : 'bg-slate-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span>Menyimpan 20 Jawaban...</span>
            ) : (
              <>
                <span>Lihat Hasil Screening ({answeredCount}/{totalQuestions})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

