import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConsultationRequest } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  FileText,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const { studentConsultations, setActiveTab } = useApp();
  const [selectedMeeting, setSelectedMeeting] = useState<ConsultationRequest | null>(null);

  const scheduledMeetings = studentConsultations.filter(
    c => c.status === 'terjadwal' || c.status === 'disetujui' || c.status === 'selesai'
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-cyan-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <Calendar className="w-4 h-4" />
          <span>Jadwal Bimbingan & Konseling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Jadwal Konsultasi Temu
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Berikut adalah daftar jadwal sesi konsultasi tatap muka antara kamu dan Guru BK. Hadirlah tepat waktu di Ruang BK sesuai jadwal yang telah disepakati.
        </p>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Daftar Pertemuan Terjadwal ({scheduledMeetings.length})
          </h2>
          <button
            id="btn-schedule-new-consult"
            onClick={() => setActiveTab('konsultasi')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>+ Buat Permintaan Baru</span>
          </button>
        </div>

        {scheduledMeetings.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold text-slate-700">Belum ada jadwal pertemuan</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Kamu belum memiliki sesi bimbingan yang terjadwal. Silakan kirim permintaan konsultasi terlebih dahulu.
            </p>
            <button
              id="btn-goto-consult-from-schedule"
              onClick={() => setActiveTab('konsultasi')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
            >
              Ajukan Konsultasi Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduledMeetings.map(item => {
              const isFinished = item.status === 'selesai';

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isFinished
                      ? 'bg-slate-50 border-slate-200 opacity-90'
                      : 'bg-emerald-50/40 border-emerald-200 shadow-xs hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Status badge and topic */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-white text-slate-800 border border-slate-200">
                        Topik: {item.topic.replace('_', ' ')}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          isFinished
                            ? 'bg-slate-100 text-slate-700 border-slate-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        {isFinished ? '🎯 Selesai' : '✅ Terjadwal'}
                      </span>
                    </div>

                    {/* Schedule Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Hari & Tanggal</span>
                        <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{item.scheduledDayName || 'Selasa'}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{item.scheduledDate || '16 Sep 2026'}</span>
                      </div>

                      <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Waktu Sesi</span>
                        <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{item.scheduledTime || '10.00 WITA'}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">Durasi: ~45 menit</span>
                      </div>
                    </div>

                    {/* Location & Teacher */}
                    <div className="p-2.5 bg-white rounded-xl border border-slate-100 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Tempat: <strong>{item.location || 'Ruang BK (Bilik 1)'}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>Guru BK: <strong>{item.teacherName}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Lihat Detail */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                    <button
                      id={`btn-view-detail-${item.id}`}
                      onClick={() => setSelectedMeeting(item)}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs shadow-2xs transition-colors text-center"
                    >
                      [ Lihat Detail ]
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Detail Pertemuan */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              id="btn-close-schedule-modal"
              onClick={() => setSelectedMeeting(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Detail Sesi Konsultasi Terjadwal</span>
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              Pertemuan Bimbingan 1-on-1
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Topik: {selectedMeeting.topic.replace('_', ' ')}
            </p>

            <div className="mt-5 space-y-3">
              {/* Meeting Info Summary */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hari & Tanggal:</span>
                  <span className="font-bold text-slate-800">
                    {selectedMeeting.scheduledDayName || 'Selasa'}, {selectedMeeting.scheduledDate || '16 September 2026'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Waktu:</span>
                  <span className="font-bold text-slate-800">{selectedMeeting.scheduledTime || '10.00 – 10.45 WIB'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tempat:</span>
                  <span className="font-bold text-slate-800">{selectedMeeting.location || 'Ruang BK (Bilik Konseling 1)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guru BK:</span>
                  <span className="font-bold text-slate-800">{selectedMeeting.teacherName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-800">
                    {selectedMeeting.status === 'selesai' ? 'Selesai' : '✅ Terjadwal'}
                  </span>
                </div>
              </div>

              {/* Message from student */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Hal yang Kamu Ajukan:</span>
                <p className="text-slate-600 italic">"{selectedMeeting.message}"</p>
              </div>

              {/* Teacher Notes if any */}
              {selectedMeeting.teacherNotes && (
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs">
                  <span className="font-bold text-sky-900 block mb-1">Catatan Persiapan dari Guru BK:</span>
                  <p className="text-sky-800">{selectedMeeting.teacherNotes}</p>
                </div>
              )}

              {/* Helpful tips for the student */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 space-y-1.5">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Tips Tenang Sebelum Konseling:</span>
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-teal-800">
                  <li>Tarik napas dalam dan rileks, Guru BK adalah sahabat yang siap membantumu.</li>
                  <li>Tidak perlu khawatir dinilai buruk atau dihukum; konseling bukanlah ruang sanksi.</li>
                  <li>Jika jam pelajaran berlangsung saat jadwal temu, mintalah surat izin resmi dari Guru BK.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
