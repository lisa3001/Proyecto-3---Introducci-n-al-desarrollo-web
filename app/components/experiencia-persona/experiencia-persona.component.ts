import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
@Component({
  selector: 'app-experiencia-persona',
  templateUrl: './experiencia-persona.component.html',
  styleUrls: ['./experiencia-persona.component.scss']
})
export class ExperienciaPersonaComponent implements OnInit {
  @Output() public instancia = this.MiInstancia();
  constructor() { }

  ngOnInit() {
  }
 
  MiInstancia(){
    console.log(this);
  }

}
