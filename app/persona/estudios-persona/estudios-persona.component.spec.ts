import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosPersonaComponent } from './estudios-persona.component';

describe('EstudiosPersonaComponent', () => {
  let component: EstudiosPersonaComponent;
  let fixture: ComponentFixture<EstudiosPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiosPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiosPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
