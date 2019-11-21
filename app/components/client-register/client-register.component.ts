import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import * as $ from 'jquery/dist/jquery.min.js';
import { ThrowStmt } from '@angular/compiler';
import { Apollo } from 'apollo-angular';
import { crearPersonaMutation } from 'src/app/queries/queries.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
  
  countries: any;
  name: string;
  birthDate: string;
  surName1: string;
  nationality: string;
  surName2: string;
  email: string;

  constructor(private router: Router,private apollo: Apollo, private mainservice: MainServiceService) {
    this.countries = mainservice.paises;
    this.name = "";
    this.birthDate = "";
    this.surName1 = "";
    this.surName2 = "";
    this.nationality = "";
    this.email = "";

    this.name = "Luis";
    this.birthDate = "2019-01-29";
    this.surName1 = "Molina";
    this.surName2 = "Juárez";
    this.nationality = "Costa Rica";
    this.email = "luisfermjua@gmail.com";
   }

  ngOnInit() {
    this.countries = this.mainservice.paises;
  }

  AcceptButton(){
    var isDateOK = this.validateDate();
    var isCountry = this.validateCountry();
    if (name != "" && this.surName2 != "" && this.surName1 != "" && this.email != "" && isDateOK && isCountry){
      this.apollo.mutate({
        mutation: crearPersonaMutation,
        variables: {
          nombreusuario: this.mainservice.logindata.username,
          contrasenia: this.mainservice.logindata.contrasenia,
          nombre: this.name,
          apellido1: this.surName1,
          apellido2: this.surName2,
          email: this.email,
          fechadenacimiento: this.birthDate,
          nacionalidad: this.nationality
        }
      }).subscribe(data => {
        if(data.data['crearpersona'] != null) {
          this.router.navigate(['/PersonProfile']);
        } else {
          alert("Error");
        }
      });
    } else {
      this.textChange('userName', 'NameError', 'Debes ingresar un nombre');
      this.textChange('surName', 'surNameError', 'Debes ingresar tu primer apellido');
      this.textChange('surName2', 'surName2Error', 'Debes ingresar tu segundo apellido.');
      this.textChange('userPassword', 'emailError', 'Debes ingresar un correo.');
    }

  }

  validateDate(){
    if (this.birthDate == "") {
      this.WrongData('userBirthDate', 'dateError', 'Debes elegir una fecha');
      return false;
    }
    else{
      return true;
    }
  }

  validateCountry(){
    if (this.nationality == ""){
      this.WrongData('countriesSelect', 'countryError', 'Debes elegir un país.');
      return false;
    }else{
      return true;
    }
  }

  getCountry(){
    var element = (document.getElementById("countriesSelect") as HTMLSelectElement);
    if (element.value == "") this.WrongData('countriesSelect', 'countryError', 'Debes elegir un país.');
    else{
      element.classList.remove("is-invalid");
      element.className += " is-valid";
    }
    this.nationality = element.value;
  }

  getDate(){
    var element = (document.getElementById("userBirthDate") as HTMLInputElement);
    this.birthDate = element.value;
    element.classList.remove("is-invalid");
    element.className += " is-valid";
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
      element.className += " is-valid";
    }
    this.saveData(tagName, element.value.trim());
  }

  saveData(tagName: string, data: string){
    if (tagName == "userName") this.name = data;
    else if (tagName == "surName") this.surName1 = data;
    else if (tagName == "surName2") this.surName2 = data;
    else this.email = data;
  }

  WrongData(tagName: string, errorTag: string, errorMessage: string){
    var element = (document.getElementById(tagName) as HTMLInputElement);
    element.className += " is-invalid";
    var errorElement = (document.getElementById(errorTag) as HTMLLabelElement); 
    errorElement.className = " invalid-feedback";
    errorElement.textContent = errorMessage;
  }


}
