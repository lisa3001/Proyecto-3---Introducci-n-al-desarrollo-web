import { Component, OnInit, ViewChild } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Estudio } from 'src/app/types/types.module';
import { agregarEstudiosPorPersonaMutation } from 'src/app/queries/queries.module';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-estudios-persona',
  templateUrl: './estudios-persona.component.html',
  styleUrls: ['./estudios-persona.component.scss']
})
export class EstudiosPersonaComponent implements OnInit {
  selectedGrado: String = "";
  selectedInstitucion: String = "";
  selectedAnio: String = "";
  @ViewChild('changesModalEstudiosB',{static: false}) changesModalB:any;
  @ViewChild('cancelarCambiosEstudios',{static: false}) cancelarCambios:any;
  constructor(private mainservice: MainServiceService, private apollo: Apollo) { }

  ngOnInit() {
  }

  GuardarCambios() {
    this.mainservice.persona.estudios = JSON.parse(JSON.stringify(this.mainservice.editEstudios));
    this.apollo.mutate({
      mutation: agregarEstudiosPorPersonaMutation,
      variables:{
        nombreusuario: this.mainservice.persona.nombreusuario,
        estudios: this.mainservice.persona.estudios
      }
    }).subscribe(data=> {
      console.log(data);
    });
    this.changesModalB.nativeElement.click();
  }
  
  cancelarCambiosSure() {
    this.mainservice.editEstudios = JSON.parse(JSON.stringify(this.mainservice.persona.estudios));
    this.cancelarCambios.nativeElement.click();
  }

  deleteEstudio(estudio: Estudio){
    this.mainservice.editEstudios = this.mainservice.editEstudios.filter(function(value, index, arg) {
      return value != estudio; 
    })
   }

   buscarEstudio(estudio: String){
    return false;
   }

 agregarEstudio(){
  if (!this.buscarEstudio(this.selectedGrado) && this.selectedAnio != "" && this.selectedInstitucion != "" && this.selectedGrado != "") {
    this.mainservice.editEstudios.push({gradoobtenido: this.selectedGrado, nombreinstitucion: this.selectedInstitucion, anio: this.selectedAnio} as Estudio);
  }

 }

}
