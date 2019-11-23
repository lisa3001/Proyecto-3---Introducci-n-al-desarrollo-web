import { Component, OnInit, ViewChild } from '@angular/core';
//import * as $ from 'jquery/dist/jquery.min.js';
import * as $ from 'jquery';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Persona, Experiencia, Direccion } from 'src/app/types/types.module';
import { Provincia } from 'src/app/queries/queries.module';

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
  
  selectedProvincia: String = "";
  selectedCanton: String = "";
  selectedDistrito: String = "";

  

  constructor(private mainservice: MainServiceService) {    
    this.fechadenacimiento = this.mainservice.persona.fechadenacimiento;
    this.personaedit = Object.assign({}, this.mainservice.persona) as Persona;
    this.fechadenacimientoedit = this.personaedit.fechadenacimiento;
  }
  
  editar() {
    this.personaedit = Object.assign({}, this.mainservice.persona) as Persona;
    this.fechadenacimientoedit = this.mainservice.persona.fechadenacimiento;
    if (this.personaedit.provincia != null) {
      this.mainservice.direcciones.forEach( element => {
        if (element.provincia = this.mainservice.persona.provincia) {
          this.selectedProvincia = element.provinciacod;
        }
      });
    } else {
      this.selectedProvincia = this.mainservice.direcciones[0].provinciacod;
    }
  }

  ngOnInit() {
    //this.filterCantones();
    //this.filterDistritos();
    $(".imgAdd").click(function(){
      $(this).closest(".row").find('.imgAdd').before('<div class="col-sm-2 imgUp"><div class="imagePreview"></div><label class="btn btn-primary">Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
    });
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
    urlImagen = this.result;
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
      this.dismiss.nativeElement.click();
    }
  }

  cancelarEdit() {
    this.personaedit = Object.assign({}, this.persona);
  }

  validateCampos(): Boolean {
    this.textChange("primer-nombre", "Ingrese su nombre");
    this.textChange("primer-apellido", "Ingrese su primer apellido");
    this.textChange("segundo-apellido", "Ingrese su segundo apellido");
    this.textChange("correo", "Ingrese un correo válido");
    if (this.personaedit.nombre == "" || this.personaedit.apellido1 == "" || this.personaedit.apellido2 == "" || 
    this.personaedit.email == "" || this.personaedit.nacionalidad == "") {
      return false;
    }
    return true;
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
  
  filterCantones() {
    this.mainservice.cantonesFiltrados = [];
    this.mainservice.direcciones.forEach(element => {
      if (element.provinciacod == this.selectedProvincia) {
        this.mainservice.cantonesFiltrados = element.cantones;
        this.selectedCanton = element.cantones[0].cantoncod;
        //(document.getElementById("cantonDropdown") as HTMLSelectElement).selectedIndex = 0;
      }
    });
    this.filterDistritos();
    return this.mainservice.cantonesFiltrados;
  }

  filterDistritos() {
    this.mainservice.distritosFiltrados = [];
    this.mainservice.direcciones.forEach(element => {
      if (element.provinciacod == this.selectedProvincia) {
        element.cantones.forEach(canton => {
          if (canton.cantoncod = this.selectedCanton) {
            this.mainservice.distritosFiltrados = canton.distritos;
          }
        });
      }
    });
    return this.mainservice.cantonesFiltrados;
  }

}
