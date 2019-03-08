import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnvalidatedInvoiceComponent } from './unvalidated-invoice.component';

describe('UnvalidatedInvoiceComponent', () => {
  let component: UnvalidatedInvoiceComponent;
  let fixture: ComponentFixture<UnvalidatedInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnvalidatedInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnvalidatedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
