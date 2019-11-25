import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformacionPersonalComponent } from './persona/informacion-personal/informacion-personal.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { PerfilPersonaComponent } from './persona/perfil-persona/perfil-persona.component';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { EnterpriseRegisterComponent } from './components/enterprise-register/enterprise-register.component';
import { EnterpriseProfileComponent } from './empresa/enterprise-profile/enterprise-profile.component';
import { IdiomasPersonaComponent } from './persona/idiomas-persona/idiomas-persona.component';
import { MainServiceService } from './services/main-service.service';
import { ExperienciaPersonaComponent } from './persona/experiencia-persona/experiencia-persona.component';
import { DominioSoftwareComponent } from './components/dominio-software/dominio-software.component';

const ENTRYCOMPONENTS = [
  InformacionPersonalComponent,
  DominioSoftwareComponent
];
import { FormsModule } from '@angular/forms';
import { InformacionEmpresaComponent } from './empresa/informacion-empresa/informacion-empresa.component';
import { EstudiosPersonaComponent } from './persona/estudios-persona/estudios-persona.component';
import { CertificacionesPersonaComponent } from './persona/certificaciones-persona/certificaciones-persona.component';
import { CertificacionesEmpresaComponent } from './empresa/certificaciones-empresa/certificaciones-empresa.component';
import { VerconcursosPersonaComponent } from './persona/verconcursos-persona/verconcursos-persona.component';
import { ConcursosEmpresaComponent } from './empresa/concursos-empresa/concursos-empresa.component';
import { EditarConcursoEmpresaComponent } from './empresa/editar-concurso-empresa/editar-concurso-empresa.component';
import { AgregarConcursoEmpresaComponent } from './empresa/agregar-concurso-empresa/agregar-concurso-empresa.component';
import { VerConcursoEmpresaComponent } from './empresa/ver-concurso-empresa/ver-concurso-empresa.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
    InformacionEmpresaComponent,
    ExperienciaPersonaComponent,
    EstudiosPersonaComponent,
    CertificacionesPersonaComponent,
    CertificacionesEmpresaComponent,
    VerconcursosPersonaComponent,
    ConcursosEmpresaComponent,
    EditarConcursoEmpresaComponent,
    AgregarConcursoEmpresaComponent,
    VerConcursoEmpresaComponent,
    PageNotFoundComponent
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
