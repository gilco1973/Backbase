import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackbaseRadioComponent } from './backbase-radio.component';

describe('BackbaseRadioComponent', () => {
  let component: BackbaseRadioComponent;
  let fixture: ComponentFixture<BackbaseRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackbaseRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackbaseRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
