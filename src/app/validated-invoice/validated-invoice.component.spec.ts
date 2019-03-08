import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedInvoiceComponent } from './validated-invoice.component';

describe('ValidatedInvoiceComponent', () => {
  let component: ValidatedInvoiceComponent;
  let fixture: ComponentFixture<ValidatedInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatedInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
