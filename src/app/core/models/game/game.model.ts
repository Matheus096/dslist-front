export interface GameMin {
  id: number;
  title: string;
  year: number;
  imgUrl: string;
  shortDescription: string;
}

export interface Game extends GameMin {
  genre: string;
  platforms: string;
  score: number;
  longDescription: string;
}