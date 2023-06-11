import { Post } from '../models/post.interface';
import { PostComment } from '../models/comment.interface';

export interface AppState {
  posts: Post[];
  postsPending: boolean;
  comments: PostComment[];
  postsWithPendingComments: number[];
}

export const initialAppState: AppState = {
  posts: [],
  postsPending: false,
  comments: [],
  postsWithPendingComments: [],
};

