import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizDisplayComponent } from './viz-display.component';

describe('VizDisplayComponent', () => {
  let component: VizDisplayComponent;
  let fixture: ComponentFixture<VizDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
