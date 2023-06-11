import { AppState } from './app.state';
import { createSelector } from '@ngrx/store';
import { PostComment } from "../models/comment.interface";

const selectState = (state: any) => state.feed;

export const selectPosts = createSelector(
  selectState,
  (state: AppState) => state.posts
);

export const selectCommentsByPostId = createSelector(
  selectState,
  (state: AppState, { postId }: { postId: number }) =>
    state.comments.filter((comment: PostComment) => comment.postId === postId)
);

export const selectPostsPending = createSelector(
  selectState,
  (state: AppState) => state.postsPending
)

export const selectCommentsForPostPending = createSelector(
  selectState,
  (state: AppState, { postId }: { postId: number }) =>
    state.postsWithPendingComments.indexOf(postId) !== -1
);
