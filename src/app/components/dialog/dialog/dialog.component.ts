// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { AfterViewInit, Component, input, contentChild ,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

/**
 * The main wrapper component for dialog/modal content.
 * Should be used inside a component that is passed to `DialogService.open()`.
 * 
 * @example
 * <base-dialog [width]="600">
 *   <base-dialog-header>Title</base-dialog-header>
 *   <base-dialog-body>Content here</base-dialog-body>
 *   <base-dialog-footer>Buttons here</base-dialog-footer>
 * </base-dialog>
 */
@Component({
  selector: 'base-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements AfterViewInit {
  /** Explicit width in pixels. If not provided, it relies on Tailwind classes or content size. */
  readonly width = input<number | undefined>();
  
  /** Explicit height in pixels. Applied dynamically to the `base-dialog-body` for scrolling. */
  readonly height = input<number | undefined>();
  
  readonly bodyComponent = contentChild(DialogBodyComponent);

  ngAfterViewInit(): void {
    if (this.bodyComponent() && this.height()) {
      setTimeout(() => {
        const bodyComponent = this.bodyComponent();
        if (bodyComponent) {
          bodyComponent.height.set(this.height());
        }
      });
    }
  }
}
