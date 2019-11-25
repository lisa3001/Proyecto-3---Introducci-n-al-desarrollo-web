import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaPersonaComponent } from './experiencia-persona.component';

describe('ExperienciaPersonaComponent', () => {
  let component: ExperienciaPersonaComponent;
  let fixture: ComponentFixture<ExperienciaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienciaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
