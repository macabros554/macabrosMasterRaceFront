import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesOrdenadorComponent } from './detalles-ordenador.component';

describe('DetallesOrdenadorComponent', () => {
  let component: DetallesOrdenadorComponent;
  let fixture: ComponentFixture<DetallesOrdenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesOrdenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesOrdenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
