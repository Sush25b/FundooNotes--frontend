import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetnoteComponent } from './getnote.component';

describe('GetnoteComponent', () => {
  let component: GetnoteComponent;
  let fixture: ComponentFixture<GetnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
