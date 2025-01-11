import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosAdmPage } from './pedidos-adm.page';

describe('PedidosAdmPage', () => {
  let component: PedidosAdmPage;
  let fixture: ComponentFixture<PedidosAdmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosAdmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
