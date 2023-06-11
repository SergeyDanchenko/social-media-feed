import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  addComment,
  addCommentError,
  addCommentSuccess,
  createPost,
  createPostError,
  createPostSuccess,
  getCommentsForPost,
  getCommentsForPostError,
  getCommentsForPostSuccess,
  getPosts,
  getPostsSuccess
} from './app.actions';
import {catchError, map, mergeMap, of, switchMap, tap, withLatestFrom} from 'rxjs';
import {PostsService} from '../services/posts.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/snack-bar.service';
import {SnackBarErrorMessages, SnackBarSuccessMessages} from '../enums/snack-bar-messages.enum';
import {PostComment} from '../models/comment.interface';
import {AddCommentRequest} from '../models/add-comment-request.interface';
import {Store} from '@ngrx/store';
import {selectPostQueryParams} from './app.selectors';

@Injectable()
export class AppEffects {

  getPosts$ = createEffect(() => this._actions$.pipe(
    ofType(getPosts),
    withLatestFrom(this._store.select(selectPostQueryParams)),
    switchMap(([, queryParams]) => this._postService.getPosts(queryParams).pipe(
      map(({ posts, total }) => getPostsSuccess({ posts, total }))
      )),
    )
  );

  getCommentsForPost$ = createEffect(() => this._actions$.pipe(
    ofType(getCommentsForPost),
    mergeMap(({ postId }) => this._postService.getCommentsForPost(postId).pipe(
      map(resp => getCommentsForPostSuccess({ comments: resp.comments, postId })),
      catchError(() => of(getCommentsForPostError({ postId })))
    ))
  ));

  getCommentsForPostError$ = createEffect(
    () => this._actions$.pipe(
      ofType(getCommentsForPostError),
      tap(() => this._snackBarService.showError(SnackBarErrorMessages.LOAD_COMMENTS))
    ),
    { dispatch: false }
  );

  createPost$ = createEffect(() => this._actions$.pipe(
    ofType(createPost),
    mergeMap(({ post }) => this._postService.createPost({ ...post, reactions: 0, userId: 1 }).pipe(
      tap(() => this._snackBarService.showMessage(SnackBarSuccessMessages.POST_CREATION)),
      map(() => createPostSuccess()),
      catchError(() => of(createPostError()))
    ))
  ));

  createPostSuccess$ = createEffect(() =>
      this._actions$.pipe(
        ofType(createPostSuccess),
        tap(() => this._router.navigateByUrl('/feed'))
      ),
    { dispatch: false }
  );

  createPostError$ = createEffect(
    () => this._actions$.pipe(
      ofType(createPostError),
      tap(() => this._snackBarService.showError(SnackBarErrorMessages.POST_CREATION))
    ),
    { dispatch: false }
  );

  addComment$ = createEffect(() => this._actions$.pipe(
    ofType(addComment),
    mergeMap(({ addCommentBody }) =>
      this._postService.addComment({ ...addCommentBody, userId: 1 } as AddCommentRequest).pipe(
        map((comment: PostComment) => addCommentSuccess({ comment })),
        catchError(() => of(addCommentError())),
    )),
  ));

  addCommentError$ = createEffect(() => this._actions$.pipe(
      ofType(addCommentError),
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
