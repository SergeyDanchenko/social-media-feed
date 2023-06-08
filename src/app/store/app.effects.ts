import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getPosts, getPostsSuccess } from './app.actions';
import { map, switchMap } from 'rxjs';
import { PostsService } from '../posts.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppEffects {

  getPosts$ = createEffect(() => this._actions$.pipe(
    ofType(getPosts),
    switchMap(() => this._postService.getPosts().pipe(
      map(resp => getPostsSuccess({ posts: resp.posts }))
      )),
    )
  );

  constructor(private _actions$: Actions, private _postService: PostsService) {}
}
