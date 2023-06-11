import { User } from './user.interface';

export interface PostComment {
  id: number;
  body: string;
  postId: number;
  user: User;
}
