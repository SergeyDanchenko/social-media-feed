import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import {
  addCommentSuccess,
  getCommentsForPost,
  getCommentsForPostSuccess,
  getPosts,
  getPostsSuccess
} from './app.actions';

export const reducer = createReducer(
  initialAppState,
  on(getPosts, state => ({ ...state, postsPending: true })),
  on(getPostsSuccess, (state, { posts }) => ({ ...state, posts, postsPending: false })),
  on(getCommentsForPost, (state, { postId }) => (
    { ...state, postsWithPendingComments: [...state.postsWithPendingComments, postId] }
  )),
  on(getCommentsForPostSuccess, (state, { comments, postId }) => (
    {
      ...state,
      comments: [...state.comments, ...comments],
      postsWithPendingComments: state.postsWithPendingComments.filter(id => id !== postId)
    }
  )),
  on(addCommentSuccess, (state, { comment }) => (
    { ...state, comments: [...state.comments, comment] }
  ))
);
