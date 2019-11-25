import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificacionesPersonaComponent } from './certificaciones-persona.component';

describe('CertificacionesPersonaComponent', () => {
  let component: CertificacionesPersonaComponent;
  let fixture: ComponentFixture<CertificacionesPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificacionesPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificacionesPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
