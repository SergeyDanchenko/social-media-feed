import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPosts, setPostsQueryParams } from '../../store/app.actions';
import {
  selectCommentsByPostId,
  selectCommentsForPostPending,
  selectPostQueryParams,
  hasMorePosts
} from '../../store/app.selectors';
import { AppState } from '../../store/app.state';
import { Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { Post } from '../../models/post.interface';
import { PostComment } from '../../models/comment.interface';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { QueryParams } from '../../models/query-params.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements AfterViewInit, OnDestroy {
  @Input() posts: Post[] | null = [];
  @Input() postsPending: boolean | null = false;

  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: CdkVirtualScrollViewport | undefined;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _store: Store<AppState>) {}

  public ngAfterViewInit(): void {
    this.viewPort?.elementScrolled()
      .pipe(
        withLatestFrom(
          this._store.select(selectPostQueryParams),
          this._store.select(hasMorePosts)
        ),
        takeUntil(this._destroy$)
      )
      .subscribe(([res, params, hasMorePosts]) => {
        const { scrollTop, scrollHeight, clientHeight } = res.target as any;
        if (scrollTop + clientHeight >= scrollHeight - 200 && !this.postsPending && hasMorePosts) {
          const postsQueryParams: QueryParams = {
            skip: params.skip + params.limit,
            limit: params.limit,
          };
          this._store.dispatch(setPostsQueryParams({ postsQueryParams }));
          this._store.dispatch(getPosts());
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getCommentsForPost$(postId: number): Observable<PostComment[]> {
    return this._store.select(selectCommentsByPostId, { postId });
  }

  public getCommentsForPostPending$(postId: number): Observable<boolean> {
    return this._store.select(selectCommentsForPostPending, { postId });
  }

  public identify(index: number, post: Post): number {
    return post.id;
  }
}

