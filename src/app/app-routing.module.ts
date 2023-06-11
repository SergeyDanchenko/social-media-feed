import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import {CreatePostComponent} from "./components/create-post/create-post.component";

const routes: Routes = [
  { path: 'feed', component: FeedComponent, pathMatch: 'full' },
  { path: 'add-post', component: CreatePostComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/feed' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
