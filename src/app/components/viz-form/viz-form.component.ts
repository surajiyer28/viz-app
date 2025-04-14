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

//   private sampleMatplotlibCode = `import matplotlib.pyplot as plt
// import numpy as np

// # Generate some data
// x = np.linspace(0, 10, 100)
// y = np.sin(x)

// # Create a simple line plot
// plt.figure(figsize=(10, 6))
// plt.plot(x, y, 'b-', linewidth=2)
// plt.title('Sine Wave')
// plt.xlabel('X axis')
// plt.ylabel('Y axis')
// plt.grid(True)
// `;

//   loadSampleCode(): void {
//     this.code = this.sampleMatplotlibCode;
//   }
  
  submitCode(): void {
    
    if (this.code.trim()) {
      this.submit.emit({
        code: this.code,
        lang: this.lang
      });
    }
    console.log(this.submit)
  }
}
