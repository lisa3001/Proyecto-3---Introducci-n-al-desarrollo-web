import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { RouteConfigLoadEnd, RouterLink, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

const personaQuery = gql`
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
const empresaQuery = gql`
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

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private apollo: Apollo, private router: Router, private mainservice: MainServiceService) { }

  ngOnInit() {
  
  }

  login() {
    let personachecked = (document.getElementById("personacheck") as HTMLInputElement).checked;
    let username = (document.getElementById("userName") as HTMLInputElement).value;
    let password = (document.getElementById("userPassword") as HTMLInputElement).value;
    if (username == "" || password == "") {
      return alert("Inserte todos los datos!");
    }
    if (personachecked) {
      this.apollo.query({
        query: personaQuery,
        variables: {
          nombreusuario: username,
          contrasenia: password
        } 
      }).subscribe(data => {
        if (data.data['personaLogin'] != null) { 
          this.mainservice.logindata = data.data['personaLogin'];
          this.router.navigate(['/Register']);
        } else {
          alert("Nombre de usuario o contraseña incorrectos!");
        }
      });
    } else {
      this.apollo.query({
        query: empresaQuery,
        variables: {
          nombreusuario: username,
          contrasenia: password
        } 
      }).subscribe(data => {
        if (data.data['empresaLogin'] != null) { 
          this.mainservice.logindata = data.data['empresaLogin'];
          this.router.navigate(['/Register']);
        } else {
          alert("Nombre de usuario o contraseña incorrectos!");
        }
      });
    }
  }
}
