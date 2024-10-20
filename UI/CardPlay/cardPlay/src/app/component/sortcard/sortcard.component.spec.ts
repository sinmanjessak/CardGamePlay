import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortcardComponent } from './sortcard.component';

describe('SortcardComponent', () => {
  let component: SortcardComponent;
  let fixture: ComponentFixture<SortcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortcardComponent]
    });
    fixture = TestBed.createComponent(SortcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
