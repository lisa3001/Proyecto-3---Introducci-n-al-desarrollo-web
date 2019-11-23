import { Component, OnInit, ComponentRef } from '@angular/core';
import {ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { ExperienciaPersonaComponent } from 'src/app/components/experiencia-persona/experiencia-persona.component'
import { Persona, Experiencia, Direccion } from 'src/app/types/types.module';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-perfil-persona',
  templateUrl: './perfil-persona.component.html',
  styleUrls: ['./perfil-persona.component.scss']
})
export class PerfilPersonaComponent implements OnInit {
 @ViewChild('contenedorExperienciasPersona', {read:ViewContainerRef,static: false}) contenedorExperienciasPersona:any;
  @ViewChild('closebutton',{static: false}) closebutton:any;
  persona: Persona;
  personaedit: Persona;
  fechaingresoedit: string;
  fechasalidaedit: string;
  estrabajoactual: string;
  nuevaexperiencia:Experiencia;
  componentes = [];
  index: number = 0;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private mainservice: MainServiceService) {

    }

  ngOnInit() {
  }

  InsertarExperiencia(){
    
      const factory = this.componentFactoryResolver.resolveComponentFactory(ExperienciaPersonaComponent);
      let componentRef: ComponentRef<ExperienciaPersonaComponent> = this.contenedorExperienciasPersona.createComponent(factory);
      let currentComponent = componentRef.instance;

      currentComponent.selfRef = currentComponent;
      currentComponent.index = ++this.index;
      // prividing parent Component reference to get access to parent class methods
      currentComponent.compInteraction = this;

      //this.contenedorExperienciasPersona
      this.closebutton.nativeElement.click();
      this.componentes.push(componentRef);
      //console.log(component);
      
  }
  remove(index: number) {

    if (this.contenedorExperienciasPersona.length < 1)
        return;
    let componentRef = this.componentes.filter(x => x.instance.index == index)[0];
    let component: ExperienciaPersonaComponent = <ExperienciaPersonaComponent>componentRef.instance;
    let vcrIndex: number = this.contenedorExperienciasPersona.indexOf(componentRef);
    // removing component from container
    this.contenedorExperienciasPersona.remove(vcrIndex);

    this.componentes = this.componentes.filter(x => x.instance.index !== index);
}

  textChange(tagName: string, errorMessage: string) {
    var element = (document.getElementById(tagName) as HTMLInputElement);
    if (element.value.trim() == ""){
      element.className += " is-invalid";
      element.placeholder = errorMessage;
    }else{
      element.classList.remove("is-invalid");
      element.className += " is-valid";
    }
  }

  validateCampos(): Boolean {
    this.textChange("empresa-add", "Ingrese un nombre de empresa");
    this.textChange("cargo-add", "Ingrese un cargo");
    this.textChange("fecha-ingreso-add", "Ingrese una fecha válida");
    this.textChange("fecha-salida-add", "Ingrese una fecha válida");
    this.textChange("descripcion-add", "Ingrese una descripción");
    if (this.nuevaexperiencia.empresa == "" || this.nuevaexperiencia.cargo == "" || this.nuevaexperiencia.fechadeingreso == "" || 
    this.nuevaexperiencia.fechadesalida == "" || this.nuevaexperiencia.descripcion == "") {
      return false;
    }
    return true;
  }

}
