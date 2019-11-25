import { Component, OnInit, ViewChild } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Concurso, DominioConcurso, ConcursoInput } from 'src/app/types/types.module';
import { Apollo } from 'apollo-angular';
import { actualizarConcursoMutation, crearConcursoMutation, agregarResponsabilidadesPorConcursoMutation, agregarIdiomasPorConcursoMutation, agregarCertificacionesPorConcursoMutation, agregarDominiosPorConcursoMutation, eliminarConcurso } from 'src/app/queries/queries.module';

@Component({
  selector: 'app-concursos-empresa',
  templateUrl: './concursos-empresa.component.html',
  styleUrls: ['./concursos-empresa.component.scss']
})
export class ConcursosEmpresaComponent implements OnInit {
  selectedConcurso: Concurso;
  @ViewChild('changesModalB',{static: false}) changesModalB:any;
  @ViewChild('cancelarCambiosConcurso',{static: false}) cancelarCambios:any;
  @ViewChild('dismissCambiosEditConcursos', {static: false}) dismissCambiosEditConcursos: any;
  @ViewChild('dismissCambiosAgregarConcursos', {static: false}) dismissCambiosAgregarConcursos: any;
  constructor(private mainservice: MainServiceService, private apollo: Apollo) { }

  ngOnInit() {
  }

  f() {
    console.log(this.mainservice.selectedConcurso);
  }
  
  editar(concurso: Concurso) {
    this.selectedConcurso = concurso;
    this.mainservice.editConcurso = JSON.parse(JSON.stringify(concurso));
  }

  guardarCambiosEdit() {
    if(this.mainservice.editConcurso.descripcion == "" || this.mainservice.editConcurso.nombredelpuesto == "" || 
    this.mainservice.editConcurso.fechadecaducidad == "") {
      alert("Debe ingresar todos los datos.");
      return;
    }
    let index = this.mainservice.empresa.concursos.indexOf(this.selectedConcurso);
    this.mainservice.empresa.concursos[index] = JSON.parse(JSON.stringify(this.mainservice.editConcurso));
    this.apollo.mutate({
      mutation: actualizarConcursoMutation,
      variables: {
        concurso: {
          idconcurso: this.mainservice.editConcurso.idconcurso,
          empresa: this.mainservice.editConcurso.empresa,
          nombredelpuesto: this.mainservice.editConcurso.nombredelpuesto,
          fechaderegistro: this.mainservice.editConcurso.fechaderegistro,
          fechadecaducidad: this.mainservice.editConcurso.fechadecaducidad,
          descripcion: this.mainservice.editConcurso.descripcion
        }
      }
    }).subscribe(data=> {
        this.guardarRequisitos(JSON.parse(JSON.stringify(this.mainservice.editConcurso)) as Concurso);
    });

    this.dismissCambiosEditConcursos.nativeElement.click();
  }

  eliminarConcurso(concurso: Concurso) {
    this.mainservice.empresa.concursos = this.mainservice.empresa.concursos.filter(function(value, index, arg) {
      return value != concurso;
    });
    console.log(concurso);
    this.apollo.mutate({
      mutation: eliminarConcurso,
      variables: {
        idconcurso: concurso.idconcurso
      }
    }).subscribe(data => {
      console.log(data);
    })
  }

  cancelarCambiosSure() {
    this.mainservice.editConcursos = JSON.parse(JSON.stringify(this.mainservice.empresa.concursos));
    this.cancelarCambios.nativeElement.click();
  }

  agregarConcurso() {
    this.mainservice.addConcurso = 
      {idconcurso: -1, empresa: null, nombredelpuesto: null, fechaderegistro: null, fechadecaducidad: null, descripcion: null,
          certificaciones: [],
          idiomas: [],
          dominios: [],
        responsabilidades: []
    } as Concurso;
  }

  guardarCambiosAgregar() {
    if(this.mainservice.addConcurso.descripcion == "" || this.mainservice.addConcurso.nombredelpuesto == "" || 
    this.mainservice.addConcurso.fechadecaducidad == "") {
      alert("Debe ingresar todos los datos.");
      return;
    }
    this.mainservice.addConcurso.fechaderegistro = new Date().toJSON().slice(0, 10);
    this.apollo.mutate({
      mutation: crearConcursoMutation,
      variables: {
        concurso: {
          empresa: this.mainservice.empresa.nombreusuario,
          nombreempresa: this.mainservice.empresa.nombre,
          nombredelpuesto: this.mainservice.addConcurso.nombredelpuesto,
          fechaderegistro: this.mainservice.addConcurso.fechaderegistro,
          fechadecaducidad: this.mainservice.addConcurso.fechadecaducidad,
          descripcion: this.mainservice.addConcurso.descripcion
        }
      }
    }).subscribe(data=> {
      console.log(data);
      if (data.data['crearConcurso'] != -1) {
        this.mainservice.addConcurso.idconcurso = data.data['crearConcurso'];
        this.mainservice.addConcurso.empresa = this.mainservice.empresa.nombreusuario;
        this.mainservice.addConcurso.nombreempresa = this.mainservice.empresa.nombre;
        this.mainservice.empresa.concursos.push(JSON.parse(JSON.stringify(this.mainservice.addConcurso)));
        this.guardarRequisitos(JSON.parse(JSON.stringify(this.mainservice.addConcurso)) as Concurso);
      }
    });
    this.dismissCambiosAgregarConcursos.nativeElement.click();
  }

  guardarRequisitos(concurso: Concurso) {
    console.log(concurso);
    this.apollo.mutate({
      mutation: agregarResponsabilidadesPorConcursoMutation,
      variables: {
        idconcurso: concurso.idconcurso,
        responsabilidades: concurso.responsabilidades
      }
    }).subscribe(data => {
      console.log(data);
    });

    this.apollo.mutate({
      mutation: agregarIdiomasPorConcursoMutation,
      variables: {
        idconcurso: concurso.idconcurso,
        idiomas: concurso.idiomas
      }
    }).subscribe(data => {
      console.log(data);
    });

    this.apollo.mutate({
      mutation: agregarCertificacionesPorConcursoMutation,
      variables: {
        idconcurso: concurso.idconcurso,
        certificaciones: concurso.certificaciones
      }
    }).subscribe(data => {
      console.log(data);
    });

    this.apollo.mutate({
      mutation: agregarDominiosPorConcursoMutation,
      variables: {
        idconcurso: concurso.idconcurso,
        dominios: concurso.dominios
      }
    }).subscribe(data => {
      console.log(data);
    });
  }
}
