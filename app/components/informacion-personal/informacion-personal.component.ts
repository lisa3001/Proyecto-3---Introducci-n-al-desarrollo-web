import { Component, OnInit, ViewChild } from '@angular/core';
//import * as $ from 'jquery/dist/jquery.min.js';
import * as $ from 'jquery';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Persona, Experiencia, Direccion } from 'src/app/types/types.module';
import { Provincia, actualizarPersonaMutation, actualizarPersonaImagenMutation } from 'src/app/queries/queries.module';
import { Apollo } from 'apollo-angular';

var urlImagen;
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss']
})
export class InformacionPersonalComponent implements OnInit {
  @ViewChild('dismiss', {static: false}) dismiss: any;
  persona: Persona;
  fechadenacimiento: string;
  personaedit: Persona;
  fechadenacimientoedit: string;
  static apolloS: Apollo;
  static mainS: MainServiceService;
  selectedProvincia: String = "";
  selectedCanton: String = "";
  selectedDistrito: String = "";

  constructor(private mainservice: MainServiceService, private apollo: Apollo) {    
    this.fechadenacimiento = this.mainservice.persona.fechadenacimiento;
    this.personaedit = Object.assign({}, this.mainservice.persona) as Persona;
    this.fechadenacimientoedit = this.personaedit.fechadenacimiento;
    InformacionPersonalComponent.apolloS = this.apollo;
    InformacionPersonalComponent.mainS = this.mainservice;
    
  }

  ngOnInit() {
    //this.filterCantones();
    //this.filterDistritos();
    $(".imgAdd").click(function(){
      $(this).closest(".row").find('.imgAdd').before('<div class="col-sm-2 imgUp"><div class="imagePreview" id="imagePreview"></div><label class="btn btn-primary">Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
      
    });
    if (this.mainservice.persona.fotografia != null) $("#imagePreview").css("background-image", "url("+this.mainservice.persona.fotografia+")");
    
    $(document).on("click", "i.del" , function() {
      $(this).parent().remove();
    });
    $(function() {
        $(document).on("change",".uploadFile", function()
        {
            var uploadFile = $(this);
            var files = !!this.files ? this.files : [];
            if (!files.length || !FileReader) return; // no file selected, or no FileReader support
     
            if (/^image/.test( files[0].type)){ // only image file
              let reader: FileReader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
     
                reader.onloadend = function(){ // set image data as background of div
                    //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
                uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this.result+")");
                InformacionPersonalComponent.mainS.persona.fotografia = this.result.toString();
                let persona = InformacionPersonalComponent.mainS.persona as Persona;
                InformacionPersonalComponent.apolloS.mutate ({
                  mutation: actualizarPersonaImagenMutation,
                  variables: {
                    nombreusuario: persona.nombreusuario,
                    fotografia: persona.fotografia
                  }
                }).subscribe(data => {
                  console.log(data);
                });
                }
            }
          
        });
    });
  }

  guardarEdit(){
    if (this.validateCampos()) {
      this.mainservice.persona = Object.assign({}, this.personaedit);
      this.mainservice.persona.fechadenacimiento = this.fechadenacimientoedit;
      this.fechadenacimiento = this.mainservice.persona.fechadenacimiento;
      this.mainservice.direcciones.forEach(element => {
        if (element.provinciacod == this.selectedProvincia) {
          this.mainservice.persona.provincia = element.provincia as string;
          element.cantones.forEach(canton => {
            if (canton.cantoncod == this.selectedCanton) {
              this.mainservice.persona.canton = canton.canton as string;
              canton.distritos.forEach(distrito => {
                if (distrito.distritocod == this.selectedDistrito) {
                  this.mainservice.persona.distrito = distrito.distrito as string;
                }
              });
            }
          });
        }
      });
      this.apollo.mutate({
        mutation: actualizarPersonaMutation,
        variables: {
          persona: {
            nombreusuario: this.mainservice.persona.nombreusuario,
            apellido1: this.mainservice.persona.apellido1,
            apellido2: this.mainservice.persona.apellido2,
            email: this.mainservice.persona.email,
            nombre: this.mainservice.persona.nombre,
            fechadenacimiento: this.mainservice.persona.fechadenacimiento,
            nacionalidad: this.mainservice.persona.nacionalidad,
            provincia: this.selectedProvincia,
            canton: this.selectedCanton,
            distrito: this.selectedDistrito,
            telefono1: this.mainservice.persona.telefono1,
            telefono2: this.mainservice.persona.telefono2,
            sitioweb: this.mainservice.persona.sitioweb,
            fotografia: this.mainservice.persona.fotografia
          }
        }
      }).subscribe(data => {
        console.log(data);
      });
      this.clearTag("primer-nombre");
      this.clearTag("primer-apellido");
      this.clearTag("segundo-apellido");
      this.clearTag("correo");
      this.dismiss.nativeElement.click();    
    }
  }

