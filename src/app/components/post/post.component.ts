import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.interface';
import { PostComment } from '../../models/comment.interface';
import { Store } from '@ngrx/store';
import { getCommentsForPost } from '../../store/app.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post | undefined;
  @Input() comments: PostComment[] | null = [];
  @Input() commentsPending: boolean | null = false;

  public showComments: boolean = false;

  constructor(private _store: Store) {}

  public onToggleComments(): void {
    this.showComments = !this.showComments;
    if (this.comments?.length === 0 && this.showComments) {
      this._store.dispatch(getCommentsForPost({ postId: this.post?.id as number }));
    }
  }

  public identify(index: number, comment: PostComment): number {
    return comment.id;
  }
}
