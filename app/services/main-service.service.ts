import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { direccionesQuery, idiomasQuery, tipoinstitucionQuery, tiposoftwareQuery,
paisesQuery, nivelesQuery } from 'src/app/queries/queries.module';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  logindata: any;
  direcciones: any;
  tiposdesoftware: any;
  nivelesidioma: any;
  idiomas: any;
  paises: any;
  tiposdeinstituciones: any;
  registered: { username: string; password: string; };

  imagenGuardada: String;

  constructor(private apolo: Apollo) { 
    this.apolo.query({
      query: direccionesQuery
    }).subscribe(data => {
      this.direcciones = data.data['getDirecciones'];
    });

    this.apolo.query({
      query: tiposoftwareQuery
    }).subscribe(data => {
      this.tiposdesoftware = data.data['getTiposSoftware'];
    });

    this.apolo.query({
      query: nivelesQuery
    }).subscribe(data => {
      this.nivelesidioma = data.data['getNivelesIdioma'];
    });

    this.apolo.query({
      query: idiomasQuery
    }).subscribe(data => {
      this.idiomas = data.data['getIdiomas']; 
    });

    this.apolo.query({
      query: paisesQuery
    }).subscribe(data => {
      this.paises = data.data['getPaises'];
    });

    this.apolo.query({
      query: tipoinstitucionQuery
    }).subscribe(data => {
      this.tiposdeinstituciones = data.data['getTipoInstitucion'];
    });

  }
}
