import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelOrdersCompletedComponent } from './admin-panel-orders-completed.component';

describe('AdminPanelOrdersCompletedComponent', () => {
  let component: AdminPanelOrdersCompletedComponent;
  let fixture: ComponentFixture<AdminPanelOrdersCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelOrdersCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelOrdersCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
