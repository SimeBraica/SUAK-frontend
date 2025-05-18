import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLinesComponent } from './bus-lines.component';

describe('BusLinesComponent', () => {
  let component: BusLinesComponent;
  let fixture: ComponentFixture<BusLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
