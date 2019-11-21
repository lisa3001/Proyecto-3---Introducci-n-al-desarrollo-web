import { Component, OnInit } from '@angular/core';
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

  constructor(private _router: Router) {
    this.link = "";
    this.userName = "";
    this.userPassword = "";
   }

  ngOnInit() {
  }

  AcceptButton(){
    var isButtonChecked = this.isRadioButtonChecked();
    if (this.userName != "" && this.userPassword != "" && isButtonChecked){
        
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

}
