import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcursosEmpresaComponent } from './concursos-empresa.component';

describe('ConcursosEmpresaComponent', () => {
  let component: ConcursosEmpresaComponent;
  let fixture: ComponentFixture<ConcursosEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcursosEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcursosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
