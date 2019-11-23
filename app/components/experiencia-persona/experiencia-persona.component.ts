import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Experiencia } from 'src/app/types/types.module';
@Component({
  selector: 'app-experiencia-persona',
  templateUrl: './experiencia-persona.component.html',
  styleUrls: ['./experiencia-persona.component.scss']
})
export class ExperienciaPersonaComponent implements OnInit {
  
  public index: number;
  public selfRef: ExperienciaPersonaComponent;
  public experienciaInfo: Experiencia;
  //interface for Parent-Child interaction
  public compInteraction: myinterface;

  constructor(private mainservice: MainServiceService) { 

  }

  ngOnInit() {
  }
 
  removeMe(index) {
    this.compInteraction.remove(index)
  }

}

export interface myinterface {
  remove(index: number);
}
