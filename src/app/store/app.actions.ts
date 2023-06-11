import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.interface';
import { PostComment } from '../models/comment.interface';
import {AddCommentRequest} from "../models/add-comment-request.interface";

// Get Posts
export const getPosts = createAction('[Feed Component] Get Posts');

export const getPostsSuccess = createAction(
  '[Feed Page] Get Posts Success',
  props<{ posts: Post[] }>()
);

// Create Post
export const createPost = createAction(
  '[Create Post Page] Create Post',
  props<{ post: Partial<Post> }>()
);

export const createPostSuccess = createAction(
  '[Create Post Page] Create Post Success'
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

// Add Comment
export const addComment = createAction(
  '[AddComment Component] Add Comment',
  props<{ addCommentBody: Partial<AddCommentRequest> }>()
);

export const addCommentSuccess = createAction(
  '[AddComment Component] Add Comment Success',
  props<{ comment: PostComment }>()
)
