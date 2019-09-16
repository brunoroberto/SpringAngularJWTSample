import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPasswordFieldComponent } from './match-password-field.component';

describe('MatchPasswordFieldComponent', () => {
  let component: MatchPasswordFieldComponent;
  let fixture: ComponentFixture<MatchPasswordFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPasswordFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
