import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMessagesComponent } from './check-messages.component';

describe('CheckMessagesComponent', () => {
  let component: CheckMessagesComponent;
  let fixture: ComponentFixture<CheckMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
