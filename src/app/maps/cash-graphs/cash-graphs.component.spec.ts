import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashGraphsComponent } from './cash-graphs.component';

describe('CashGraphsComponent', () => {
  let component: CashGraphsComponent;
  let fixture: ComponentFixture<CashGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
