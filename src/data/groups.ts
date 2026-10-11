export interface GroupData {
  id: number;
  name: string;
  members: string[];
  color: string;
}

export const OFFICIAL_GROUPS: GroupData[] = [
  {
    id: 1,
    name: 'Kelompok 1',
    members: [
      'Ririn Dewi Hanifah',
      'Mohamad Ridwan Maulana',
      'Emelly Nur Anisa',
      'Galih Bintang Maheswara',
    ],
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    name: 'Kelompok 2',
    members: [
      'Rizky Anugrah',
      'Azra Ufaira Nahdha',
      'Farah Birliana Putri',
      'Dimas Naufal Alvaro',
    ],
    color: 'from-cyan-500 to-teal-500',
  },
  {
    id: 3,
    name: 'Kelompok 3',
    members: [
      'Umi Khoerotu Nisa',
      'Tantri Salsa Meilani',
      'Ricky Anggara Pradita',
      'Jaka Triska Sugiarto',
    ],
    color: 'from-emerald-500 to-green-600',
  },
  {
    id: 4,
    name: 'Kelompok 4',
    members: [
      'Aprilia Dwi Yasmin',
      'Azka Aulia Rakhma',
      'Alfino Cakra Aditia',
      'Rakha Syarif Umra',
    ],
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 5,
    name: 'Kelompok 5',
    members: [
      'Zahira Putri Rahmadani',
      'Dimas Prasetio',
      'Alviano Adiansyah',
      'Rizqi Fathurrokhim',
    ],
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 6,
    name: 'Kelompok 6',
    members: [
      'Risqi Dwi Maulana',
      'Gita Lestari',
      'Amruri Salam Riyadi',
      'Weni Putri Marliana',
    ],
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 7,
    name: 'Kelompok 7',
    members: [
      'Septi Aulia Ningrum',
      'Vita Nur Aliysa',
      'Elvindra Ghazie Septanandra',
      'Dodit Hendra Jati',
    ],
    color: 'from-sky-500 to-indigo-500',
  },
  {
    id: 8,
    name: 'Kelompok 8',
    members: [
      'Natasya Amanda Marchilla',
      'Khoerul Nur Shofari',
      'Ghani Insan Fernanda',
    ],
    color: 'from-teal-600 to-cyan-700',
  },
];
