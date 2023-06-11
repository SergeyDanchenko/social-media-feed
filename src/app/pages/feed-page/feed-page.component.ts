import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectPosts, selectPostsPending } from '../../store/app.selectors';
import { Post } from '../../models/post.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPosts, setInitialState } from '../../store/app.actions';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit, OnDestroy {
  public posts$: Observable<Post[]> = this._store.select(selectPosts);
  public postsPending$: Observable<boolean> = this._store.select(selectPostsPending);

  constructor(private _store: Store<AppState>) {}

  public ngOnInit(): void {
    this._store.dispatch(getPosts());
  }

  public ngOnDestroy(): void {
    this._store.dispatch(setInitialState())
  }

}
