import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import { getPostsSuccess } from './app.actions';

export const reducer = createReducer(
  initialAppState,
  on(getPostsSuccess, (state, { posts }) => ({ ...state, posts }))
);
