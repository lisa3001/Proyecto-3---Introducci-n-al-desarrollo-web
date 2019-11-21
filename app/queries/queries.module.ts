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
        cantoncod
        canton
        distritocod
        distrito
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
query EmpresaUN($nombreusuario: String!){
  getNombresUsuarioEmpresas(nombreusuario: $nombreusuario)
}`;



export const crearEmpresaMutation = gql`
mutation CrearEmpresa($nombreusuario: String!, $contrasenia: String!, $email: String!, $nombre: String!) {
  crearEmpresa(nombreusuario: $nombreusuario, contrasenia: $contrasenia, email: $email, nombre: $nombre) {
    success
    message
  }
}`;