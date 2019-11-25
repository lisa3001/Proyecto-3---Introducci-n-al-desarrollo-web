import { Component, OnInit,Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Experiencia, DominioExperiencia, ExperienciaInput, DominioExperienciaInput } from 'src/app/types/types.module';
import { element } from 'protractor';
import { agregarExperienciasMutation, agregarDominiosPorExperienciaMutation } from 'src/app/queries/queries.module';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-experiencia-persona',
  templateUrl: './experiencia-persona.component.html',
  styleUrls: ['./experiencia-persona.component.scss']
})

export class ExperienciaPersonaComponent implements OnInit {
  @ViewChild('dismissCambiosEdit', {static: false}) dismissCambiosEdit:any;
  @ViewChild('dismissAgregar', {static: false}) dismissAgregar:any;
  @ViewChild('changesModalB',{static: false}) changesModalB:any;
  @ViewChild('cancelarCambios',{static: false}) cancelarCambios:any;
  
  public index: number;
  public selfRef: ExperienciaPersonaComponent;
  public experienciaInfoEdit: Experiencia = {
    empresa: null,
    cargo: null,
    fechadeingreso: null,
    fechadesalida: null,
    trabajactual: null,
    descripcion: null,
    dominios: []
  } as Experiencia;
  selectedExperiencia: Experiencia = {
    empresa: null,
    cargo: null,
    fechadeingreso: null,
    fechadesalida: null,
    trabajactual: null,
    descripcion: null,
    dominios: []
  } as Experiencia;
  public nuevaexperiencia: Experiencia = {
    empresa: null,
    cargo: null,
    fechadeingreso: null,
    fechadesalida: null,
    trabajactual: null,
    descripcion: null,
    dominios: []
  } as Experiencia;
  selectedNombreEditar: String = "";
  selectedTipoEditar: String = "";
  selectedNombreAgregar: String = "";
  selectedTipoAgregar: String = "";
  constructor(private mainservice: MainServiceService, private apollo: Apollo) { 

  }

  editar(experiencia: Experiencia) {
    this.clearTag("empresa-delete");
    this.clearTag("cargo-delete");
    this.clearTag("fecha-ingreso-delete");
    this.clearTag("fecha-salida-delete");
    this.clearTag("descripcion-delete");
    this.selectedExperiencia = experiencia;
    this.experienciaInfoEdit = JSON.parse(JSON.stringify(experiencia));
  }

  guardarCambiosEdit() {
    if(this.validateCampos("delete")) {
      let index = this.mainservice.editExperiencias.indexOf(this.selectedExperiencia);
      this.mainservice.editExperiencias[index] = JSON.parse(JSON.stringify(this.experienciaInfoEdit));
      this.dismissCambiosEdit.nativeElement.click();
    }
  }

  buscarDominio(lista, selectedNombre, selectedTipo): Boolean {
    for(let i: number = 0; i<lista.length; i++) {
      if (lista[i].nombredellenguaje == selectedNombre && lista[i].tipodesoftware == selectedTipo) {
        return true;
      }
    }
    return false;
  }

  agregarDominioEditar() {
    if (!this.buscarDominio(this.experienciaInfoEdit.dominios, this.selectedNombreEditar, this.selectedTipoEditar) && this.selectedTipoEditar != "" && this.selectedNombreEditar != "") {
      this.experienciaInfoEdit.dominios.push({nombredellenguaje: this.selectedNombreEditar as string, tipodesoftware: this.selectedTipoEditar as string} as DominioExperiencia);
    }
  }

  deleteDominioEditar(dominio: DominioExperiencia) {
    this.experienciaInfoEdit.dominios = this.experienciaInfoEdit.dominios.filter(function(value, index, arr) {
      return value != dominio;
    });
  }

  deleteDominioAgregar(dominio: DominioExperiencia) {
    this.experienciaInfoEdit.dominios = this.experienciaInfoEdit.dominios.filter(function(value, index, arr) {
      return value != dominio;
    });
  }

  agregarDominioNuevos() {
    if (!this.buscarDominio(this.nuevaexperiencia.dominios, this.selectedNombreAgregar, this.selectedTipoAgregar) && this.selectedTipoAgregar != "" && this.selectedNombreAgregar != "") {
      this.nuevaexperiencia.dominios.push({nombredellenguaje: this.selectedNombreAgregar as string, tipodesoftware: this.selectedTipoAgregar as string} as DominioExperiencia);
    }
  }

