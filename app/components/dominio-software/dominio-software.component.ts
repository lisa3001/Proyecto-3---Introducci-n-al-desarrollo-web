import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
@Component({
  selector: 'app-dominio-software',
  templateUrl: './dominio-software.component.html',
  styleUrls: ['./dominio-software.component.scss']
})
export class DominioSoftwareComponent implements OnInit {
  lista_idiomas: any;
  lista_niveles: any;
  idiomasUsuario = [];
  cont: number;
  idTd: number;
  

  constructor(private mainservice: MainServiceService) {
    this.cont = 0;
    this.lista_idiomas = this.mainservice.idiomas;
    this.lista_niveles = this.mainservice.nivelesidioma;
  }

  ngOnInit() {
    this.lista_idiomas = this.mainservice.idiomas;
    this.lista_niveles = this.mainservice.nivelesidioma;
    console.log(this.lista_idiomas);
  }

  removeElement(idioma: string){
    for (let i = 0; i < this.idiomasUsuario.length; i++){
      if(idioma == this.idiomasUsuario[i]){
        this.idiomasUsuario.splice(0, 1) ;
        var text = document.getElementById("idErrorDominio") as HTMLSelectElement;
        text.innerHTML = " ";
      }
    }
    console.log(this.idiomasUsuario);

   }

   buscarIdioma(idioma: string){
    for (let i = 0; i < this.idiomasUsuario.length; i++){
      if(idioma == this.idiomasUsuario[i]){
        var text = document.getElementById("idErrorDominio") as HTMLSelectElement;
        text.innerHTML = "El software ya fue agregado";
        return true;
      } 
    }
    return false;
   }

 deleteButton(id){
  var tableIdiomasAgregados = document.getElementById("contenedorDominios") as HTMLSelectElement;
  var tr = document.getElementById(id) as HTMLSelectElement;
  console.log(tr);
  var tdId = id.concat(id);
  var td = document.getElementById(tdId) as HTMLSelectElement;
  this.removeElement(td.innerHTML);
  tableIdiomasAgregados.removeChild(tr);


 }

  addButton(){
    
    var tableIdiomasAgregados = document.getElementById("contenedorDominios") as HTMLSelectElement;
    var idioma = document.getElementById("softwareOption") as HTMLSelectElement;
    var selectedIdioma = idioma.value;
    
    if(!this.buscarIdioma(selectedIdioma) && selectedIdioma != ""){
      var text = document.getElementById("idErrorDominio") as HTMLSelectElement;
      text.innerHTML = " ";

      this.idiomasUsuario.push(selectedIdioma);
      var nivel = document.getElementById("tipoOption") as HTMLSelectElement;
      var selectedNIvel = nivel.value;

      var tr = document.createElement("tr");
      tr.setAttribute('value', selectedIdioma);
      var id = this.cont.toLocaleString();
      var tdId = id.concat(id);      
      tr.setAttribute('id', id);
      
      var td1 = document.createElement("td");
      td1.innerHTML += '<td>'+selectedIdioma+'</td>';
      td1.setAttribute('id', tdId)
      var td2 = document.createElement("td");
      td2.innerHTML += '<td>'+selectedNIvel+'</td><td>';
      var td3 = document.createElement("td");
      
      var a = document.createElement("button");
      a.setAttribute('style', 'background: transparent;border: none !important;');
      a.addEventListener("click", (e:Event) => this.deleteButton(id));
      a.innerHTML +='<img src="assets/images/basurero.png"/>';
      td3.appendChild(a); 
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tableIdiomasAgregados.appendChild(tr);
      this.cont += 1;
      this.idTd += 1;
    }
    else{
        
      }
    
 }

}
