import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class TypesModule { }

export type TipoSoftware = {
  idtipo: string,
  nombre: string
}

export type Direccion = {
  provinciacod: string,
  provincia: string,
  cantoncod: string,
  canton: string,
  distritocod: string,
  distrito: string
}

export type Persona = {
  nombreusuario: string,
  contrasenia: string,
  apellido1: string,
  apellido2: string,
  email: string,
  nombre: string,
  fechadenacimiento: string,
  nacionalidad: string,
  provincia: string,
  canton: string,
  distrito: string,
  telefono1: string,
  telefono2: string,
  sitioweb: string,
  fotografia: string,
  estudios: Estudio[],
  experiencias: Experiencia[],
  idiomas: Idioma[],
  certificaciones: Certificacion[]
}

export type Idioma = {
  'idioma': string,
  'nivelidioma': string
}

export type IdiomaInput = {
  'idioma': string,
  'nivelidioma': string
}

export type Estudio = {
  'gradoobtenido': string,
  'nombreinstitucion': string,
  'anio': string
}

export type EstudioInput = {
  'gradoobtenido': string,
  'nombreinstitucion': string,
  'anio': string
}

export type Certificacion = {
  'numeroCertificacion': number,
  'titulo': string,
  'nombreinstitucion': string,
  'anio': string
}

export type CertificacionInput = {
  'numeroCertificacion': number,
  'titulo': string,
  'nombreinstitucion': string,
  'anio': string
}

export type Experiencia = {
  'numeroexperiencia': number,
  'empresa': string,
  'cargo': string,
  'fechadeingreso': string,
  'fechadesalida': string,
  'trabajactual': boolean,
  'descripcion': string,
  'dominios': DominioExperiencia[]
}

export type ExperienciaInput = {
  'empresa': string,
  'cargo': string,
  'fechadeingreso': string,
  'fechadesalida': string,
  'trabajactual': boolean,
  'descripcion': string
}

export type DominioExperiencia = {
  'numeroexperiencia': number,
  'nombreusuario': string,
  'numerodominio': number,
  'nombredellenguaje': string,
  'tipodesoftware': string
}

export type DominioExperienciaInput = {
  'numeroexperiencia': number,
  'nombreusuario': string,
  'numerodominio': number,
  'nombredellenguaje': string,
  'tipodesoftware': string
}

export type Empresa = {
  'nombreusuario': string,
  'contrasenia': string,
  'email': string,
  'nombre': string,
  'logo': string,
  'telefono1': string,
  'telefono2': string,
  'sitioweb': string,
  'provincia': string,
  'canton': string,
  'distrito': string,
  'nombrecontacto': string,
  'concursos': Concurso[]
}

export type DominioConcurso = {
  'nombre': string,
  'tipo': string,
  'obligatorio': Boolean
}

export type DominioConcursoInput = {
  'nombre': string,
  'idtipo': number,
  'obligatorio': Boolean
}



export type CertificacionConcurso = {
  'titulo': string,
  'obligatorio': Boolean
}

export type CertificacionConcursoInput = {
  'titulo': string,
  'obligatorio': Boolean
}

export type IdiomaConcurso = {
  'nombre': string,
  'nivel': string
}

export type IdiomaConcursoInput = {
  'nombre': string,
  'nivel': string
}

export type Concurso = {
  'idconcurso': number,
  'empresa': string,
  'nombreempresa': string,
  'nombredelpuesto': string,
  'fechaderegistro': string,
  'fechadecaducidad': string,
  'descripcion': string,
  'certificaciones': CertificacionConcurso[],
  'dominios': DominioConcurso[],
  'idiomas': IdiomaConcurso[],
  'responsabilidades': string[]
}


export type ConcursoInput = {
  'idconcurso': number,
  'empresa': string,
  'nombreempresa': string,
  'nombredelpuesto': string,
  'fechaderegistro': string,
  'fechadecaducidad': string,
  'descripcion': string
}

export type Result = {
'success': Boolean
'message': string
}
