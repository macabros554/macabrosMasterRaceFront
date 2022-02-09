import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCompraComponent } from './datos-compra.component';

describe('DatosCompraComponent', () => {
  let component: DatosCompraComponent;
  let fixture: ComponentFixture<DatosCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
