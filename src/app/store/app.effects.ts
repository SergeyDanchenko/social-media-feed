import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from './app.actions';
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';
import { SnackBarErrorMessages, SnackBarSuccessMessages } from '../enums/snack-bar-messages.enum';
import { PostComment } from '../models/comment.interface';
import { AddCommentRequest } from '../models/add-comment-request.interface';
import { Store } from '@ngrx/store';
import { selectPostQueryParams } from './app.selectors';
import { Post } from '../models/post.interface';

@Injectable()
export class AppEffects {

  getPosts$ = createEffect(() => this._actions$.pipe(
    ofType(appActions.getPosts),
    withLatestFrom(this._store.select(selectPostQueryParams)),
    switchMap(([, queryParams]) => this._postService.getPosts(queryParams).pipe(
      map(({ posts, total }) => appActions.getPostsSuccess({ posts, total }))
      )),
    )
  );

  getCommentsForPost$ = createEffect(() => this._actions$.pipe(
    ofType(appActions.getCommentsForPost),
    mergeMap(({ postId }) => this._postService.getCommentsForPost(postId).pipe(
      map(resp => appActions.getCommentsForPostSuccess({ comments: resp.comments, postId })),
      catchError(() => of(appActions.getCommentsForPostError({ postId })))
    ))
  ));

  getCommentsForPostError$ = createEffect(
    () => this._actions$.pipe(
      ofType(appActions.getCommentsForPostError),
      tap(() => this._snackBarService.showError(SnackBarErrorMessages.LOAD_COMMENTS))
    ),
    { dispatch: false }
  );

  createPost$ = createEffect(() => this._actions$.pipe(
    ofType(appActions.createPost),
    mergeMap(({ post }) => this._postService.createPost({ ...post, reactions: 0, userId: 1 }).pipe(
      tap(() => this._snackBarService.showMessage(SnackBarSuccessMessages.POST_CREATION)),
      map(() => appActions.createPostSuccess()),
      catchError(() => of(appActions.createPostError()))
    ))
  ));

  createPostSuccess$ = createEffect(() =>
      this._actions$.pipe(
        ofType(appActions.createPostSuccess),
        tap(() => this._router.navigateByUrl('/feed'))
      ),
    { dispatch: false }
  );

  createPostError$ = createEffect(
    () => this._actions$.pipe(
      ofType(appActions.createPostError),
      tap(() => this._snackBarService.showError(SnackBarErrorMessages.POST_CREATION))
    ),
    { dispatch: false }
  );

  updatePostServer$ = createEffect(() => this._actions$.pipe(
    ofType(appActions.updatePostServer),
    mergeMap(({ post }) => this._postService.updatePost(post).pipe(
      map((updatedPost: Post) => {
        updatedPost.showComments = post.showComments;
        updatedPost.liked = post.liked;
        return appActions.updatePostServerSuccess({ post: updatedPost });
      }),
      catchError(() => of(appActions.updatePostServerError()))
    ))
  ));

  updatePostSuccess$ = createEffect(
    () => this._actions$.pipe(
      ofType(appActions.updatePostServerError),
      tap(() => this._snackBarService.showError(SnackBarErrorMessages.DEFAULT))
    ),
    { dispatch: false }
  )

  addComment$ = createEffect(() => this._actions$.pipe(
    ofType(appActions.addComment),
    mergeMap(({ addCommentBody }) =>
      this._postService.addComment({ ...addCommentBody, userId: 1 } as AddCommentRequest).pipe(
        map((comment: PostComment) => appActions.addCommentSuccess({ comment })),
        catchError(() => of(appActions.addCommentError())),
    )),
  ));

  addCommentError$ = createEffect(() => this._actions$.pipe(
      ofType(appActions.addCommentError),
      tap(() => this._snackBarService.showError(SnackBarErrorMessages.COMMENT_CREATION)),
    ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _postService: PostsService,
    private _router: Router,
    private _snackBarService: SnackBarService,
    private _store: Store
  ) {}
}