  cancelarEdit() {
    this.clearTag("primer-nombre");
    this.clearTag("primer-apellido");
    this.clearTag("segundo-apellido");
    this.clearTag("correo");
    this.personaedit = Object.assign({}, this.mainservice.persona);
  }

  validateCampos(): Boolean {
    this.textChange("primer-nombre", "Ingrese su nombre");
    this.textChange("primer-apellido", "Ingrese su primer apellido");
    this.textChange("segundo-apellido", "Ingrese su segundo apellido");
    this.textChange("correo", "Ingrese un correo válido");
    if (this.personaedit.nombre == "" || this.personaedit.apellido1 == "" || this.personaedit.apellido2 == "" || 
    this.personaedit.email == "" || this.personaedit.nacionalidad == "" || !this.personaedit.email.includes("@")) {
      return false;
    }
    return true;
  }

  clearTag(tagName) {
    var element = (document.getElementById(tagName) as HTMLInputElement);
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");
  }

  textChange(tagName: string, errorMessage: string) {
    var element = (document.getElementById(tagName) as HTMLInputElement);
    if (element.value.trim() == "" || (tagName == "correo" && !element.value.trim().includes("@"))){
      element.className += " is-invalid";
      element.placeholder = errorMessage;
    } else {
      element.classList.remove("is-invalid");
      element.className += " is-valid";
    }
  }
  
  editar() {
    this.personaedit = Object.assign({}, this.mainservice.persona) as Persona;
    this.fechadenacimientoedit = this.mainservice.persona.fechadenacimiento;
    let provinciaIndex = -1;
    let cantonIndex = -1;
    let distritoIndex = -1;
    let provinciaIndexAux = -1;
    let cantonIndexAux = -1;
    let distritoIndexAux = -1;
    let SelectAux = ["1", "01", "01"];
    if (this.personaedit.provincia != null) {
      this.mainservice.direcciones.forEach( element => {
        provinciaIndex += 1;
        if (element.provincia == this.mainservice.persona.provincia) {
          provinciaIndexAux = provinciaIndex;
          this.selectedProvincia = element.provinciacod;
          SelectAux[0] = element.provinciacod as string;
          element.cantones.forEach(canton => {
            cantonIndex += 1;
            if(canton.canton == this.mainservice.persona.canton) {
              cantonIndexAux = cantonIndex;
              this.selectedCanton = canton.cantoncod;
              SelectAux[1] = canton.cantoncod as string;
              canton.distritos.forEach(distrito => {
                distritoIndex += 1;
                if (distrito.distrito == this.mainservice.persona.distrito) {
                  distritoIndexAux = distritoIndex;
                  this.selectedDistrito = distrito.distritocod;
                  SelectAux[2] = distrito.distritocod as string;
                  return;
                }
              });
              return;
            }
          });
          return;
        }
      });
      this.filterCantones(false);
      this.selectedProvincia = SelectAux[0];
      this.selectedCanton = SelectAux[1];
      this.selectedDistrito = SelectAux[2];
      if (this.personaedit.canton != null) {
        (document.getElementById("cantonDropdown") as HTMLSelectElement).selectedIndex = cantonIndexAux;
      } 
      if (this.personaedit.distrito != null) {
        (document.getElementById("distritoDropdown") as HTMLSelectElement).selectedIndex = distritoIndexAux;
      }  
    } else {
    }
  }

  filterCantones(change: Boolean) {
    this.mainservice.cantonesFiltrados = [];
    this.mainservice.direcciones.forEach(element => {
      if (element.provinciacod == this.selectedProvincia) {
        if(change) {
          this.selectedCanton = element.cantones[0].cantoncod;
          (document.getElementById("cantonDropdown") as HTMLSelectElement).selectedIndex = 0;
        }
        this.mainservice.cantonesFiltrados = element.cantones;
      }
    });
    this.filterDistritos(change);
    return this.mainservice.cantonesFiltrados;
  }

  filterDistritos(change: Boolean) {
    this.mainservice.distritosFiltrados = [];
    this.mainservice.direcciones.forEach(element => {
      if (element.provinciacod == this.selectedProvincia) {
        element.cantones.forEach(canton => {
          if (canton.cantoncod == this.selectedCanton) {
            this.mainservice.distritosFiltrados = canton.distritos;
            this.selectedDistrito = canton.distritos[0].distritocod;
            (document.getElementById("distritoDropdown") as HTMLSelectElement).selectedIndex = 0;
          }
        });
      }
    });
    return this.mainservice.distritosFiltrados;
  }

}
