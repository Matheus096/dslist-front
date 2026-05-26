// Interface baseada no ReviewDTO do Java
export interface ReviewDTO {
  id?: number;
  gameId: number;
  text: string;
  rating: number;
  createdAt?: string;
  userId?: number;
  userName?: string;
}