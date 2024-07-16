export interface Rune {
  id: string;
  key: string;
  name: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  index: number;
}

export interface RuneSlot {
  rowOne: Rune[];
  rowTwo: Rune[];
  rowThree: Rune[];
  rowFour: Rune[];
}

export interface RuneTree {
  id: string;
  key: string;
  icon: string;
  name: string;
  slots: RuneSlot[];
}
