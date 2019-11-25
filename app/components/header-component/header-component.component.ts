import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  constructor(private mainservice: MainServiceService, private router: Router) {

  }

  ngOnInit() {
  }
  goPerfil(){
    if(this.mainservice.logged == "persona") {
      this.router.navigate(['/PersonProfile']);
    } else {
      this.router.navigate(['/EnterpriseProfile']);
    }
   }
}
