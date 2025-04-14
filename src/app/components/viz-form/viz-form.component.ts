import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viz-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './viz-form.component.html',
  styleUrl: './viz-form.component.scss'
})
export class VizFormComponent {
  code: string = '';
  lang: 'python' | 'r' = 'python';

  @Output() submit = new EventEmitter<{code: string, lang: 'python' | 'r'}>();
}
