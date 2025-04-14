import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VizFormComponent } from '../components/viz-form/viz-form.component';
import { VizDisplayComponent } from '../components/viz-display/viz-display.component';
import { VisualizationService } from '../services/visualization.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, VizFormComponent, VizDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loading = false;
  error: string | null = null;
  visualizationPath: string | null = null;
  
  constructor(private visualizationService: VisualizationService) {}
  
  onSubmit(eventData: any) {
    const code = eventData.code;
    const lang = eventData.lang;

    this.loading = true;
    this.error = null;
    this.visualizationPath = null;

    
    this.visualizationService.generateVisualization({code: code, lang: lang}).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.success && response.visualizationPath) {
          this.visualizationPath = response.visualizationPath;
        } else {
          this.error = response.message || 'Unknown error occurred';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Failed to generate visualization';
        console.error('Error generating visualization:', err);
      }
    });
  }

}
