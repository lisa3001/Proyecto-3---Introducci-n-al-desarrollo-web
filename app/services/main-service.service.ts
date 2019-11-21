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

  constructor(private apolo: Apollo) { 
    this.apolo.query({
      query: direccionesQuery
    }).subscribe(data => {
      this.direcciones = data.data['getDirecciones'];
      console.log(this.direcciones);
    });

    this.apolo.query({
      query: tiposoftwareQuery
    }).subscribe(data => {
      this.tiposdesoftware = data.data['getTiposSoftware'];
      console.log(this.tiposdesoftware);
    });

    this.apolo.query({
      query: nivelesQuery
    }).subscribe(data => {
      this.nivelesidioma = data.data['getNivelesIdioma'];
      console.log(this.nivelesidioma);
    });

    this.apolo.query({
      query: idiomasQuery
    }).subscribe(data => {
      this.idiomas = data.data['getIdiomas'];
      console.log(this.idiomas);
    });

    this.apolo.query({
      query: paisesQuery
    }).subscribe(data => {
      this.paises = data.data['getPaises'];
      console.log(this.paises);
    });

    this.apolo.query({
      query: tipoinstitucionQuery
    }).subscribe(data => {
      this.tiposdeinstituciones = data.data['getTipoInstitucion'];
      console.log(this.tiposdeinstituciones);
    });

  }
}
