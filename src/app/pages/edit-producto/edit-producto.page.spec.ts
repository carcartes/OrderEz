import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductoPage } from './edit-producto.page';

describe('EditProductoPage', () => {
  let component: EditProductoPage;
  let fixture: ComponentFixture<EditProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
