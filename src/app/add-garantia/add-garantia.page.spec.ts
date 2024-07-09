import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddGarantiaPage } from './add-garantia.page';

describe('AddGarantiaPage', () => {
  let component: AddGarantiaPage;
  let fixture: ComponentFixture<AddGarantiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGarantiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
