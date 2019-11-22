import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformacionPersonalComponent } from './components/informacion-personal/informacion-personal.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { PerfilPersonaComponent } from './components/perfil-persona/perfil-persona.component';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { EnterpriseRegisterComponent } from './components/enterprise-register/enterprise-register.component';
import { EnterpriseProfileComponent } from './components/enterprise-profile/enterprise-profile.component';
import { IdiomasPersonaComponent } from './components/idiomas-persona/idiomas-persona.component';
import { MainServiceService } from './services/main-service.service';

export function mainServiceProvider(provider: MainServiceService) {
  console.log("hasdlasd");
  return () => provider.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    EnterpriseRegisterComponent,
    RegisterComponent,
    ClientRegisterComponent,
    InformacionPersonalComponent,
    HeaderComponentComponent,
    PerfilPersonaComponent,
    FooterComponentComponent,
    EnterpriseProfileComponent,
    IdiomasPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [MainServiceService,
    { provide: APP_INITIALIZER, useFactory: mainServiceProvider, deps: [MainServiceService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
