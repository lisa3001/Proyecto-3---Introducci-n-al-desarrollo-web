import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomasPersonaComponent } from './idiomas-persona.component';

describe('IdiomasPersonaComponent', () => {
  let component: IdiomasPersonaComponent;
  let fixture: ComponentFixture<IdiomasPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdiomasPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomasPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
