import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDashboardsComponent } from './users-dashboards.component';

describe('UsersDashboardsComponent', () => {
  let component: UsersDashboardsComponent;
  let fixture: ComponentFixture<UsersDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDashboardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
