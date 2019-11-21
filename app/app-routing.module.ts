import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilPersonaComponent } from './components/perfil-persona/perfil-persona.component';


const routes: Routes = [
  {path: "", component: PerfilPersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
