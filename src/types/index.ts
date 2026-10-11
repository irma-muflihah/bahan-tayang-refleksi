export interface SlideInfo {
  id: number;
  title: string;
  category: 'intro' | 'menu' | 'konsep' | 'eksplorasi' | 'penguatan' | 'evaluasi';
}

export interface Point2D {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export interface StudentGroup {
  groupNumber: number;
  members: string[];
}
