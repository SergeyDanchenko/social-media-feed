import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPosts } from '../../store/app.actions';
import { selectPosts } from '../../store/app.selectors';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public posts$: Observable<Post[]> = this._store.select(selectPosts);

  constructor(private _store: Store<AppState>) {}

  public ngOnInit(): void {
    this._store.dispatch(getPosts());
  }
}
