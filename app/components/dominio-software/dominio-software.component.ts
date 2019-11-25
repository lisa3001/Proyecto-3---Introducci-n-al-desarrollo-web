import { Component, OnInit, Input } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { DominioConcurso, DominioExperiencia } from 'src/app/types/types.module';
@Component({
  selector: 'app-dominio-software',
  templateUrl: './dominio-software.component.html',
  styleUrls: ['./dominio-software.component.scss']
})

export class DominioSoftwareComponent implements OnInit {
  public dominios: DominioExperiencia[] = [];
  selectedTipo: String = "";
  selectedNombre: String = "";
  selectedTipoDelete: String = "";
  selectedNombreDelete: String = "";
  
  constructor(private mainservice: MainServiceService) {

  }

  ngOnInit() {
  }

   buscarDominio(): Boolean {
      for(let i: number = 0; i<this.dominios.length; i++) {
        if (this.dominios[i].nombredellenguaje == this.selectedNombre && this.dominios[i].tipodesoftware == this.selectedTipo) {
          return true;
        }
      }
      return false;
   }

   addButton(){
      if (!this.buscarDominio() && this.selectedTipo != "" && this.selectedNombre != "") {
        this.dominios.push({nombredellenguaje: this.selectedNombre as string, tipodesoftware: this.selectedTipo as string} as DominioExperiencia);
      } 
   }

   delete() {
     let dominios: DominioExperiencia[] = [];
    for(let i: number = 0; i<this.dominios.length; i++) {
      if (!(this.dominios[i].nombredellenguaje == this.selectedNombreDelete && this.dominios[i].tipodesoftware == this.selectedTipoDelete)) {
        dominios.push(this.dominios[i]);
      }
    }
    this.dominios = Object.assign({}, dominios);
   }
}
