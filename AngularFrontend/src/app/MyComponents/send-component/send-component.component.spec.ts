import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendComponentComponent } from './send-component.component';

describe('SendComponentComponent', () => {
  let component: SendComponentComponent;
  let fixture: ComponentFixture<SendComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
