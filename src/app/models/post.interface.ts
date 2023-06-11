export interface Post {
  id: number;
  title: string
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
  creationTime?: number;
  showComments?: boolean;
  liked?: boolean;
}
