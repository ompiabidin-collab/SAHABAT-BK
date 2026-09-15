import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  UserCheck,
  AlertCircle,
  PhoneCall,
  CheckCircle2,
  FileText,
  HeartHandshake,
} from 'lucide-react';

export const PrivacyView: React.FC = () => {
  const { schoolSettings } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Komitmen Privasi & Kode Etik Bimbingan Konseling</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Privasi & Keamanan Informasi Siswa
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Di Sahabat BK, rasa aman dan kepercayaanmu adalah yang paling utama. Kami menerapkan asas kerahasiaan profesi Bimbingan dan Konseling secara ketat.
        </p>
      </div>

      {/* 4 Pillars of Confidentiality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pilar 1: Kerahasiaan Mutlak dari Siswa Lain */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-800">
            Siswa Lain Tidak Dapat Melihat Datamu ❌
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Hasil screening, curahan hati, maupun jadwal konsultasimu bersifat <strong>pribadi 100%</strong>. Siswa lain, teman sekelas, maupun ketua kelas tidak memiliki akses ke rekaman akunmu.
          </p>
        </div>

        {/* Pilar 2: Hak Akses Khusus Guru BK */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-800">
            Hanya Guru BK Berwenang yang Mengakses 👩‍🏫
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Informasi bimbingan hanya dapat dilihat oleh Guru BK yang memang ditugaskan mendampingi kelasmu, semata-mata untuk memberikan bimbingan dan bantuan yang kamu perlukan.
          </p>
        </div>

        {/* Pilar 3: Asas Kerahasiaan BK */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-800">
            Berdasarkan Kode Etik Permendikbud 📜
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sesuai <strong>Permendikbud No. 111 Tahun 2014</strong> tentang Bimbingan dan Konseling pada Pendidikan Dasar dan Menengah, Guru BK terikat sumpah profesi untuk menjaga kerahasiaan konseli (siswa).
          </p>
        </div>

        {/* Pilar 4: Bukan Tempat Sanksi / Hukuman */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-800">
            Ruang BK Adalah Ruang Sahabat, Bukan Ruang Hukuman 🌸
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Menghubungi Guru BK bukan berarti kamu "bermasalah" atau "sedang dihukum". Ruang BK adalah tempat aman bagi siapa saja yang ingin berkembang, mencari teman bicara, dan melepas beban pikiran.
          </p>
        </div>
      </div>

      {/* FAQ Kerahasiaan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-800">
          Pertanyaan Seputar Privasi Siswa
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">
              Q: Apakah Guru Mata Pelajaran atau Wali Kelas bisa membaca pesan konsultasiku?
            </p>
            <p className="text-slate-600 leading-relaxed">
              Jawab: Tidak. Guru mata pelajaran tidak memiliki akses ke sistem percakapan atau isian screening pribadi siswa di Sahabat BK. Jika diperlukan kerja sama akademik, Guru BK hanya akan berkoordinasi secara umum atas persetujuanmu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">
              Q: Kapan batasan kerahasiaan dapat dikecualikan?
            </p>
            <p className="text-slate-600 leading-relaxed">
              Jawab: Sesuai etika konseling dunia, satu-satunya pengecualian adalah jika terdapat indikasi bahaya fisik yang mengancam keselamatan nyawa siswa atau orang lain (misalnya kekerasan fisik berat atau niat membahayakan diri). Dalam situasi darurat tersebut, Guru BK wajib berkoordinasi demi melindungi keselamatan siswa.
            </p>
          </div>
        </div>
      </div>

      {/* Bantuan Darurat & Hotline Resmi */}
      <div className="rounded-3xl bg-amber-50 border border-amber-200 p-6 sm:p-8 space-y-3">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
          <PhoneCall className="w-5 h-5 text-amber-700" />
          <span>Layanan Bantuan & Hotline Perlindungan Anak</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
          Jika kamu atau temanmu mengalami situasi darurat kekerasan fisik, perundungan berat, atau krisis mendesak di luar jam sekolah, kamu dapat menghubungi layanan resmi pemerintah:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="font-bold text-slate-800 block">SAPA 129 (KemenPPPA)</span>
            <span className="text-slate-600">Telepon Bebas Pulsa: 129 atau WA 08111-129-129</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200">
            <span className="font-bold text-slate-800 block">Kontak Resmi BK Sekolah</span>
            <span className="text-emerald-700 font-bold">{schoolSettings.officialBkPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
