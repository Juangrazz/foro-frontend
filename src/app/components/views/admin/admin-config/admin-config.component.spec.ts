import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminComponent } from './admin-config.component';

describe('CreateAdminComponent', () => {
  let component: CreateAdminComponent;
  let fixture: ComponentFixture<CreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
