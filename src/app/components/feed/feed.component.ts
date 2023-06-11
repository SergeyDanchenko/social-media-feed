import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {getPosts} from '../../store/app.actions';
import {
  selectCommentsByPostId,
  selectPostsPending,
  selectPosts,
  selectCommentsForPostPending
} from '../../store/app.selectors';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.interface';
import { PostComment } from '../../models/comment.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public posts$: Observable<Post[]> = this._store.select(selectPosts);
  public postsPending$: Observable<boolean> = this._store.select(selectPostsPending);

  constructor(private _store: Store<AppState>) {}

  public ngOnInit(): void {
    this._store.dispatch(getPosts());
  }

  public getCommentsForPost$(postId: number): Observable<PostComment[]> {
    return this._store.select(selectCommentsByPostId, { postId });
  }

  public getCommentsForPostPending$(postId: number): Observable<boolean> {
    return this._store.select(selectCommentsForPostPending, { postId });
  }
}

