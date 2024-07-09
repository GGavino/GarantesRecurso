import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacoeslistaPage } from './notificacoeslista.page';

describe('NotificacoeslistaPage', () => {
  let component: NotificacoeslistaPage;
  let fixture: ComponentFixture<NotificacoeslistaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacoeslistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
