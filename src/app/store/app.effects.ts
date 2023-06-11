import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addComment, addCommentSuccess,
  createPost,
  createPostSuccess,
  getCommentsForPost,
  getCommentsForPostSuccess,
  getPosts,
  getPostsSuccess
} from './app.actions';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarSuccessMessages } from '../enums/snack-bar-messages.enum';
import { PostComment } from '../models/comment.interface';
import { AddCommentRequest } from '../models/add-comment-request.interface';

@Injectable()
export class AppEffects {

  getPosts$ = createEffect(() => this._actions$.pipe(
    ofType(getPosts),
    switchMap(() => this._postService.getPosts().pipe(
      map(resp => getPostsSuccess({ posts: resp.posts }))
      )),
    )
  );

  getCommentsForPost$ = createEffect(() => this._actions$.pipe(
    ofType(getCommentsForPost),
    mergeMap(({ postId }) => this._postService.getPostsForComments(postId).pipe(
      map(resp => getCommentsForPostSuccess({ comments: resp.comments, postId }))
    ))
  ))

  createPost$ = createEffect(() => this._actions$.pipe(
    ofType(createPost),
    mergeMap(({ post }) => this._postService.createPost({ ...post, reactions: 0, userId: 1 }).pipe(
      tap(() => this._snackBarService.showMessage(SnackBarSuccessMessages.POST_CREATED)),
      map(() => createPostSuccess())
    ))
  ));

  createPostSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(createPostSuccess),
    tap(() => {
      this._router.navigateByUrl('/feed');
    })
  ),
    { dispatch: false }
  );

  addComment$ = createEffect(() => this._actions$.pipe(
    ofType(addComment),
    mergeMap(({ addCommentBody }) =>
      this._postService.addComment({ ...addCommentBody, userId: 1 } as AddCommentRequest).pipe(
        map((comment: PostComment) => addCommentSuccess({ comment })),
    )),
  ));

  constructor(
    private _actions$: Actions,
    private _postService: PostsService,
    private _router: Router,
    private _snackBarService: SnackBarService
  ) {}
}
