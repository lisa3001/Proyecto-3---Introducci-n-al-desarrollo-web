import { Component, OnInit } from '@angular/core';
import { DominioConcurso, CertificacionConcurso, IdiomaConcurso } from 'src/app/types/types.module';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-agregar-concurso-empresa',
  templateUrl: './agregar-concurso-empresa.component.html',
  styleUrls: ['./agregar-concurso-empresa.component.scss']
})
export class AgregarConcursoEmpresaComponent implements OnInit {
  selectedResponsabilidadDesc: string = "";
  selectedIdiomaAgregar: string = "Spanish";
  selectedNivelAgregar: string = "A1";
  selectedCertificacionAgregar: CertificacionConcurso = {titulo: "", obligatorio: false};
  selectedDominioAgregar: DominioConcurso = {tipo: "", nombre: "", obligatorio: false};

  constructor(private mainservice: MainServiceService) { }

  ngOnInit() {
  }

  agregarResponsabilidadAgregar() {
    if (this.selectedResponsabilidadDesc != "" && !this.mainservice.addConcurso.responsabilidades.includes(this.selectedResponsabilidadDesc)) {
      this.mainservice.addConcurso.responsabilidades.push(this.selectedResponsabilidadDesc);
    }
  }

  deleteResponsabilidadAgregar(resp: String) {
    this.mainservice.addConcurso.responsabilidades= this.mainservice.addConcurso.responsabilidades.filter(function(value, index, args) {
      return value != resp;
    })
  }

  buscarIdioma(idioma: string){
    for (let i = 0; i<this.mainservice.addConcurso.idiomas.length; i++) {
      if (this.mainservice.addConcurso.idiomas[i].nombre == idioma) {
        return true;
      }
    }
    return false;
  }

  agregarIdiomaAgregar() {
    if (this.selectedIdiomaAgregar != "" && !this.buscarIdioma(this.selectedIdiomaAgregar)) {
      this.mainservice.addConcurso.idiomas.push({nombre: this.selectedIdiomaAgregar, nivel: this.selectedNivelAgregar} as IdiomaConcurso);
    }
  }

  deleteIdiomaAgregar(idioma: IdiomaConcurso) {
    this.mainservice.addConcurso.idiomas = this.mainservice.addConcurso.idiomas.filter(function(value, index, args) {
      return value != idioma;
    })
  }

  buscarCertificacion(titulo: string){
    for (let i = 0; i<this.mainservice.addConcurso.certificaciones.length; i++) {
      if (this.mainservice.addConcurso.certificaciones[i].titulo == titulo) {
        return true;
      }
    }
    return false;
  }

  agregarCertificacionAgregar() {
    if (this.selectedCertificacionAgregar.titulo != "" && !this.buscarCertificacion(this.selectedCertificacionAgregar.titulo)) {
      this.mainservice.addConcurso.certificaciones.push(JSON.parse(JSON.stringify(this.selectedCertificacionAgregar)));
    }
  }

  deleteCertificacionAgregar(certificacion: CertificacionConcurso) {
    this.mainservice.addConcurso.certificaciones = this.mainservice.addConcurso.certificaciones.filter(function(value, index, args) {
      return value != certificacion;
    })
  }

  buscarDominio(nombre: string, tipo: string){
    for (let i = 0; i<this.mainservice.addConcurso.dominios.length; i++) {
      if (this.mainservice.addConcurso.dominios[i].nombre == nombre
        && this.mainservice.addConcurso.dominios[i].tipo == tipo) {
        return true;
      }
    }
    return false;
  }

  agregarDominioAgregar() {
    if (this.selectedDominioAgregar.nombre != "" && !this.buscarDominio(this.selectedDominioAgregar.nombre, this.selectedDominioAgregar.tipo)) {
      this.mainservice.addConcurso.dominios.push(JSON.parse(JSON.stringify(this.selectedDominioAgregar)));
    }
  }

  deleteDominioAgregar(dominio: DominioConcurso) {
    this.mainservice.addConcurso.dominios = this.mainservice.addConcurso.dominios.filter(function(value, index, args) {
      return value != dominio;
    })
  }

}
