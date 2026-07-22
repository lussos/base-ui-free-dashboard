// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import {
  OnInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  input,
  viewChild,
  ChangeDetectionStrategy,
  signal
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { cn } from '../tw-merge/tw-merge';
import { PopoverPlacement } from '../types';

const GAP = 8;
let popoverIdCounter = 0;

/**
 * A self-contained popover with trigger and panel slots.
 * Place the trigger inside the `[popover-trigger]` slot; place panel content as default children.
 * The panel is rendered with `position: fixed` so it always appears on top.
 *
 * @example
 * <base-popover placement="bottom-start">
 *   <button popover-trigger base-button>Open</button>
 *   <div>Panel content here</div>
 * </base-popover>
 */
@Component({
  selector: 'base-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle],
  templateUrl: './popover.component.html',
  host: { '[class]': 'hostCls()' }
})
export class PopoverComponent implements OnInit, OnDestroy {
  readonly panelId = `base-popover-panel-${++popoverIdCounter}`;

  readonly extraClass = input('', { alias: 'class' });
  readonly minWidth   = input('200px');
  readonly placement  = input<PopoverPlacement>('bottom-start');

  readonly triggerSlot = viewChild<ElementRef<HTMLElement>>('triggerSlot');
  readonly panel       = viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly hostCls = computed(() => cn('inline-block relative', this.extraClass()));

  readonly isOpen = signal(false);
  readonly panelStyle = signal<Record<string, string>>({
    position: 'fixed', visibility: 'hidden', pointerEvents: 'none',
    top: '0', left: '-9999px', zIndex: '10000'
  });

  ngOnInit() { this.applyHiddenStyle(); }

  toggle() { this.isOpen() ? this.close() : this.open(); }

  /** Allows external triggers (e.g. PopoverTriggerDirective) to override the placement before opening. */
  private _runtimePlacement?: PopoverPlacement;

  /** Toggle with an optional placement override — used by the external [base-popover-trigger] directive. */
  toggleWithPlacement(pl: PopoverPlacement) {
    this._runtimePlacement = pl;
    this.toggle();
  }

  private openTimeout?: ReturnType<typeof setTimeout>;
  private previouslyFocused: HTMLElement | null = null;

  open() {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    this.isOpen.set(true);
    this.calcPosition();
    clearTimeout(this.openTimeout);
    this.openTimeout = setTimeout(() => {
      if (!this.isOpen()) return;
      document.addEventListener('click', this.onDocClick);
      document.addEventListener('keydown', this.onKeydown);
      window.addEventListener('scroll', this.reposition, true);
      window.addEventListener('resize', this.reposition);
      this.focusFirstPanelElement();
    });
  }

  close() {
    clearTimeout(this.openTimeout);
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.applyHiddenStyle();
    document.removeEventListener('click', this.onDocClick);
    document.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('scroll', this.reposition, true);
    window.removeEventListener('resize', this.reposition);
    this.restoreFocus();
  }

  /** Moves focus into the panel when it opens, so keyboard users land on its content. */
  private focusFirstPanelElement() {
    const panel = this.panel()?.nativeElement;
    const focusable = panel?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }

  /** Restores focus to whatever had it before the panel opened (typically the trigger). */
  private restoreFocus() {
    const panel = this.panel()?.nativeElement;
    const activeElement = document.activeElement as HTMLElement | null;
    if (panel && activeElement && panel.contains(activeElement)) {
      (this.previouslyFocused ?? this.triggerSlot()?.nativeElement)?.focus();
    }
    this.previouslyFocused = null;
  }

  private applyHiddenStyle() {
    this.panelStyle.set({
      position: 'fixed', visibility: 'hidden', pointerEvents: 'none',
      top: '0', left: '-9999px', zIndex: '10000', minWidth: this.minWidth()
    });
  }

  private calcPosition() {
    const anchor = this.triggerSlot()?.nativeElement;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const panelEl = this.panel()?.nativeElement;
    const panelH = panelEl?.offsetHeight || 220;
    const panelW = panelEl?.offsetWidth  || 220;
    const pl = this._runtimePlacement ?? this.placement();
    const style: Record<string, string> = {
      position: 'fixed', visibility: 'visible', pointerEvents: 'auto',
      zIndex: '10000', minWidth: this.minWidth()
};

    // Vertical — prefer the requested side, flip to the opposite side if the
    // full panel does not fit, and clamp to the viewport as a last resort.
    const spaceBelow = vh - rect.bottom - GAP;
    const spaceAbove = rect.top - GAP;
    let top: number;

    if (pl.startsWith('top')) {
      if (spaceAbove >= panelH || spaceAbove >= spaceBelow) {
        top = rect.top - GAP - panelH;
      } else {
        top = rect.bottom + GAP;
      }
    } else if (pl === 'left' || pl === 'right') {
      top = rect.top + rect.height / 2 - panelH / 2;
    } else {
      if (spaceBelow >= panelH || spaceBelow >= spaceAbove) {
        top = rect.bottom + GAP;
      } else {
        top = rect.top - GAP - panelH;
      }
    }
    top = Math.max(GAP, Math.min(top, vh - panelH - GAP));
    style['top'] = `${top}px`;

    // Horizontal
    if (pl === 'left') {
      style['right'] = `${vw - rect.left + GAP}px`;
    } else if (pl === 'right') {
      style['left'] = `${rect.right + GAP}px`;
    } else if (pl === 'bottom-end' || pl === 'top-end') {
      style['right'] = `${Math.max(GAP, vw - rect.right)}px`;
    } else if (pl === 'bottom' || pl === 'top') {
      style['left'] = `${Math.max(GAP, Math.min(rect.left + rect.width / 2 - panelW / 2, vw - panelW - GAP))}px`;
    } else {
      style['left'] = `${Math.max(GAP, Math.min(rect.left, vw - panelW - GAP))}px`;
    }
    this.panelStyle.set(style);
  }

  private reposition = () => { if (this.isOpen()) this.calcPosition(); };

  private onDocClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (
      !this.panel()?.nativeElement.contains(target) &&
      !this.triggerSlot()?.nativeElement.contains(target)
    ) this.close();
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close();
  };

  ngOnDestroy() { this.close(); }
}
