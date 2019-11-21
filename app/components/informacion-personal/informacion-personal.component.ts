import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { MainServiceService } from 'src/app/services/main-service.service';
import { GuardsCheckStart } from '@angular/router';
var urlImagen;
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss']
})
export class InformacionPersonalComponent implements OnInit {
  nombre:string;
  apellido1:string;
  apellido2:string;
  correo:string;
  telefono1:string;
  telefono2:string;
  sitio:string;
  fechaNacimiento:string;
  nacionalidad:string;
  provincia:string;
  canton:string;
  distrito:string;
  imagen:string;

  constructor(private mainservice: MainServiceService) { 

  }

  ngOnInit() {
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



    this.nombre = this.mainservice.logindata.nombre;
    this.apellido1 = this.mainservice.logindata.apellido1;
    this.apellido2 = this.mainservice.logindata.apellido2;
    this.correo = this.mainservice.logindata.email;
    this.nacionalidad = this.mainservice.logindata.nacionalidad;
    this.fechaNacimiento = this.mainservice.logindata.fechadenacimiento;
  }

  GuardarCambios(){
    var nombre = (document.getElementById("primer-nombre") as HTMLInputElement).value;
    var apellido1 = (document.getElementById("primer-apellido") as HTMLInputElement).value; 
    var apellido2 = (document.getElementById("segundo-apellido") as HTMLInputElement).value;  
    var correo = (document.getElementById("correo") as HTMLInputElement).value;
    var telefono1 = (document.getElementById("telefono1") as HTMLInputElement).value;  
    var telefono2 = (document.getElementById("telefono2") as HTMLInputElement).value;
    var sitio = (document.getElementById("sitio-web") as HTMLInputElement).value;    
    var fechaNacimiento = (document.getElementById("nacimiento") as HTMLInputElement).value;  
    var nacionalidad = (document.getElementById("nacionalidadDropdown") as HTMLSelectElement).value;
    var provincia = (document.getElementById("provinciaDropdown") as HTMLSelectElement).value;
    var canton = (document.getElementById("cantonDropdown") as HTMLSelectElement).value;
    var distrito = (document.getElementById("distritoDropdown") as HTMLSelectElement).value;
    
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.correo = correo;
    this.telefono1 = telefono1;
    this.telefono2 = telefono2;
    this.sitio = sitio;
    this.fechaNacimiento = fechaNacimiento;
    this.nacionalidad = nacionalidad;
    this.provincia = provincia;
    this.canton = canton;
    this.distrito = distrito;
    console.log(urlImagen)
  }

}
