import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.interface';
import { PostComment } from '../../models/comment.interface';
import { Store } from '@ngrx/store';
import { getCommentsForPost, updatePostServer, updatePostUI } from '../../store/app.actions';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post | undefined;
  @Input() comments: PostComment[] | null = [];
  @Input() commentsPending: boolean | null = false;

  constructor(private _store: Store) {}

  public onToggleComments(): void {
    const post: Post = cloneDeep(this.post as Post);
    post.showComments = !this.post?.showComments;
    this._store.dispatch(updatePostUI({ post }));
    if (this.comments?.length === 0 && post.showComments) {
      this._store.dispatch(getCommentsForPost({ postId: this.post?.id as number }));
    }
  }

  public toggleLike(): void {
    this._store.dispatch(updatePostServer({ post:
        {
          ...this.post,
          reactions: this.post?.reactions as number + (this.post?.liked ? -1 : 1),
          liked: !this.post?.liked
        }
    }))
  }

  public identify(index: number, comment: PostComment): number {
    return comment.id;
  }
}
