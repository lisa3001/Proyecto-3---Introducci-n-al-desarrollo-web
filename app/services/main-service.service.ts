import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { direccionesQuery, idiomasQuery, tipoinstitucionQuery, tiposoftwareQuery,
paisesQuery, nivelesQuery } from 'src/app/queries/queries.module';
import { Observable } from 'rxjs';
import { Direccion, TipoSoftware, IdiomaUtil, Idioma, Persona, Empresa } from '../types/types.module';

@Injectable({
  providedIn: 'root'
})

export class MainServiceService {
  logindata: any;
  direcciones: Direccion[];
  tiposdesoftware: TipoSoftware[];
  nivelesidioma: String[];
  idiomas: Idioma[];
  paises: String[];
  tiposdeinstituciones: String[];
  persona: Persona;
  empresa: Empresa;
  registered: { username: string; password: string; };

  imagenGuardada: String;

  constructor(private apollo: Apollo) { 
    
  }

  public getDirecciones() {
      return this.direcciones;
  }
  

  async init () {
    this.apollo.query({
      query: direccionesQuery
    }).subscribe(result => {
      this.direcciones = result.data['getDirecciones'] as Direccion[];
      console.log(this.direcciones);
    });
    
    this.apollo.query({
      query: tiposoftwareQuery
    }).subscribe(result => {
      this.tiposdesoftware = result.data['getTiposSoftware'] as TipoSoftware[];
    });

    this.apollo.query({
      query: nivelesQuery
    }).subscribe(result => {
      this.nivelesidioma = result.data['getNivelesIdioma'] as String[];
      
    });

    this.apollo.query({
      query: idiomasQuery
    }).subscribe(result => {
      this.idiomas = result.data['getIdiomas'] as Idioma[]; 
    });

    this.apollo.query({
      query: paisesQuery
    }).subscribe(result => {
      this.paises = result.data['getPaises'] as String[];
    });

    this.apollo.query({
      query: tipoinstitucionQuery
    }).subscribe(result => {
      this.tiposdeinstituciones = result.data['getTipoInstitucion'] as String[];
    });
  }
}
