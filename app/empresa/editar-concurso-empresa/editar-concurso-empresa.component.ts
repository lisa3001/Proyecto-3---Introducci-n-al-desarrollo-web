import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { IdiomaConcurso, CertificacionConcurso, DominioConcurso } from 'src/app/types/types.module';

@Component({
  selector: 'app-editar-concurso-empresa',
  templateUrl: './editar-concurso-empresa.component.html',
  styleUrls: ['./editar-concurso-empresa.component.scss']
})
export class EditarConcursoEmpresaComponent implements OnInit {
  selectedResponsabilidadDesc: string = "";
  selectedIdiomaEditar: string = "Spanish";
  selectedNivelEditar: string = "A1";
  selectedCertificacionEditar: CertificacionConcurso = {titulo: "", obligatorio: false};
  selectedDominioEditar: DominioConcurso = {tipo: "", nombre: "", obligatorio: false};

  constructor(private mainservice: MainServiceService) { }

  ngOnInit() {
  }

  agregarResponsabilidadEditar() {
    if (this.selectedResponsabilidadDesc != "" && !this.mainservice.editConcurso.responsabilidades.includes(this.selectedResponsabilidadDesc)) {
      this.mainservice.editConcurso.responsabilidades.push(this.selectedResponsabilidadDesc);
    }
  }

  deleteResponsabilidadEditar(resp: String) {
    this.mainservice.editConcurso.responsabilidades= this.mainservice.editConcurso.responsabilidades.filter(function(value, index, args) {
      return value != resp;
    })
  }

  buscarIdioma(idioma: string){
    for (let i = 0; i<this.mainservice.editConcurso.idiomas.length; i++) {
      if (this.mainservice.editConcurso.idiomas[i].nombre == idioma) {
        return true;
      }
    }
    return false;
  }

  agregarIdiomaEditar() {
    if (this.selectedIdiomaEditar != "" && !this.buscarIdioma(this.selectedIdiomaEditar)) {
      this.mainservice.editConcurso.idiomas.push({nombre: this.selectedIdiomaEditar, nivel: this.selectedNivelEditar} as IdiomaConcurso);
    }
  }

  deleteIdiomaEditar(idioma: IdiomaConcurso) {
    this.mainservice.editConcurso.idiomas = this.mainservice.editConcurso.idiomas.filter(function(value, index, args) {
      return value != idioma;
    })
  }

  buscarCertificacion(titulo: string){
    for (let i = 0; i<this.mainservice.editConcurso.certificaciones.length; i++) {
      if (this.mainservice.editConcurso.certificaciones[i].titulo == titulo) {
        return true;
      }
    }
    return false;
  }

  agregarCertificacionEditar() {
    if (this.selectedCertificacionEditar.titulo != "" && !this.buscarCertificacion(this.selectedCertificacionEditar.titulo)) {
      this.mainservice.editConcurso.certificaciones.push(JSON.parse(JSON.stringify(this.selectedCertificacionEditar)));
    }
  }

  deleteCertificacionEditar(certificacion: CertificacionConcurso) {
    this.mainservice.editConcurso.certificaciones = this.mainservice.editConcurso.certificaciones.filter(function(value, index, args) {
      return value != certificacion;
    })
  }

  buscarDominio(nombre: string, tipo: string){
    for (let i = 0; i<this.mainservice.editConcurso.dominios.length; i++) {
      if (this.mainservice.editConcurso.dominios[i].nombre == nombre
        && this.mainservice.editConcurso.dominios[i].tipo == tipo) {
        return true;
      }
    }
    return false;
  }

  agregarDominioEditar() {
    if (this.selectedDominioEditar.nombre != "" && !this.buscarDominio(this.selectedDominioEditar.nombre, this.selectedDominioEditar.tipo)) {
      this.mainservice.editConcurso.dominios.push(JSON.parse(JSON.stringify(this.selectedDominioEditar)));
    }
  }

  deleteDominioEditar(dominio: DominioConcurso) {
    this.mainservice.editConcurso.dominios = this.mainservice.editConcurso.dominios.filter(function(value, index, args) {
      return value != dominio;
    })
  }
}
