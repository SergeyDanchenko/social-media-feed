import { Post } from '../models/post.interface';

export interface AppState {
  feed: FeedState;
}

export interface FeedState {
  posts: Post[];
}

export const initialFeedState: FeedState =  {
  posts: [],
}

export const initialAppState: AppState = {
  feed: initialFeedState,
};

