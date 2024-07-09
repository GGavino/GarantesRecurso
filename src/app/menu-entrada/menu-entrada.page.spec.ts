import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuEntradaPage } from './menu-entrada.page';

describe('MenuEntradaPage', () => {
  let component: MenuEntradaPage;
  let fixture: ComponentFixture<MenuEntradaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEntradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
