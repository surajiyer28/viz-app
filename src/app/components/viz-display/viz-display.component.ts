import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viz-display',
  imports: [CommonModule],
  templateUrl: './viz-display.component.html',
  styleUrl: './viz-display.component.scss'
})
export class VizDisplayComponent {
  @Input() visualizationPath: string | null = null;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
}
