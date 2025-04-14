import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  @Input() isInteractive: boolean = false;

  private _safeUrl: SafeResourceUrl | null = null;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    // Reset the cached URL whenever the visualization path changes
    if (changes['visualizationPath']) {
      this._safeUrl = null;
    }
  }

  get safeUrl(): SafeResourceUrl | null {
    if (this.visualizationPath && this.isInteractive) {
      if (!this._safeUrl) {
        this._safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'http://localhost:5000' + this.visualizationPath
        );
      }
      return this._safeUrl;
    }
    return null;
  }
}
