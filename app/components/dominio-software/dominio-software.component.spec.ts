import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DominioSoftwareComponent } from './dominio-software.component';

describe('DominioSoftwareComponent', () => {
  let component: DominioSoftwareComponent;
  let fixture: ComponentFixture<DominioSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DominioSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DominioSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
