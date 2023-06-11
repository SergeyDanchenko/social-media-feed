import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import * as appActions from './app.actions';
import { Post } from '../models/post.interface';
import { cloneDeep } from 'lodash';

export const reducer = createReducer(
  initialAppState,
  on(appActions.getPosts, state => ({ ...state, postsPending: true })),
  on(appActions.getPostsSuccess, (state, { posts, total }) => {
    const newPosts: Post[] = cloneDeep(posts);
    newPosts.forEach(post => {
      post.liked = false;
      post.showComments = false;
    });
    return {
      ...state,
      posts: [...state.posts, ...newPosts],
      postsPending: false,
      hasMorePosts: total >= state.postsQueryParams.skip,
    }
  }),
  on(appActions.getCommentsForPost, (state, { postId }) => (
    { ...state, postsWithPendingComments: [...state.postsWithPendingComments, postId] }
  )),
  on(appActions.getCommentsForPostSuccess, (state, { comments, postId }) => (
    {
      ...state,
      comments: [...state.comments, ...comments],
      postsWithPendingComments: state.postsWithPendingComments.filter(id => id !== postId)
    }
  )),
  on(appActions.getCommentsForPostError, (state, { postId }) => (
    { ...state,
      postsWithPendingComments: state.postsWithPendingComments.filter(id => id !== postId)
    }
  )),
  on(appActions.addCommentSuccess, (state, { comment }) => (
    { ...state, comments: [...state.comments, comment] }
  )),
  on(appActions.setPostsQueryParams, (state, { postsQueryParams }) => ({ ...state, postsQueryParams })),
  on(appActions.updatePostServerSuccess, (state, { post }) => (
    { ...state, posts: updatePost(state.posts, post) }
  )),
  on(appActions.updatePostUI, (state, { post }) => (
    { ...state, posts: updatePost(state.posts, post) }
  )),
  on(appActions.setInitialState, () => initialAppState),
);

const updatePost = (originalPosts: Post[], post: Post): Post[] => {
  const posts: Post[] = cloneDeep(originalPosts);
  const targetPost: Post = posts.find(item => item.id === post.id) as Post;
  const targetPostIndex: number = posts.indexOf(targetPost);
  if (targetPostIndex !== -1) {
    posts[targetPostIndex] = post;
  }
  return posts;
};
