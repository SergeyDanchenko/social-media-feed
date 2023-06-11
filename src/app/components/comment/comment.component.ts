import {Component, Input} from '@angular/core';
import {PostComment} from "../../models/comment.interface";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: PostComment | undefined;
}
