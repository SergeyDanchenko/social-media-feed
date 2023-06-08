import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "./models/post.interface";

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private _httpClient: HttpClient) {}

  public getPosts(): Observable<{ posts: Post[]; total: number; skip: number; limit: number }> {
    return this._httpClient
      .get<{ posts: Post[]; total: number; skip: number; limit: number }>('https://dummyjson.com/posts');
  }
}
