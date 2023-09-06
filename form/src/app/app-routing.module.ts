import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './component/builder/builder.component';
import { AnswersComponent } from './component/answers/answers.component';

const routes: Routes = [
  {path: 'form/builder', component: BuilderComponent},
  {path: 'form/answers', component: AnswersComponent},
  {path:'', redirectTo:'/form/builder', pathMatch:'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
