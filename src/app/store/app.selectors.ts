import { AppState, FeedState } from './app.state';
import { createSelector } from '@ngrx/store';

export const selectPosts = createSelector(
  (state: AppState) => state.feed,
  (state: FeedState) => state.posts
);
