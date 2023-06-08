import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.interface';

export const getPosts = createAction('[Feed Component] Get Posts');

export const getPostsSuccess = createAction(
  '[Feed Component] Get Posts Success',
  props<{ posts: Post[] }>()
);
