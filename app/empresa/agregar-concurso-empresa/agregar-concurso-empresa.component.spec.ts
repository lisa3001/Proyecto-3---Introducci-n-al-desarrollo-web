import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConcursoEmpresaComponent } from './agregar-concurso-empresa.component';

describe('AgregarConcursoEmpresaComponent', () => {
  let component: AgregarConcursoEmpresaComponent;
  let fixture: ComponentFixture<AgregarConcursoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarConcursoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarConcursoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
