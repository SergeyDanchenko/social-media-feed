import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.interface';
import { PostComment } from '../models/comment.interface';
import { AddCommentRequest } from '../models/add-comment-request.interface';
import { QueryParams } from '../models/query-params.interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private static BASE_URL = 'https://dummyjson.com';

  constructor(private _httpClient: HttpClient) {}

  public getPosts(queryParams: QueryParams)
    : Observable<{ posts: Post[]; total: number; skip: number; limit: number }> {
    return this._httpClient
      .get<{ posts: Post[]; total: number; skip: number; limit: number }>(
        `${PostsService.BASE_URL}/posts`,
        { params: { ...queryParams } }
      );
  }

  public getCommentsForPost(postId: number)
    : Observable<{ comments: PostComment[]; total: number; skip: number; limit: number }> {
    return this._httpClient
      .get<{ comments: PostComment[]; total: number; skip: number; limit: number }>(
        `${PostsService.BASE_URL}/posts/${postId}/comments`
      )
  }

  public createPost(body: Partial<Post>): Observable<Post> {
    return this._httpClient.post<Post>(`${PostsService.BASE_URL}/posts/add`, body);
  }

  public addComment(body: AddCommentRequest): Observable<PostComment> {
    return this._httpClient.post<PostComment>(`${PostsService.BASE_URL}/comment/add`, body)
  }
}
