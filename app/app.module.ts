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
import { ExperienciaPersonaComponent } from './components/experiencia-persona/experiencia-persona.component';
import { DominioSoftwareComponent } from './components/dominio-software/dominio-software.component';

const ENTRYCOMPONENTS = [
  ExperienciaPersonaComponent,
  InformacionPersonalComponent
];
import { FormsModule } from '@angular/forms';

export function mainServiceProvider(provider: MainServiceService) {
  return () => provider.init();
};

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    EnterpriseRegisterComponent,
    RegisterComponent,
    ClientRegisterComponent,
    HeaderComponentComponent,
    PerfilPersonaComponent,
    FooterComponentComponent,
    EnterpriseProfileComponent,
    IdiomasPersonaComponent,
    ENTRYCOMPONENTS,
    DominioSoftwareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MainServiceService,{ provide: APP_INITIALIZER, useFactory: mainServiceProvider, deps: [MainServiceService], multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONENTS]
})
export class AppModule { }
