import { Post } from '../models/post.interface';
import { PostComment } from '../models/comment.interface';
import { QueryParams } from '../models/query-params.interface';

export interface AppState {
  posts: Post[];
  postsPending: boolean;
  comments: PostComment[];
  postsWithPendingComments: number[];
  postsQueryParams: QueryParams,
  hasMorePosts: boolean;
}

export const initialAppState: AppState = {
  posts: [],
  postsQueryParams: {
    skip: 0,
    limit: 20,
  },
  hasMorePosts: true,
  postsPending: false,
  comments: [],
  postsWithPendingComments: [],
};

