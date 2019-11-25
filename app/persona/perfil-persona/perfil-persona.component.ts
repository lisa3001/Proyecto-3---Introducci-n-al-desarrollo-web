import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef} from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-perfil-persona',
  templateUrl: './perfil-persona.component.html',
  styleUrls: ['./perfil-persona.component.scss']
})

export class PerfilPersonaComponent implements OnInit {
  @ViewChild('contenedorExperienciasPersona', {read:ViewContainerRef,static: false}) contenedorExperienciasPersona: any;
  @ViewChild('nuevosdominios', {read:ViewContainerRef,static: false}) nuevosdominios: any;
  @ViewChild('closebutton',{static: false}) closebutton:any;

  constructor(private mainservice: MainServiceService, private apollo: Apollo) {

    }

  ngOnInit(){
    
  }

}
