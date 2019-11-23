import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js'
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Apollo } from 'apollo-angular';
import { empresaNombreUsuarioQuery, personaNombreUsuarioQuery } from 'src/app/queries/queries.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userName: string;
  userPassword: string;
  link: string;
  private usernames: String[] = [];
  
  constructor(private apollo: Apollo, private _router: Router, private mainservice: MainServiceService) { 
    this.link = "/Register";
    this.userName = "";
    this.userPassword = "";
  }

  ngOnInit() {
    this.apollo.query({
      query: empresaNombreUsuarioQuery
    }).subscribe(result => {
      if (result.data['getNombresUsuarioEmpresas'] != null) {
        this.usernames.push.apply(this.usernames, result.data['getNombresUsuarioEmpresas'] as String[]);
      }
    });
    this.apollo.query({
      query: personaNombreUsuarioQuery
    }).subscribe(result => {
      if (result.data['getNombresUsuarioPersonas'] != null) {
        this.usernames.push.apply(this.usernames, result.data['getNombresUsuarioPersonas'] as String[]);
      }
    });
  }

  AcceptButton(){
    var isButtonChecked = this.isRadioButtonChecked();
    if (this.userName != "" && this.userPassword != "" && isButtonChecked){
      this.register();
    } else {
      this.textChange('userName', 'userNameError', 'Debes ingresar un nombre de usuario.');
      this.textChange('userPassword', 'userPassError', 'Debes ingresar una contraseña.');
    }
  }

  register() {
    if (this.validarUsername()) {
      if(this.link == "/EmpresaRegister") { 
        this.mainservice.logindata = {username: this.userName, password: this.userPassword};
          this._router.navigate([this.link]);
      } else if (this.link == "/PersonRegister") {
          this._router.navigate([this.link]);
      }
    }
  }

  isRadioButtonChecked(){
    if (this.link == "/Register"){
      var clientButton = document.getElementById("client") as HTMLLabelElement;
      var enterpriseButton = document.getElementById("enterprise") as HTMLLabelElement;
      clientButton.style.color = "red";
      enterpriseButton.style.color = "red";
      return false;
    }
    return true;
  }

  textChange(tagName: string, errorTag: string, errorMessage: string){
    var element = (document.getElementById(tagName) as HTMLInputElement);
    if (element.value.trim() == ""){
      element.className += " is-invalid";
      var errorElement = document.getElementById(errorTag); 
      errorElement.className = " invalid-feedback";
      errorElement.style.marginLeft = "9px";
      errorElement.textContent = errorMessage;
    }else{
      element.classList.remove("is-invalid");
    }
    this.saveData(tagName, element.value.trim());
    if (tagName == "userName") {
      this.validarUsername();
    }
  }

  validarUsername() {
    if (this.usernames.includes(this.userName)) {
      this.WrongData('userName', 'userNameError');
      return false;
    }
    if (this.usernames.includes(this.userName)) {
      this.WrongData('userName', 'userNameError');
      return false;
    }
    return true;
  }
  handleChangeClient(evt) {
    var target = evt.target;
    if (target.checked) {
      this.link = "/PersonRegister";
      var clientButton = document.getElementById("client") as HTMLLabelElement;
      var enterpriseButton = document.getElementById("enterprise") as HTMLLabelElement;
      clientButton.style.color = "black";
      enterpriseButton.style.color = "black";
    }
  }

  handleChangeEnterprise(evt) {
    var target = evt.target;
    if (target.checked) {
      this.link = "/EnterpriseRegister";
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

  WrongData(tagName: string, errorTag: string){
    var element = (document.getElementById(tagName) as HTMLInputElement);
    element.className += " is-invalid";
    var errorElement = (document.getElementById(errorTag) as HTMLLabelElement); 
    errorElement.className = " invalid-feedback";
    errorElement.style.marginLeft = "9px";
    errorElement.textContent = "El nombre de usuario ya existe."
  }
}
