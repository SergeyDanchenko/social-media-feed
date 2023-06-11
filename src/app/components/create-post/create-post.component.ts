import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createPost } from '../../store/app.actions';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  postForm: FormGroup = this._initForm();

  constructor(private _fb: FormBuilder, private _store: Store) {}

  public getFormControl(controlName: string): FormControl {
    return this.postForm.get(controlName) as FormControl;
  }

  public createPost(): void {
    if (this.postForm.valid) {
      const { title, body } = this.postForm.value;
      const post: Partial<Post> = { title, body, creationTime: Date.now() }
      this._store.dispatch(createPost({ post }));
    }
  }

  private _initForm(): FormGroup {
    return this._fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      body: ['', Validators.maxLength(200)]
    });
  }
}
