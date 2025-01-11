import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductoPage } from './add-producto.page';

describe('AddProductoPage', () => {
  let component: AddProductoPage;
  let fixture: ComponentFixture<AddProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
