import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-ver-concurso-empresa',
  templateUrl: './ver-concurso-empresa.component.html',
  styleUrls: ['./ver-concurso-empresa.component.scss']
})
export class VerConcursoEmpresaComponent implements OnInit {

  constructor(private mainservice: MainServiceService) { }

  ngOnInit() {
  }

}
