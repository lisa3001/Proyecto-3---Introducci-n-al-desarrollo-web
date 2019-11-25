import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConcursoEmpresaComponent } from './ver-concurso-empresa.component';

describe('VerConcursoEmpresaComponent', () => {
  let component: VerConcursoEmpresaComponent;
  let fixture: ComponentFixture<VerConcursoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConcursoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConcursoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
