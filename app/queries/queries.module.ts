import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import gql from "graphql-tag";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class QueriesModule { }

export const direccionesQuery = gql`
query {
  getDirecciones {
    provinciacod
    provincia
    cantones {
      cantoncod
      canton
      distritos {
        distritocod
        distrito
      }
    }
  }
}`;

export const idiomasQuery = gql`
    query {
      getIdiomas {
        id
        name
      }
}`;

export const nivelesQuery = gql`
    query {
      getNivelesIdioma
}`;

export const tiposoftwareQuery = gql`
    query {
      getTiposSoftware {
        idtipo
        nombre
      }
}`;

export const paisesQuery = gql`
    query {
      getPaises
}`;

export const tipoinstitucionQuery = gql`
    query {
      getTipoInstitucion
}`;

export const personaQuery = gql`
    query PersonaLogin($nombreusuario: String!, $contrasenia: String!){
      personaLogin(nombreusuario: $nombreusuario, contrasenia: $contrasenia) {
          nombreusuario
          nombre
          apellido1
          apellido2
          email
          telefono1
          telefono2
          sitioweb
          nacionalidad
          fechadenacimiento
          fotografia
          provincia
          canton
          distrito
      }
}`;

export const empresaQuery = gql`
    query EmpresaLogin($nombreusuario: String!, $contrasenia: String!){
      empresaLogin(nombreusuario: $nombreusuario, contrasenia: $contrasenia) {
          nombreusuario
          nombre
          logo
          nombrecontacto
          email
          telefono1
          telefono2
          sitioweb
          provincia
          canton
          distrito
      }
}`;

export const empresaNombreUsuarioQuery = gql`
query {
  getNombresUsuarioEmpresas
}`;


export type Provincia = {
  provinciacod: String,
  provincia: String,
  cantones: Canton[]
}

export type Canton = {
  provinciacod: String,
  cantoncod: String,
  canton: String,
  distritos: Distrito[]
}

export type Distrito = {
  distritocod: String,
  distrito: String
}

export const personaNombreUsuarioQuery = gql`
query{
  getNombresUsuarioPersonas
}`;


export const actualizarPersonaMutation = gql`
mutation ActualizarPersona($persona: PersonaInput) {
  actualizarPersona(persona: $persona) {
    success
    message
  }
}`;

export const actualizarEmpresaMutation = gql`
mutation ActualizarEmpresa($empresa: EmpresaInput) {
  actualizarEmpresa(empresa: $empresa) {
    success
    message
  }
}`;

export const actualizarPersonaImagenMutation = gql`
mutation ActualizarPersonaImage($nombreusuario: String, $fotografia: String) {
  actualizarPersonaImage(nombreusuario: $nombreusuario, fotografia: $fotografia) {
    success
    message
  }
}`;

export const actualizarEmpresaImagenMutation = gql`
mutation ActualizarEmpresaImage($nombreusuario: String, $logo: String) {
  actualizarEmpresaImage(nombreusuario: $nombreusuario, logo: $logo) {
    success
    message
  }
}`;

/*mutation ActualizarPersona($nombreusuario: String!, $contrasenia: String!, $apellido1: String!,
  $apellido2: String!, $email: String!, $nombre: String!, $fechadenacimiento: String!, $nacionalidad: String!,
  $provincia: String, $canton: String, $distrito: String, $telefono1: String, $telefono2: String, $sitioweb: String, $fotografia: String) {
  actualizarPersona(persona: {nombreusuario: $nombreusuario, contrasenia: $contrasenia, apellido1: $apellido1,
    apellido2: $apellido2, email: $email, nombre: $nombre, fechadenacimiento: $fechadenacimiento, nacionalidad: $nacionalidad,
    provincia: $provincia, canton: $canton, distrito: $distrito, telefono1: $telefono1, telefono2: $telefono2, sitioweb: $sitioweb, fotografia: $fotografia}) {
    success
    message
  }*/ 
export const crearEmpresaMutation = gql`
mutation CrearEmpresa($nombreusuario: String!, $contrasenia: String!, $email: String!, $nombre: String!) {
  crearEmpresa(nombreusuario: $nombreusuario, contrasenia: $contrasenia, email: $email, nombre: $nombre) {
    success
    message
  }
}`;

export const crearPersonaMutation = gql`
mutation CrearPersona($nombreusuario: String!, $contrasenia: String!, $nombre: String!, $apellido1: String!, $apellido2: String!, $email: String!, $fechadenacimiento: String!, $nacionalidad: String!) {
  crearPersona(nombreusuario: $nombreusuario, contrasenia: $contrasenia, nombre: $nombre, apellido1: $apellido1, apellido2: $apellido2, email: $email, fechadenacimiento: $fechadenacimiento, nacionalidad: $nacionalidad) {
    success
    message
  }
}`;