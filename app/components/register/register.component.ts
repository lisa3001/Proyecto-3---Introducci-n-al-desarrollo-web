import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  logged: any;

  constructor(private mainservice: MainServiceService) {
    this.logged = mainservice.logindata;
  }

  ngOnInit() {
    console.log(this.logged);
  }

}
