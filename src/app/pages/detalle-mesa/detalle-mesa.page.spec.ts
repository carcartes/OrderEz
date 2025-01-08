import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMesaPage } from './detalle-mesa.page';

describe('DetalleMesaPage', () => {
  let component: DetalleMesaPage;
  let fixture: ComponentFixture<DetalleMesaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
