import { Component, OnInit, ViewChild } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Idioma } from 'src/app/types/types.module';
import { Apollo } from 'apollo-angular';
import { agregarIdiomasPorPersonaMutation } from 'src/app/queries/queries.module';

@Component({
  selector: 'app-idiomas-persona',
  templateUrl: './idiomas-persona.component.html',
  styleUrls: ['./idiomas-persona.component.scss']
})
export class IdiomasPersonaComponent implements OnInit {
  selectedIdioma: String = "Spanish";
  selectedNivel: String = "A1";
  @ViewChild('changesModalB',{static: false}) changesModalB:any;
  @ViewChild('cancelarCambios',{static: false}) cancelarCambios:any;
  constructor(private mainservice: MainServiceService, private apollo: Apollo) {
    
  }

  ngOnInit() {
  }

  GuardarCambios() {
    this.mainservice.persona.idiomas = JSON.parse(JSON.stringify(this.mainservice.editIdiomas));
    this.apollo.mutate({
      mutation: agregarIdiomasPorPersonaMutation,
      variables:{
        nombreusuario: this.mainservice.persona.nombreusuario,
        idiomas: this.mainservice.persona.idiomas
      }
    }).subscribe(data=> {
      console.log(data);
    });
    this.changesModalB.nativeElement.click();
  }
  
  cancelarCambiosSure() {
    this.mainservice.editIdiomas = JSON.parse(JSON.stringify(this.mainservice.persona.idiomas));
    this.cancelarCambios.nativeElement.click();
  }

  deleteIdioma(idioma: Idioma){
    this.mainservice.editIdiomas = this.mainservice.editIdiomas.filter(function(value, index, arg) {
      return value.idioma != idioma.idioma; 
    })
   }

   buscarIdioma(idioma: String){
    for (let i = 0; i < this.mainservice.editIdiomas.length; i++){
      if(idioma == this.mainservice.editIdiomas[i].idioma){
        var text = document.getElementById("idErrorIdioma") as HTMLSelectElement;
        text.innerHTML = "El idioma ya fue agregado";
        return true;
      } 
    }
    return false;
   }

 agregarIdioma(){
  if (!this.buscarIdioma(this.selectedIdioma)) {
    this.mainservice.editIdiomas.push({idioma: this.selectedIdioma, nivelidioma: this.selectedNivel} as Idioma);
  }

 }

}
