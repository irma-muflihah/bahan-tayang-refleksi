import React, { useState } from 'react';
import { Users, Search, Copy, Check, X, Sparkles, Filter, ChevronRight, UserCheck } from 'lucide-react';
import { OFFICIAL_GROUPS, GroupData } from '../data/groups';
import confetti from 'canvas-confetti';

interface GroupListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroupListModal: React.FC<GroupListModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalStudents = OFFICIAL_GROUPS.reduce((acc, g) => acc + g.members.length, 0);

  const filteredGroups = OFFICIAL_GROUPS.filter((group) => {
    if (selectedGroup !== null && group.id !== selectedGroup) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const groupMatches = group.name.toLowerCase().includes(query);
    const memberMatches = group.members.some((m) => m.toLowerCase().includes(query));
    return groupMatches || memberMatches;
  });

  const handleCopy = () => {
    let text = '📋 DAFTAR KELOMPOK MATEMATIKA KELAS IX\n';
    text += 'SMP Negeri 2 Kemranjen\n';
    text += 'Materi: Transformasi Geometri - Ruang Refleksi\n';
    text += 'Guru Pengampu: Irma Muflihah, S.Pd.\n\n';

    OFFICIAL_GROUPS.forEach((g) => {
      text += `📌 ${g.name} (${g.members.length} Siswa):\n`;
      g.members.forEach((m, idx) => {
        text += `   ${idx + 1}. ${m}\n`;
      });
      text += '\n';
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-5 md:p-7 max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide">
                  Daftar Kelompok Belajar Kelas IX
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-bold border border-cyan-700/60">
                  Resmi 8 Kelompok
                </span>
              </div>
              <p className="text-xs md:text-sm text-cyan-300 font-medium mt-0.5">
                SMP Negeri 2 Kemranjen &bull; Guru Pengampu: Irma Muflihah, S.Pd. &bull; Total {totalStudents} Siswa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              title="Salin ke Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Tersalin!' : 'Salin Daftar'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
          {/* Search box for students in class */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa atau kelompok..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-8 py-2 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter buttons (All or Group 1-8) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            <button
              onClick={() => setSelectedGroup(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedGroup === null
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Semua (8)
            </button>
            {OFFICIAL_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGroup(g.id === selectedGroup ? null : g.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedGroup === g.id
                    ? 'bg-cyan-400 text-slate-950 shadow-md font-black scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                K{g.id}
              </button>
            ))}
          </div>
        </div>

        {/* Groups Grid: 8 Official Groups matching Bu Irma's PDF */}
        <div className="flex-1 overflow-y-auto py-4 pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGroups.map((group) => {
              const isSpotlight = selectedGroup === group.id;
              return (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
                  className={`rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                    isSpotlight
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40 scale-[1.02]'
                      : 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90'
                  }`}
                >
                  <div>
                    {/* Group Header Badge */}
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-xs flex items-center justify-center shadow">
                          {group.id}
                        </span>
                        <h4 className="font-black text-white text-base">
                          {group.name}
                        </h4>
                      </div>
                      <span className="text-[11px] bg-slate-800 text-cyan-300 font-bold px-2 py-0.5 rounded-full border border-slate-700">
                        {group.members.length} Siswa
                      </span>
                    </div>

                    {/* Member list with numbers */}
                    <ul className="space-y-2">
                      {group.members.map((member, mIdx) => {
                        const isMatch =
                          searchQuery.trim() &&
                          member.toLowerCase().includes(searchQuery.toLowerCase());
                        return (
                          <li
                            key={mIdx}
                            className={`text-xs md:text-sm font-medium flex items-center gap-2 p-1.5 rounded-lg transition-colors ${
                              isMatch
                                ? 'bg-amber-400/20 text-amber-200 font-bold border border-amber-400/40'
                                : 'text-slate-200 hover:bg-slate-800/60'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                              {mIdx + 1}
                            </span>
                            <span className="truncate">{member}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Footer status */}
                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Siap Diskusi LKPD</span>
                    <span className="text-cyan-400 font-bold">Kelompok {group.id}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredGroups.length === 0 && (
            <div className="h-56 flex flex-col items-center justify-center text-center p-6 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
              <Users className="w-10 h-10 text-slate-600 mb-2" />
              <p className="text-slate-300 text-sm font-bold">
                Nama tidak ditemukan dalam daftar kelompok
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Silakan ketik nama lain atau klik tombol "Semua (8)" untuk menampilkan seluruh anggota.
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Disusun oleh Guru Pengampu: <strong className="text-slate-200">Irma Muflihah, S.Pd.</strong> &bull; SMP Negeri 2 Kemranjen
            </span>
          </div>
          <span className="text-cyan-400 font-medium">
            Ketuk salah satu kartu kelompok di IFP untuk mode fokus/sorot
          </span>
        </div>
      </div>
    </div>
  );
};
