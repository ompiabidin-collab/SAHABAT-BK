import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCREENING_QUESTIONS } from '../data/mockData';
import {
  ConsultationRequest,
  ScreeningSubmission,
  ScreeningCategory,
} from '../types';
import {
  Users,
  ClipboardList,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Filter,
  Search,
  FileEdit,
  X,
  Plus,
  HeartHandshake,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const TeacherDashboardView: React.FC = () => {
  const {
    currentUser,
    teacherConsultations,
    submissions,
    updateConsultation,
    updateSubmissionTeacherNote,
    createConsultationRequest,
    setActiveTab,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'permintaan' | 'screening' | 'jadwal'>('permintaan');
  const [screeningFilter, setScreeningFilter] = useState<'semua' | ScreeningCategory>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Atur Jadwal
  const [schedulingItem, setSchedulingItem] = useState<ConsultationRequest | null>(null);
  const [schedDay, setSchedDay] = useState('Rabu');
  const [schedDate, setSchedDate] = useState('2026-09-16');
  const [schedTime, setSchedTime] = useState('10.00 – 10.45 WITA');
  const [schedLocation, setSchedLocation] = useState('Ruang BK (Bilik Konseling 1)');
  const [schedNotes, setSchedNotes] = useState('');

  // Modal Catatan Screening Siswa
  const [selectedSubmission, setSelectedSubmission] = useState<ScreeningSubmission | null>(null);
  const [teacherNoteText, setTeacherNoteText] = useState('');
  const [viewingAnswersSubmission, setViewingAnswersSubmission] = useState<ScreeningSubmission | null>(null);

  // Stats calculation
  const totalStudents = 120; // 4 kelas binaan
  const totalScreenings = submissions.length;
  const pendingRequests = teacherConsultations.filter(c => c.status === 'menunggu');
  const todaySchedules = teacherConsultations.filter(c => c.status === 'terjadwal');
  const urgentScreenings = submissions.filter(s => s.category === 'konsultasi' || s.category === 'perhatian');

  const handleOpenScheduleModal = (item: ConsultationRequest) => {
    setSchedulingItem(item);
    setSchedDay(item.scheduledDayName || 'Rabu');
    setSchedDate(item.scheduledDate || '2026-09-16');
    setSchedTime(item.scheduledTime || '10.00 – 10.45 WITA');
    setSchedLocation(item.location || 'Ruang BK (Bilik Konseling 1)');
    setSchedNotes(item.teacherNotes || '');
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingItem) return;

    updateConsultation(schedulingItem.id, {
      status: 'terjadwal',
      scheduledDayName: schedDay,
      scheduledDate: schedDate,
      scheduledTime: schedTime,
      location: schedLocation,
      teacherNotes: schedNotes,
    });

    setSchedulingItem(null);
  };

  const handleDirectAccept = (item: ConsultationRequest) => {
    updateConsultation(item.id, {
      status: 'terjadwal',
      scheduledDayName: 'Selasa',
      scheduledDate: '2026-09-16',
      scheduledTime: '10.00 – 10.45 WITA',
      location: 'Ruang BK (Bilik Konseling 1)',
      teacherNotes: 'Siswa dapat hadir pada jam istirahat pertama.',
    });
  };

  const handleMarkComplete = (item: ConsultationRequest) => {
    const summary = prompt('Masukkan catatan tindak lanjut singkat setelah sesi selesai:', 'Sesi berjalan lancar, siswa menunjukkan pemahaman strategi belajar baru.');
    if (summary !== null) {
      updateConsultation(item.id, {
        status: 'selesai',
        meetingSummary: summary,
      });
    }
  };

  const handleSaveSubmissionNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;
    updateSubmissionTeacherNote(selectedSubmission.id, teacherNoteText);
    setSelectedSubmission(null);
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter(sub => {
    const matchesFilter = screeningFilter === 'semua' || sub.category === screeningFilter;
    const matchesSearch =
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.studentClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-sky-700 font-semibold text-xs uppercase tracking-wider mb-2">
            <span>👩‍🏫 Portal Guru Bimbingan dan Konseling</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Dashboard Bimbingan & Konseling
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Selamat datang, <span className="font-semibold text-slate-800">{currentUser?.name}</span>. Pantau kesejahteraan siswa dan kelola sesi konsultasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-teacher-view-privacy"
            onClick={() => setActiveTab('privasi')}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
          >
            🔒 Pedoman Kerahasiaan
          </button>
        </div>
      </div>

      {/* Top 4 Stats Counters as requested in prompt */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Jumlah Siswa */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">👥 Jumlah Siswa</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{totalStudents}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Siswa Binaan Kelas VIII</p>
        </div>

        {/* 2. Screening Masuk */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">📝 Screening Masuk</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{totalScreenings}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
            {urgentScreenings.length} siswa perlu perhatian
          </p>
        </div>

        {/* 3. Permintaan Konsultasi */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">💬 Permintaan Konsultasi</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{pendingRequests.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Menunggu konfirmasi jadwal</p>
        </div>

        {/* 4. Jadwal Hari Ini */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">📅 Jadwal Bimbingan</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{todaySchedules.length}</p>
          <p className="text-[11px] text-teal-600 font-semibold mt-0.5">Sesi aktif bimbingan</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 space-x-2">
        <button
          id="tab-teacher-requests"
          onClick={() => setActiveSubTab('permintaan')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'permintaan'
              ? 'border-sky-600 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>💬 Permintaan Konsultasi</span>
          {pendingRequests.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          id="tab-teacher-screening"
          onClick={() => setActiveSubTab('screening')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'screening'
              ? 'border-sky-600 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>📝 Data Screening Siswa</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
            {submissions.length}
          </span>
        </button>

        <button
          id="tab-teacher-schedules"
          onClick={() => setActiveSubTab('jadwal')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'jadwal'
              ? 'border-sky-600 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>📅 Jadwal Konsultasi Temu</span>
          <span className="px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
            {todaySchedules.length}
          </span>
        </button>
      </div>

      {/* TAB 1: PERMINTAAN KONSULTASI */}
      {activeSubTab === 'permintaan' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">
              Antrean Permintaan Konsultasi Siswa
            </h2>
            <span className="text-xs text-slate-500">
              Data bersifat rahasia antar Siswa dan Guru BK
            </span>
          </div>

          {teacherConsultations.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              Belum ada permintaan konsultasi masuk.
            </div>
          ) : (
            <div className="space-y-3">
              {teacherConsultations.map(req => {
                const isPending = req.status === 'menunggu';
                const isScheduled = req.status === 'terjadwal';
                const isCompleted = req.status === 'selesai';

                return (
                  <div
                    key={req.id}
                    className={`bg-white rounded-2xl p-5 border transition-all space-y-3 ${
                      isPending
                        ? 'border-amber-300 shadow-xs ring-1 ring-amber-400/20'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                          {req.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-slate-800">
                              👤 Siswa: {req.studentName}
                            </span>
                            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[11px] font-semibold">
                              Kelas: {req.studentClass}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Diajukan pada: {req.createdAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-slate-100 text-slate-700 border border-slate-200">
                          Topik: {req.topic.replace('_', ' ')}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            isPending
                              ? 'bg-amber-100 text-amber-800'
                              : isScheduled
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Status: {req.status === 'menunggu' ? 'Menunggu' : req.status === 'terjadwal' ? 'Terjadwal' : 'Selesai'}
                        </span>
                      </div>
                    </div>

                    {/* Student Message Body */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-500 block text-[11px] mb-0.5">
                        Hal yang Ingin Dibicarakan Siswa:
                      </span>
                      "{req.message}"
                    </div>

                    {req.preferredDays && (
                      <p className="text-xs text-slate-500">
                        Preferensi Siswa: <strong>{req.preferredDays}</strong>
                      </p>
                    )}

                    {/* If Scheduled */}
                    {isScheduled && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>Hari: <strong>{req.scheduledDayName || 'Rabu'}</strong> ({req.scheduledDate})</div>
                        <div>Waktu: <strong>{req.scheduledTime}</strong></div>
                        <div>Tempat: <strong>{req.location}</strong></div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isPending && (
                          <>
                            <button
                              id={`btn-accept-fast-${req.id}`}
                              onClick={() => handleDirectAccept(req)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-2xs"
                            >
                              [Terima]
                            </button>
                            <button
                              id={`btn-schedule-custom-${req.id}`}
                              onClick={() => handleOpenScheduleModal(req)}
                              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors shadow-2xs"
                            >
                              [Pilih Jadwal / Atur Jadwal]
                            </button>
                          </>
                        )}

                        {isScheduled && (
                          <>
                            <button
                              id={`btn-reschedule-${req.id}`}
                              onClick={() => handleOpenScheduleModal(req)}
                              className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium"
                            >
                              Ubah Jadwal
                            </button>
                            <button
                              id={`btn-finish-consult-${req.id}`}
                              onClick={() => handleMarkComplete(req)}
                              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                            >
                              Selesaikan & Beri Catatan
                            </button>
                          </>
                        )}

                        {isCompleted && req.meetingSummary && (
                          <div className="text-xs text-slate-500 italic">
                            Catatan Tindak Lanjut: "{req.meetingSummary}"
                          </div>
                        )}
                      </div>

                      <span className="text-[11px] text-slate-400">
                        ID: {req.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DATA SCREENING SISWA */}
      {activeSubTab === 'screening' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Data Screening Siswa Masuk
              </h2>
              <p className="text-xs text-slate-500">
                Deteksi dini kondisi belajar & kesejahteraan siswa kelas binaan
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setScreeningFilter('semua')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                  screeningFilter === 'semua'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Semua ({submissions.length})
              </button>
              <button
                onClick={() => setScreeningFilter('konsultasi')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                  screeningFilter === 'konsultasi'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white border border-slate-200 text-rose-700 hover:bg-rose-50'
                }`}
              >
                Disarankan Konsultasi ({submissions.filter(s => s.category === 'konsultasi').length})
              </button>
              <button
                onClick={() => setScreeningFilter('perhatian')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                  screeningFilter === 'perhatian'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white border border-slate-200 text-amber-700 hover:bg-amber-50'
                }`}
              >
                Perlu Perhatian ({submissions.filter(s => s.category === 'perhatian').length})
              </button>
              <button
                onClick={() => setScreeningFilter('baik')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                  screeningFilter === 'baik'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                Kondisi Baik ({submissions.filter(s => s.category === 'baik').length})
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama siswa atau kelas..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
            />
          </div>

          {/* Submission List Table / Cards */}
          <div className="space-y-3">
            {filteredSubmissions.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
                Tidak ada data screening yang sesuai dengan kriteria.
              </div>
            ) : (
              filteredSubmissions.map(sub => {
                let badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                let label = 'Kondisi Baik';
                if (sub.category === 'perhatian') {
                  badgeStyle = 'bg-amber-100 text-amber-800 border-amber-300';
                  label = 'Perlu Perhatian';
                } else if (sub.category === 'konsultasi') {
                  badgeStyle = 'bg-rose-100 text-rose-800 border-rose-300';
                  label = 'Disarankan Konsultasi';
                }

                return (
                  <div
                    key={sub.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                          {sub.studentName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-800">
                            {sub.studentName}
                          </span>
                          <span className="text-xs text-slate-500 ml-2 font-medium">
                            Kelas {sub.studentClass}
                          </span>
                          <p className="text-[11px] text-slate-400">
                            Tanggal Pengisian: {sub.submittedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyle}`}>
                          {label}
                        </span>
                        <span className="text-xs text-slate-500">
                          Skor: {sub.totalScore}/{sub.maxScore}
                        </span>
                      </div>
                    </div>

                    {/* Teacher note or quick action */}
                    {sub.teacherNote ? (
                      <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200 text-xs text-sky-900">
                        <span className="font-bold block mb-0.5">Catatan Tindak Lanjut Guru BK:</span>
                        "{sub.teacherNote}"
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic">
                        Belum ada catatan tindak lanjut dari Guru BK.
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <button
                          id={`btn-view-answers-${sub.id}`}
                          onClick={() => setViewingAnswersSubmission(sub)}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                        >
                          <ClipboardList className="w-3.5 h-3.5" />
                          <span>Rincian 20 Jawaban</span>
                        </button>

                        <button
                          id={`btn-note-sub-${sub.id}`}
                          onClick={() => {
                            setSelectedSubmission(sub);
                            setTeacherNoteText(sub.teacherNote || '');
                          }}
                          className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                          <span>{sub.teacherNote ? 'Edit Catatan Tindak Lanjut' : '+ Beri Catatan'}</span>
                        </button>
                      </div>

                      {sub.category !== 'baik' && (
                        <button
                          id={`btn-invite-student-${sub.id}`}
                          onClick={() => {
                            createConsultationRequest(
                              'belajar',
                              `Undangan konsultasi proaktif dari Guru BK berdasarkan hasil screening (${label}).`,
                              currentUser?.id || 'guru-1'
                            );
                            alert(`Undangan konsultasi telah dibuat untuk siswa ${sub.studentName}.`);
                          }}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          + Undang Konsultasi
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: JADWAL KONSULTASI TEMU */}
      {activeSubTab === 'jadwal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Jadwal Konsultasi Tatap Muka
              </h2>
              <p className="text-xs text-slate-500">
                Daftar sesi temu yang aktif di Ruang BK
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaySchedules.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Siswa: {item.studentName} ({item.studentClass})
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ✅ Terjadwal
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.scheduledDayName}, {item.scheduledDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic">
                  Topik: <strong>{item.topic.replace('_', ' ')}</strong> &bull; "{item.message}"
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenScheduleModal(item)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => handleMarkComplete(item)}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                  >
                    Selesaikan Sesi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Atur Jadwal Konsultasi */}
      {schedulingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSchedulingItem(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-sky-700 font-bold text-xs uppercase mb-1">
              <Calendar className="w-4 h-4" />
              <span>Tentukan Jadwal Konsultasi</span>
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Atur Pertemuan Siswa
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Siswa: <span className="font-semibold text-slate-800">{schedulingItem.studentName}</span> ({schedulingItem.studentClass})
            </p>

            <form onSubmit={handleSaveSchedule} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hari</label>
                  <select
                    value={schedDay}
                    onChange={e => setSchedDay(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={schedDate}
                    onChange={e => setSchedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jam Layanan</label>
                <input
                  type="text"
                  value={schedTime}
                  onChange={e => setSchedTime(e.target.value)}
                  placeholder="Contoh: 10.00 – 10.45 WIB"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tempat / Ruangan</label>
                <input
                  type="text"
                  value={schedLocation}
                  onChange={e => setSchedLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Catatan Guru BK untuk Siswa</label>
                <textarea
                  rows={2}
                  value={schedNotes}
                  onChange={e => setSchedNotes(e.target.value)}
                  placeholder="Contoh: Harap membawa tugas latihan yang membuatmu bingung."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSchedulingItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold"
                >
                  Simpan Jadwal & Kirim ke Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Beri Catatan Screening */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-800">
              Catatan Tindak Lanjut Guru BK
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Siswa: <strong>{selectedSubmission.studentName}</strong> (Kelas {selectedSubmission.studentClass})
            </p>

            <form onSubmit={handleSaveSubmissionNote} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Catatan Evaluasi / Rekomendasi Pendampingan:
                </label>
                <textarea
                  required
                  rows={4}
                  value={teacherNoteText}
                  onChange={e => setTeacherNoteText(e.target.value)}
                  placeholder="Tuliskan catatan tindak lanjut, misalnya: Siswa menunjukkan kecemasan saat ujian. Perlu bimbingan relaksasi dan koordinasi dengan wali kelas..."
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Rincian 20 Jawaban Siswa */}
      {viewingAnswersSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setViewingAnswersSubmission(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Modal */}
            <div className="border-b border-slate-100 pb-3 pr-8">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Screening 20 Butir
                </span>
                <span className="text-xs text-slate-400">
                  {viewingAnswersSubmission.submittedAt}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-1">
                Rincian Jawaban Siswa: {viewingAnswersSubmission.studentName}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                <span>Kelas: <strong>{viewingAnswersSubmission.studentClass}</strong></span>
                <span>&bull;</span>
                <span>
                  Total Skor: <strong className="text-emerald-700">{viewingAnswersSubmission.totalScore}</strong> / {viewingAnswersSubmission.maxScore}
                </span>
                <span>&bull;</span>
                <span className="font-semibold">
                  Status: {viewingAnswersSubmission.category === 'konsultasi' ? 'Perlu Konsultasi Segera' : viewingAnswersSubmission.category === 'perhatian' ? 'Perlu Perhatian' : 'Kondisi Baik'}
                </span>
              </div>
            </div>

            {/* List 20 Questions & Answers */}
            <div className="overflow-y-auto py-3 space-y-2.5 flex-1 pr-1">
              {SCREENING_QUESTIONS.map((q, idx) => {
                const answerVal = viewingAnswersSubmission.answers[q.id] ?? 0;
                const optionLabels = [
                  'Tidak pernah (0)',
                  'Jarang (1)',
                  'Kadang-kadang (2)',
                  'Sering (3)',
                  'Sangat sering (4)',
                ];

                let pillColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                if (answerVal >= 3) {
                  pillColor = 'bg-rose-50 text-rose-800 border-rose-200';
                } else if (answerVal === 2) {
                  pillColor = 'bg-amber-50 text-amber-800 border-amber-200';
                }

                return (
                  <div
                    key={q.id}
                    className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/70 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {q.topicLabel}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-bold border text-[11px] ${pillColor}`}>
                        {optionLabels[answerVal]}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pl-6">
                      {q.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer Modal */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Data bimbingan konseling MTsN 2 Bombana
              </span>
              <button
                type="button"
                onClick={() => setViewingAnswersSubmission(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
