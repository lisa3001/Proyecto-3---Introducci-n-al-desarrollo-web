import { Component, OnInit, ViewChild } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Empresa } from 'src/app/types/types.module';
import { Apollo } from 'apollo-angular';
import { actualizarEmpresaImagenMutation, actualizarEmpresaMutation } from 'src/app/queries/queries.module';

@Component({
  selector: 'app-informacion-empresa',
  templateUrl: './informacion-empresa.component.html',
  styleUrls: ['./informacion-empresa.component.scss']
})
export class InformacionEmpresaComponent implements OnInit {
  @ViewChild('dismiss', {static: false}) dismiss: any;
  empresaedit: Empresa;
  static apolloS: Apollo;
  static mainS: MainServiceService;
  selectedProvincia: String = "";
  selectedCanton: String = "";
  selectedDistrito: String = "";


  constructor(private mainservice: MainServiceService, private apollo: Apollo) {
    this.empresaedit = Object.assign({}, mainservice.empresa);
    InformacionEmpresaComponent.apolloS = this.apollo;
    InformacionEmpresaComponent.mainS = this.mainservice;
  }

  ngOnInit() {
    $(".imgAdd").click(function(){
      $(this).closest(".row").find('.imgAdd').before('<div class="col-sm-2 imgUp"><div class="imagePreview" id="imagePreview"></div><label class="btn btn-primary">Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
      
    });
    if (this.mainservice.empresa.logo != null) $("#imagePreview").css("background-image", "url("+this.mainservice.empresa.logo+")");
    
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
                InformacionEmpresaComponent.mainS.empresa.logo = this.result.toString();
                let empresa = InformacionEmpresaComponent.mainS.empresa as Empresa;
                InformacionEmpresaComponent.apolloS.mutate ({
                  mutation: actualizarEmpresaImagenMutation,
                  variables: {
                    nombreusuario: empresa.nombreusuario,
                    logo: empresa.logo
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
      this.mainservice.empresa = Object.assign({}, this.empresaedit);
      this.mainservice.direcciones.forEach(element => {
        if (element.provinciacod == this.selectedProvincia) {
          this.mainservice.empresa.provincia = element.provincia as string;
          element.cantones.forEach(canton => {
            if (canton.cantoncod == this.selectedCanton) {
              this.mainservice.empresa.canton = canton.canton as string;
              canton.distritos.forEach(distrito => {
                if (distrito.distritocod == this.selectedDistrito) {
                  this.mainservice.empresa.distrito = distrito.distrito as string;
                }
              });
            }
          });
        }
      });
      this.apollo.mutate({
        mutation: actualizarEmpresaMutation,
        variables: {
          empresa: {
            nombreusuario: this.mainservice.empresa.nombreusuario,
            email: this.mainservice.empresa.email,
            nombre: this.mainservice.empresa.nombre,
            nacionalidad: this.mainservice.empresa.nombrecontacto,
            provincia: this.selectedProvincia,
            canton: this.selectedCanton,
            distrito: this.selectedDistrito,
            telefono1: this.mainservice.empresa.telefono1,
            telefono2: this.mainservice.empresa.telefono2,
            sitioweb: this.mainservice.empresa.sitioweb,
          }
        }
      }).subscribe(data => {
        console.log(data);
      });
      this.dismiss.nativeElement.click();    
    }
  }

  cancelarEdit() {
    this.empresaedit = Object.assign({}, this.mainservice.empresa);
  }

  validateCampos(): Boolean {
    this.textChange("nombre-empresa", "Ingrese un nombre");
    this.textChange("correo", "Ingrese su primer apellido");
    if (this.empresaedit.nombre == "" || 
    this.empresaedit.email == "" || !this.empresaedit.email.includes("@")) {
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

  editar(){
    this.clearTag("nombre-empresa");
    this.clearTag("correo");
    this.empresaedit = Object.assign({}, this.mainservice.empresa) as Empresa;
    let provinciaIndex = -1;
    let cantonIndex = -1;
    let distritoIndex = -1;
    let provinciaIndexAux = -1;
    let cantonIndexAux = -1;
    let distritoIndexAux = -1;
    let SelectAux = ["1", "01", "01"];
    if (this.empresaedit.provincia != null) {
      this.mainservice.direcciones.forEach( element => {
        provinciaIndex += 1;
        if (element.provincia == this.mainservice.empresa.provincia) {
          provinciaIndexAux = provinciaIndex;
          this.selectedProvincia = element.provinciacod;
          SelectAux[0] = element.provinciacod as string;
          element.cantones.forEach(canton => {
            cantonIndex += 1;
            if(canton.canton == this.mainservice.empresa.canton) {
              cantonIndexAux = cantonIndex;
              this.selectedCanton = canton.cantoncod;
              SelectAux[1] = canton.cantoncod as string;
              canton.distritos.forEach(distrito => {
                distritoIndex += 1;
                if (distrito.distrito == this.mainservice.empresa.distrito) {
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
      if (this.empresaedit.canton != null) {
        (document.getElementById("cantonDropdown") as HTMLSelectElement).selectedIndex = cantonIndexAux;
      } 
      if (this.empresaedit.distrito != null) {
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
