import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuRegistoPage } from './menu-registo.page';

describe('MenuRegistoPage', () => {
  let component: MenuRegistoPage;
  let fixture: ComponentFixture<MenuRegistoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRegistoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
