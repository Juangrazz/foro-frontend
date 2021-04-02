import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectModalComponent } from './correct-modal.component';

describe('CorrectModalComponent', () => {
  let component: CorrectModalComponent;
  let fixture: ComponentFixture<CorrectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
