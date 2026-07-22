// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { DropdownPanel } from '../dropdown-menu/dropdown-panel';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Subscription } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { DropdownPlacement } from '../types';

/**
 * A directive that attaches a `base-dropdown-menu` to a trigger element (like a button).
 * Automatically handles overlay positioning, backdrop clicks, and detachment.
 *
 * @example
 * <button [base-dropdown-menu-trigger]="myMenu" placement="end">Open</button>
 * <base-dropdown-menu #myMenu>
 *   <base-dropdown-menu-item>Action</base-dropdown-menu-item>
 * </base-dropdown-menu>
 */
@Directive({
  selector: '[base-dropdown-menu-trigger]',
  host: {
    '(click)': 'toggleDropdown()',
  },
})
export class DropdownMenuDirective<T> implements OnDestroy {
  private isDropdownOpen = false;
  private overlayRef?: OverlayRef;
  private closingSubscription = Subscription.EMPTY;

  /** The physical placement of the dropdown relative to the trigger. Defaults to 'end'. */
  readonly placement = input<DropdownPlacement>('end');

  /** The reference to the `base-dropdown-menu` component to open. */
  readonly dropdownPanel = input.required<DropdownPanel<T>>({
    alias: 'base-dropdown-menu-trigger',
  });

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);

  @HostBinding('attr.aria-haspopup') readonly ariaHasPopup = 'menu';

  @HostBinding('attr.aria-expanded')
  get ariaExpanded(): boolean {
    return this.isDropdownOpen;
  }

  @HostBinding('attr.aria-controls')
  get ariaControls(): string | null {
    const panel = this.dropdownPanel();
    return panel instanceof DropdownMenuComponent ? panel.menuId : null;
  }

  @HostListener('keydown', ['$event'])
  onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        if (!this.isDropdownOpen) {
          event.preventDefault();
          this.openDropdown();
        }
        break;
      case 'Escape':
        if (this.isDropdownOpen) {
          event.preventDefault();
          this.destroyDropdown(true);
        }
        break;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown(true) : this.openDropdown();
  }

  openDropdown(): void {
    const dropdownPanel = this.dropdownPanel();
    if (!dropdownPanel || this.isDropdownOpen) return;

    const positions: ConnectedPosition[] = this.getPositions();

    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'bg-transparent',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions(positions)
        .withPush(false),
    });

    const templatePortal = new TemplatePortal(
      dropdownPanel.templateRef(),
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);

    if (dropdownPanel instanceof DropdownMenuComponent) {
      dropdownPanel.focusFirstItem();
    }

    this.closingSubscription = merge(
      this.overlayRef.backdropClick(),
      this.overlayRef.detachments(),
      outputToObservable(dropdownPanel.closed)
    ).subscribe(() => this.destroyDropdown(true));
  }

  private getPositions(): ConnectedPosition[] {
    const defaultPosition: ConnectedPosition = {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 4,
    };

    const maps: Record<string, ConnectedPosition> = {
      start: { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
      end: { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
      left: { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -4 },
      right: { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 4 },
      'top-start': { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      'top-end': { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
    };

    return [maps[this.placement()] || defaultPosition];
  }

  private destroyDropdown(restoreFocus = false): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.closingSubscription.unsubscribe();
    this.isDropdownOpen = false;
    this.overlayRef.detach();

    if (restoreFocus) {
      this.elementRef.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.closingSubscription.unsubscribe();
  }
}
