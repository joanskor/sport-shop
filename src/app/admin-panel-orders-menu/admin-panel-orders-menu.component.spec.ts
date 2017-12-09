import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelOrdersMenuComponent } from './admin-panel-orders-menu.component';

describe('AdminPanelOrdersMenuComponent', () => {
  let component: AdminPanelOrdersMenuComponent;
  let fixture: ComponentFixture<AdminPanelOrdersMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelOrdersMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelOrdersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
