import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithupAppComponent } from './githup-app/githup-app.component';

const routes: Routes = [
  {
    path: '',
    component: GithupAppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
