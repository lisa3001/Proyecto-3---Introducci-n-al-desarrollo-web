import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerconcursosPersonaComponent } from './verconcursos-persona.component';

describe('VerconcursosPersonaComponent', () => {
  let component: VerconcursosPersonaComponent;
  let fixture: ComponentFixture<VerconcursosPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerconcursosPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerconcursosPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
