import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConcursoEmpresaComponent } from './editar-concurso-empresa.component';

describe('EditarConcursoEmpresaComponent', () => {
  let component: EditarConcursoEmpresaComponent;
  let fixture: ComponentFixture<EditarConcursoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarConcursoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarConcursoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