  eliminarExperiencia(experiencia: Experiencia) {
    this.mainservice.editExperiencias = this.mainservice.editExperiencias.filter(function(value, index, arr){
      return value != experiencia;  
    });
  }

  agregarExperiencia() {
    this.nuevaexperiencia = {
      empresa: null,
      cargo: null,
      fechadeingreso: null,
      fechadesalida: null,
      trabajactual: false,
      descripcion: null,
      dominios: []
    } as Experiencia;
  }

  GuardarNuevaExperiencia() {
    if(this.validateCampos("add")) {
      this.mainservice.editExperiencias.push(JSON.parse(JSON.stringify(this.nuevaexperiencia)));
      this.dismissAgregar.nativeElement.click();
    }
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
  }

  GuardarCambios() {
    let experiencias: ExperienciaInput[] = [];
    this.mainservice.editExperiencias.forEach( experiencia => {
      experiencias.push({
        empresa: experiencia.empresa,
        cargo: experiencia.cargo,
        fechadeingreso: experiencia.fechadeingreso,
        fechadesalida: experiencia.fechadesalida,
        trabajactual: experiencia.trabajactual,
        descripcion: experiencia.descripcion
      } as ExperienciaInput);
    });
    this.apollo.mutate({
      mutation: agregarExperienciasMutation,
      variables: {
        nombreusuario: this.mainservice.persona.nombreusuario,
        experiencias: experiencias
      }
    }).subscribe(data => {
      console.log(data);
    });
    let index = 0;
    this.mainservice.editExperiencias.forEach( experiencia => {
      let dominios: DominioExperienciaInput[] = [];
      index += 1;
      experiencia.dominios.forEach( dominio => {
        dominios.push({numeroexperiencia: index, nombredellenguaje: dominio.nombredellenguaje, tipodesoftware: dominio.tipodesoftware} as DominioExperienciaInput);
      });
      if (dominios.length < 1) return; 
      this.apollo.mutate({
        mutation: agregarDominiosPorExperienciaMutation,
        variables: {
          nombreusuario: this.mainservice.persona.nombreusuario,
          numeroexperiencia: dominios[0].numeroexperiencia,
          dominios: dominios
        }
      }).subscribe(data => {
        console.log(data);
      });
    });
    this.changesModalB.nativeElement.click();
  }

  textChange(tagName: string, errorMessage: string) {
    var element = (document.getElementById(tagName) as HTMLInputElement);
    if (element.value.trim() == ""){
      element.className += " is-invalid";
      element.placeholder = errorMessage;
    } else {
      element.classList.remove("is-invalid");
      element.className += " is-valid";
    }
  }

  validateCampos(suffix: String): Boolean {
    this.textChange("empresa-" + suffix, "Ingrese un nombre de empresa");
    this.textChange("cargo-" + suffix, "Ingrese un cargo");
    this.textChange("fecha-ingreso-" + suffix, "Ingrese una fecha válida");
    this.textChange("fecha-salida-" + suffix, "Ingrese una fecha válida");
    this.textChange("descripcion-" + suffix, "Ingrese una descripción");
    if (this.experienciaInfoEdit.empresa == "" || this.experienciaInfoEdit.cargo == "" || this.experienciaInfoEdit.fechadeingreso == "" || 
    this.experienciaInfoEdit.fechadesalida == "") {
      return false;
    }
    if ((new Date(this.experienciaInfoEdit.fechadeingreso)).valueOf() > (new Date(this.experienciaInfoEdit.fechadesalida)).valueOf()) {
      var element = (document.getElementById("fecha-ingreso-" + suffix) as HTMLInputElement);
      element.className += " is-invalid";
      var element = (document.getElementById("fecha-salida-" + suffix) as HTMLInputElement);
      element.className += " is-invalid";
      alert("Las fecha de ingreso no puede ser mayor a la de salida");
      return false;
    }
    return true;
  }

  clearTag(tagName) {
    var element = (document.getElementById(tagName) as HTMLInputElement);
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");
  }

  cancelarCambiosSure() {
    this.mainservice.editExperiencias = JSON.parse(JSON.stringify(this.mainservice.persona.experiencias));
    this.cancelarCambios.nativeElement.click();
  }
}

export interface myinterface {
  remove(index: number);
}
