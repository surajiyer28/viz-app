import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizFormComponent } from './viz-form.component';

describe('VizFormComponent', () => {
  let component: VizFormComponent;
  let fixture: ComponentFixture<VizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VizFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
