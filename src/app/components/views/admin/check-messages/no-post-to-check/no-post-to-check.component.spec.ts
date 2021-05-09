import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPostToCheckComponent } from './no-post-to-check.component';

describe('NoPostToCheckComponent', () => {
  let component: NoPostToCheckComponent;
  let fixture: ComponentFixture<NoPostToCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPostToCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPostToCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
