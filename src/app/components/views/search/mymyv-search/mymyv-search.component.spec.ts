import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymyvSearchComponent } from './mymyv-search.component';

describe('MymyvSearchComponent', () => {
  let component: MymyvSearchComponent;
  let fixture: ComponentFixture<MymyvSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymyvSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MymyvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
