export interface Board {
  id: number;
  name: string;
  lists: List[];
}

export interface List {
  id: number;
  title: string;
  cards: Card[];
}

export interface Card {
  id: number;
  title: string;
  description: string;
  header: string;
  subheader: string;
  style: string;
  styleClass: string;
}
