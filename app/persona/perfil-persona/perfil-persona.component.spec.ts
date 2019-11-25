import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPersonaComponent } from './perfil-persona.component';

describe('PerfilPersonaComponent', () => {
  let component: PerfilPersonaComponent;
  let fixture: ComponentFixture<PerfilPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
