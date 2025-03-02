export interface Card {
  id: number;
  title: string;
  description: string;
  header: string;
  subheader: string;
  style: string;
  styleClass: string;
}

export interface List {
  id: number;
  title: string;
  cards: Card[];
}
