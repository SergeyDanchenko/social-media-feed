import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.interface';
import { PostComment } from '../models/comment.interface';
import { AddCommentRequest } from '../models/add-comment-request.interface';
import { QueryParams } from '../models/query-params.interface';

// Get Posts
export const getPosts = createAction('[Feed Component] Get Posts');

export const getPostsSuccess = createAction(
  '[Feed Page] Get Posts Success',
  props<{ posts: Post[]; total: number }>()
);

// Create Post
export const createPost = createAction(
  '[Create Post Page] Create Post',
  props<{ post: Partial<Post> }>()
);

export const createPostSuccess = createAction(
  '[Create Post Page] Create Post Success'
);

export const createPostError = createAction(
  '[Create Post Page] Create Post Error'
);

// Get Comments for Post
export const getCommentsForPost = createAction(
  '[Post Component] Get Comments For Post',
  props<{ postId: number }>()
);

export const getCommentsForPostSuccess = createAction(
  '[Post Component] Get Comments For Post Success',
  props<{ comments: PostComment[]; postId: number }>()
);

export const getCommentsForPostError = createAction(
  '[Post Component] Get Comments For Post Error',
  props<{ postId: number }>()
);

// Update Post Server
export const updatePostServer = createAction(
  '[Post Component] Update Post Server',
  props<{ post: Partial<Post> }>()
)

export const updatePostServerSuccess = createAction(
  '[Post Component] Update Post Server Success',
  props<{ post: Post }>()
);

export const updatePostServerError = createAction(
  '[Post Component] Update Post Server Error',
);

// Update post UI
export const updatePostUI = createAction(
  '[Post Component] Update Post UI',
  props<{ post: Post }>()
);

// Add Comment
export const addComment = createAction(
  '[AddComment Component] Add Comment',
  props<{ addCommentBody: Partial<AddCommentRequest> }>()
);

export const addCommentSuccess = createAction(
  '[AddComment Component] Add Comment Success',
  props<{ comment: PostComment }>()
)

export const addCommentError = createAction(
  '[AddComment Component] Add Comment Error'
)

// Set Posts Query Params
export const setPostsQueryParams = createAction(
  '[Feed Component] Set Posts Query Params',
  props<{ postsQueryParams: QueryParams }>()
);

// Set Initial State
export const setInitialState = createAction('[Feed Page] Set Initial State')
