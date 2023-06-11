import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';
import { CreatePostPageComponent } from './pages/create-post-page/create-post-page.component';

const routes: Routes = [
  { path: 'feed', component: FeedPageComponent, pathMatch: 'full' },
  { path: 'add-post', component: CreatePostPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/feed' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
