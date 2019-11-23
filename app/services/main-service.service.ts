import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { direccionesQuery, idiomasQuery, tipoinstitucionQuery, tiposoftwareQuery,
paisesQuery, nivelesQuery, Provincia, Canton, Distrito } from 'src/app/queries/queries.module';
import { Observable } from 'rxjs';
import { Direccion, TipoSoftware, IdiomaUtil, Idioma, Persona, Empresa } from '../types/types.module';

@Injectable({
  providedIn: 'root'
})

export class MainServiceService {
  logindata: any;
  direcciones: Provincia[] = [];
  tiposdesoftware: TipoSoftware[] = [];
  nivelesidioma: String[] = [];
  idiomas: Idioma[] = [];
  paises: String[] = [];
  tiposdeinstituciones: String[] = [];
  persona: Persona;
  empresa: Empresa;
  registered: { username: string; password: string; };
  provincias: {provinciacod: string, provincia: string}[] = [];
  cantones: {provinciacod: string, provincia: string, cantoncod: string, canton: string}[]= [];

  cantonesFiltrados: Canton[];
  distritosFiltrados: Distrito[];

  imagenGuardada: String;

  constructor(private apollo: Apollo) {
    this.empresa = {nombreusuario: "IntelCO", contrasenia: "intel1234", nombre: "Intel",
     telefono1: "61638663", email: "empresa@hello.com"} as Empresa;
  }

  public getDirecciones() {
      return this.direcciones;
  }

  async init () {
    this.apollo.query({
      query: direccionesQuery
    }).subscribe(result => {
      this.direcciones = result.data['getDirecciones'] as Provincia[];
      //this.cargarDirecciones();
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
/*
  cargarDirecciones() {
    this.direcciones.forEach(dir => {
      let provincia = {provinciacod: dir.provinciacod, provincia: dir.provincia};
      let canton = {provinciacod: dir.provinciacod, provincia: dir.provincia,
      cantoncod: dir.cantoncod, canton: dir.canton};
      let add = true;
      this.provincias.forEach(prov => {
        if ((prov.provinciacod == provincia.provinciacod)) {
          add = false;
        }
      });
      if (add) this.provincias.push(provincia);
      
      add = true;
      this.cantones.forEach(cantonn => {
        if ((cantonn.provinciacod == canton.provinciacod && cantonn.cantoncod == canton.cantoncod)) {
          add = false;
        }
      });
      if (add) this.cantones.push(canton);
      this.cantonesFiltrados = this.cantones;
      this.distritosFiltrados = this.direcciones;
    });
  }*/
}
