import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerGarantiaPage } from './ver-garantia.page';

describe('VerGarantiaPage', () => {
  let component: VerGarantiaPage;
  let fixture: ComponentFixture<VerGarantiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGarantiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
