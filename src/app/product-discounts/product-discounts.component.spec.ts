import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiscountsComponent } from './product-discounts.component';

describe('ProductDiscountsComponent', () => {
  let component: ProductDiscountsComponent;
  let fixture: ComponentFixture<ProductDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
