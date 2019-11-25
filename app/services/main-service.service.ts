import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { direccionesQuery, idiomasQuery, tipoinstitucionQuery, tiposoftwareQuery,
paisesQuery, nivelesQuery, Provincia, Canton, Distrito } from 'src/app/queries/queries.module';
import { Direccion, TipoSoftware, Idioma, Persona, Empresa, Experiencia, DominioExperiencia, Estudio, Certificacion, Concurso, IdiomaConcurso, CertificacionConcurso, DominioConcurso } from '../types/types.module';
import { PerfilPersonaComponent } from '../persona/perfil-persona/perfil-persona.component';

@Injectable({
  providedIn: 'root'
})


export class MainServiceService {
  logindata: any;
  direcciones: Provincia[] = [];
  tiposdesoftware: String[] = [];
  nivelesidioma: String[] = [];
  idiomas: String[] = [];
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
  //componentesExperienciasPersona = [];
  
  editExperiencias: Experiencia[] = [];
  editIdiomas: Idioma[] = [];
  editEstudios: Estudio[] = [];
  editCertificaciones: Certificacion[] = [];

  editConcursos: Concurso[] = [];
  editConcurso: Concurso = 
    {nombredelpuesto: "Profesor", fechaderegistro: "2015-09-08", fechadecaducidad: "2019-05-05", descripcion: "Hello",
        certificaciones: [],
        idiomas: [],
        dominios: [],
      responsabilidades: []
  } as Concurso;

  selectedConcurso: Concurso = 
    {nombredelpuesto: null, fechaderegistro: null, fechadecaducidad: null, descripcion: null,
      certificaciones: [],
      idiomas: [],
      dominios: [],
    responsabilidades: []
  } as Concurso;

  addConcurso: Concurso = 
    {idconcurso: -1, empresa: null, nombredelpuesto: null, fechaderegistro: null, fechadecaducidad: null, descripcion: null,
        certificaciones: [],
        idiomas: [],
        dominios: [],
      responsabilidades: []
  } as Concurso;

  logged: String = "persona";

  constructor(private apollo: Apollo) {
    this.empresa = {nombreusuario: "IntelCO", contrasenia: "intel1234", nombre: "Intel",
     telefono1: "61638663", email: "empresa@hello.com", concursos: [
       {idconcurso: 1, empresa: "IntelCO", nombredelpuesto: "Profesor", fechaderegistro: "2015-09-08", fechadecaducidad: "2019-05-05", descripcion: "Hello",
        certificaciones: [{titulo: "Certificación INA", obligatorio: true} as CertificacionConcurso],
        idiomas: [{nombre: "Spanish", nivel: "A1"} as IdiomaConcurso],
        dominios: [{tipo: "Lenguaje de programación", nombre: "Python", obligatorio: false} as DominioConcurso],
      responsabilidades: ["Hablar mucho"]} as Concurso,
      {idconcurso: 2, empresa: "IntelCO", nombredelpuesto: "Profesora", fechaderegistro: "2015-09-08", fechadecaducidad: "2019-05-05", descripcion: "Hello",
        certificaciones: [{titulo: "Certificación INA", obligatorio: true} as CertificacionConcurso],
        idiomas: [{nombre: "Spanish", nivel: "A1"} as IdiomaConcurso],
        dominios: [{tipo: "Lenguaje de programación", nombre: "Python", obligatorio: false} as DominioConcurso],
      responsabilidades: ["Hablar mucho2"]} as Concurso
    ]} as Empresa;

     this.editConcursos = JSON.parse(JSON.stringify(this.empresa.concursos));



     this.persona = {nombreusuario: "LuisMJ01", contrasenia: "luisito139", nombre: "Luis",
     telefono1: "61638663", email: "empresa@hello.com", apellido1: "Molina", apellido2: "Juarez", nacionalidad: "Costa Rica", fechadenacimiento: "1997-11-20", experiencias: [],
    idiomas: [
      {idioma: "Spanish", nivelidioma: "A1"} as Idioma
    ],
  estudios: [
    {nombreinstitucion: "TEC", gradoobtenido: "Bachiller", anio: "2015"} as Estudio
  ],
  certificaciones: [
    {nombreinstitucion: "TEC", titulo: "Bachiller", anio: "2015"} as Certificacion
  ]} as Persona;
     this.persona.experiencias.push({
       numeroexperiencia: 1,
       empresa: "TEC",
       cargo: "Profesor",
       fechadeingreso: "2015-05-05",
       fechadesalida: "2018-05-05",
       trabajactual: true,
       descripcion: "Hello World",
       dominios: [
         {nombredellenguaje: "Python", tipodesoftware: "Lenguaje de Programación"} as DominioExperiencia,
       ]
     } as Experiencia);

     this.persona.experiencias.push({
      numeroexperiencia: 2,
      empresa: "TEC2",
      cargo: "Profesor",
      fechadeingreso: "2015-05-05",
      fechadesalida: "2018-05-05",
      trabajactual: false,
      descripcion: "Hello World",
      dominios: []
    } as Experiencia);
    this.editExperiencias = JSON.parse(JSON.stringify(this.persona.experiencias));
    this.editIdiomas = JSON.parse(JSON.stringify(this.persona.idiomas));
    this.editEstudios = JSON.parse(JSON.stringify(this.persona.estudios));
    this.editCertificaciones = JSON.parse(JSON.stringify(this.persona.certificaciones));
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
      this.tiposdesoftware = result.data['getTiposSoftware'] as String[];
    });

    this.apollo.query({
      query: nivelesQuery
    }).subscribe(result => {
      this.nivelesidioma = result.data['getNivelesIdioma'] as String[];
    });

    this.apollo.query({
      query: idiomasQuery
    }).subscribe(result => {
      this.idiomas = result.data['getIdiomas'] as String[]; 
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
