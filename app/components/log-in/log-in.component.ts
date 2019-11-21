import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MainServiceService } from 'src/app/services/main-service.service';
import { personaQuery, empresaQuery } from 'src/app/queries/queries.module';
import { Router } from '@angular/router';


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
