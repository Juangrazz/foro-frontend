import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMymyvComponent } from './search-mymyv.component';

describe('SearchMymyvComponent', () => {
  let component: SearchMymyvComponent;
  let fixture: ComponentFixture<SearchMymyvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMymyvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMymyvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
