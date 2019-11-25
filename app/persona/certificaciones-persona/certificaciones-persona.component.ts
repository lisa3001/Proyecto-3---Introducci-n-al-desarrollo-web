import { Component, OnInit, ViewChild } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Apollo } from 'apollo-angular';
import { agregarCertificacionesPorPersonaMutation } from 'src/app/queries/queries.module';
import { Certificacion } from 'src/app/types/types.module';

@Component({
  selector: 'app-certificaciones-persona',
  templateUrl: './certificaciones-persona.component.html',
  styleUrls: ['./certificaciones-persona.component.scss']
})
export class CertificacionesPersonaComponent implements OnInit {
  selectedTitulo: String = "";
  selectedInstitucion: String = "";
  selectedAnio: String = "";
  @ViewChild('changesModalCertificacionesB',{static: false}) changesModalB:any;
  @ViewChild('cancelarCambiosCertificaciones',{static: false}) cancelarCambios:any;
  constructor(private mainservice: MainServiceService, private apollo: Apollo) { }

  ngOnInit() {
  }

  GuardarCambios() {
    this.mainservice.persona.certificaciones = JSON.parse(JSON.stringify(this.mainservice.editCertificaciones));
    this.apollo.mutate({
      mutation: agregarCertificacionesPorPersonaMutation,
      variables:{
        nombreusuario: this.mainservice.persona.nombreusuario,
        certificaciones: this.mainservice.persona.certificaciones
      }
    }).subscribe(data=> {
      console.log(data);
    });
    this.changesModalB.nativeElement.click();
  }
  
  cancelarCambiosSure() {
    this.mainservice.editCertificaciones = JSON.parse(JSON.stringify(this.mainservice.persona.certificaciones));
    this.cancelarCambios.nativeElement.click();
  }

  deleteEstudio(certificacion: Certificacion){
    this.mainservice.editCertificaciones = this.mainservice.editCertificaciones.filter(function(value, index, arg) {
      return value != certificacion; 
    })
   }

   buscarEstudio(certificacion: String){
    return false;
   }

 agregarEstudio(){
  if (!this.buscarEstudio(this.selectedTitulo) && this.selectedAnio != "" && this.selectedInstitucion != "" && this.selectedTitulo != "") {
    this.mainservice.editCertificaciones.push({titulo: this.selectedTitulo, nombreinstitucion: this.selectedInstitucion, anio: this.selectedAnio} as Certificacion);
  }

 }

}
