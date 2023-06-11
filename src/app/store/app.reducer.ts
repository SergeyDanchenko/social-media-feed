import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import {
  addCommentSuccess,
  getCommentsForPost, getCommentsForPostError,
  getCommentsForPostSuccess,
  getPosts,
  getPostsSuccess, setInitialState, setPostsQueryParams
} from './app.actions';

export const reducer = createReducer(
  initialAppState,
  on(getPosts, state => ({ ...state, postsPending: true })),
  on(getPostsSuccess, (state, { posts, total }) => (
    {
      ...state,
      posts: [...state.posts, ...posts],
      postsPending: false,
      hasMorePosts: total >= state.postsQueryParams.skip
    }
  )),
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
  on(getCommentsForPostError, (state, { postId }) => (
    { ...state,
      postsWithPendingComments: state.postsWithPendingComments.filter(id => id !== postId)
    }
  )),
  on(addCommentSuccess, (state, { comment }) => (
    { ...state, comments: [...state.comments, comment] }
  )),
  on(setPostsQueryParams, (state, { postsQueryParams }) => ({ ...state, postsQueryParams })),
  on(setInitialState, () => initialAppState),
);
