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

  userName: string;
  userPassword: string;
  link: string;
  
  constructor(private apollo: Apollo, private router: Router, private mainservice: MainServiceService) {
    this.link = "/PersonProfile";
    this.userName = "";
    this.userPassword = "";
   }

  ngOnInit() {
  
  }

  AcceptButton(){
    if (this.userName != "" && this.userPassword != ""){
        this.login();
    }else{
      this.textChange('userName', 'userNameError');
      this.textChange('userPassword', 'userPassError');
    }
  }

  isRadioButtonChecked(){
    if (this.link == ""){
      var clientButton = document.getElementById("client") as HTMLLabelElement;
      var enterpriseButton = document.getElementById("enterprise") as HTMLLabelElement;
      clientButton.style.color = "red";
      enterpriseButton.style.color = "red";
      return false;
    }
    return true;
  }

  textChange(tagName: string, errorTag: string){
    var element = (document.getElementById(tagName) as HTMLInputElement);
    if (element.value.trim() == ""){
      element.className += " is-invalid";
      var errorElement = document.getElementById(errorTag); 
      errorElement.className = " invalid-feedback";
      errorElement.style.marginLeft = "9px";
    }else{
      element.classList.remove("is-invalid");
    }
    this.saveData(tagName, element.value.trim());
  }

  handleChangeClient(evt) {
    var target = evt.target;
    if (target.checked) {
      this.link = "/PersonProfile";
      var clientButton = document.getElementById("client") as HTMLLabelElement;
      var enterpriseButton = document.getElementById("enterprise") as HTMLLabelElement;
      clientButton.style.color = "black";
      enterpriseButton.style.color = "black";
    }
  }

  handleChangeEnterprise(evt) {
    var target = evt.target;
    if (target.checked) {
      this.link = "/EnterpriseProfile";
      var clientButton = document.getElementById("client") as HTMLLabelElement;
      var enterpriseButton = document.getElementById("enterprise") as HTMLLabelElement;
      clientButton.style.color = "black";
      enterpriseButton.style.color = "black";
    }
  }

  saveData(tagName: string, data: string){
    if (tagName == "userName") this.userName = data;
    else this.userPassword = data;
  }

  login() {
    if (this.link == "/PersonProfile") {
      this.apollo.query({
        query: personaQuery,
        variables: {
          nombreusuario: this.userName,
          contrasenia: this.userPassword
        } 
      }).subscribe(data => {
        if (data.data['personaLogin'] != null) { 
          this.mainservice.logindata = data.data['personaLogin'];
          this.router.navigate([this.link]);
        } else {
          this.WrongData('userName', 'userNameError');
          this.WrongData('userPassword', 'userPassError');
        }
      });
    } else {
      this.apollo.query({
        query: empresaQuery,
        variables: {
          nombreusuario: this.userName,
          contrasenia: this.userPassword
        } 
      }).subscribe(data => {
        if (data.data['empresaLogin'] != null) { 
          this.mainservice.logindata = data.data['empresaLogin'];
          this.router.navigate([this.link]);
        } else {
          this.WrongData('userName', 'userNameError');
          this.WrongData('userPassword', 'userPassError');
        }
      });
    }
  }

  WrongData(tagName: string, errorTag: string){
    var element = (document.getElementById(tagName) as HTMLInputElement);
    element.className += " is-invalid";
    var errorElement = (document.getElementById(errorTag) as HTMLLabelElement); 
    errorElement.className = " invalid-feedback";
    errorElement.style.marginLeft = "9px";
    errorElement.textContent = "Nombre de usuario o contraseña incorrectos"
  }

}
