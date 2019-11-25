import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificacionesEmpresaComponent } from './certificaciones-empresa.component';

describe('CertificacionesEmpresaComponent', () => {
  let component: CertificacionesEmpresaComponent;
  let fixture: ComponentFixture<CertificacionesEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificacionesEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificacionesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
