import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addComment } from '../../store/app.actions';
import { AddCommentRequest } from '../../models/add-comment-request.interface';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  @Input() postId: number | undefined;

  comment: string = '';

  constructor(private _store: Store) {}

  public addComment(): void {
    const addCommentRequestBody: Partial<AddCommentRequest> = {
      body: this.comment.trim(),
      postId: this.postId,
    };
    this.comment = '';
    this._store.dispatch(addComment({ addCommentBody: addCommentRequestBody }));
  }
}
