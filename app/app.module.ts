import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformacionPersonalComponent } from './components/informacion-personal/informacion-personal.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { PerfilPersonaComponent } from './components/perfil-persona/perfil-persona.component';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InformacionPersonalComponent,
    HeaderComponentComponent,
    PerfilPersonaComponent,
    FooterComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
