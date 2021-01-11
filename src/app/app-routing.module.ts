import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchDataComponent } from './launch-data/launch-data.component';

const routes: Routes = [
  { path: 'spacex', component: LaunchDataComponent },
  { path: '', redirectTo: 'spacex', pathMatch: 'full' },
  { path: '**', redirectTo: 'spacex', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
