import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { EnterpriseRegisterComponent } from './components/enterprise-register/enterprise-register.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { PerfilPersonaComponent } from './components/perfil-persona/perfil-persona.component';
import { EnterpriseProfileComponent } from './components/enterprise-profile/enterprise-profile.component';


const routes: Routes = [
  {path:'', component: LogInComponent},
  {path:'Register', component: RegisterComponent},
  {path:'EnterpriseRegister', component: EnterpriseRegisterComponent},
  {path:'PersonRegister', component: ClientRegisterComponent},
  {path:'PersonProfile', component: PerfilPersonaComponent},
  {path:'EnterpriseProfile', component: EnterpriseProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
