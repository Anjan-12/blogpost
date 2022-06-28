import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HFfixComponent } from './hffix.component';

describe('HFfixComponent', () => {
  let component: HFfixComponent;
  let fixture: ComponentFixture<HFfixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HFfixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HFfixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
