import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModAdminInfoComponent } from './mod-admin-info.component';

describe('ModAdminInfoComponent', () => {
  let component: ModAdminInfoComponent;
  let fixture: ComponentFixture<ModAdminInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModAdminInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModAdminInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
