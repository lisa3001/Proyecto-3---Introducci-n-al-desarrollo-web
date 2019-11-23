import { Component, OnInit } from '@angular/core';
import {ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { ExperienciaPersonaComponent } from 'src/app/components/experiencia-persona/experiencia-persona.component'

@Component({
  selector: 'app-perfil-persona',
  templateUrl: './perfil-persona.component.html',
  styleUrls: ['./perfil-persona.component.scss']
})
export class PerfilPersonaComponent implements OnInit {
 @ViewChild('contenedorExperienciasPersona', {read:ViewContainerRef,static: false}) contenedorExperienciasPersona:any;
  @ViewChild('closebutton',{static: false}) closebutton:any;
  componentes = [
    {
      component:ExperienciaPersonaComponent
    }
  ];
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  InsertarExperiencia(){
    const factory = this.componentFactoryResolver.resolveComponentFactory(ExperienciaPersonaComponent);
    this.contenedorExperienciasPersona.createComponent(factory)
    this.closebutton.nativeElement.click();
  }
}
