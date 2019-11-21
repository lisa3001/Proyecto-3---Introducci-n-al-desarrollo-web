import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-enterprise-register',
  templateUrl: './enterprise-register.component.html',
  styleUrls: ['./enterprise-register.component.scss']
})
export class EnterpriseRegisterComponent implements OnInit {

  enterpriseName: string;
  enterpriseEmail: string;

  constructor(private apollo: Apollo, private router: Router, private mainservice: MainServiceService) {
    this.enterpriseName = "";
    this.enterpriseEmail = "";
   }

  ngOnInit() {
  }

  AcceptButton(){
    if (this.enterpriseName != "" && this.enterpriseEmail != ""){
        if (this.validateEmail(this.enterpriseEmail)){
          console.log("OK");
        }else this.WrongData('userPassword', 'userPassError', 'Debes ingresar un correo válido.');
    }else{
      this.textChange('userName', 'userNameError', 'Debes ingresar un nombre.');
      this.textChange('userPassword', 'userPassError', 'Debes ingresar un correo.');
    }
  }

  textChange(tagName: string, errorTag: string, errorMesagge: string){
    var element = (document.getElementById(tagName) as HTMLInputElement);
    if (element.value.trim() == ""){
      element.className += " is-invalid";
      var errorElement = document.getElementById(errorTag); 
      errorElement.className = " invalid-feedback";
      errorElement.style.marginLeft = "9px";
      errorElement.textContent = errorMesagge;
    }else{
      element.classList.remove("is-invalid");
      element.className += " is-valid";
    }
    this.saveData(tagName, element.value.trim());
  }

  saveData(tagName: string, data: string){
    if (tagName == "userName") this.enterpriseName = data;
    else this.enterpriseEmail = data;
  }

  validateEmail(email: string){
    if (email.includes("@")) return true;
    else return false;
  }

  WrongData(tagName: string, errorTag: string, errorMesagge: string){
    var element = (document.getElementById(tagName) as HTMLInputElement);
    element.className += " is-invalid";
    var errorElement = (document.getElementById(errorTag) as HTMLLabelElement); 
    errorElement.className = " invalid-feedback";
    errorElement.style.marginLeft = "9px";
    errorElement.textContent = errorMesagge;
  }
}
