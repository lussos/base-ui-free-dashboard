// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  contentChild,
  contentChildren,
  inject,
  input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollNavItemDirective } from './scroll-nav-item.directive';
import { ScrollNavContentComponent } from './scroll-nav-content/scroll-nav-content.component';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cn } from '../tw-merge/tw-merge';

/** Offset from the top of the content pane used to pick the active section. */
const ACTIVATION_OFFSET_PX = 48;

/**
 * A layout component that synchronizes sidebar navigation with scrollable content.
 *
 * @example
 * <base-scroll-nav>
 *   <base-scroll-nav-sidebar>...</base-scroll-nav-sidebar>
 *   <base-scroll-nav-content>...</base-scroll-nav-content>
 * </base-scroll-nav>
 */
@Component({
  selector: 'base-scroll-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './scroll-nav.component.html',
  host: { '[class]': 'hostCls()' }
})
export class ScrollNavComponent implements AfterViewInit, OnDestroy {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('w-full h-full overflow-hidden relative flex', this.extraClass())
  );

  readonly container = contentChild(ScrollNavContentComponent, { read: ElementRef });
  readonly items = contentChildren(ScrollNavItemDirective, { descendants: true });

  public readonly percentage = signal(0);
  private itemsDestroy$ = new Subject<void>();
  private selectedItem?: ScrollNavItemDirective;
  private boundScrollElements = new WeakSet<HTMLElement>();
  private windowResizeBound = false;
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initialize();
    requestAnimationFrame(() => this.initialize());
  }

  private initialize() {
    this.setupItemListeners();
    this.bindScrollListeners();
    this.updateActiveItem();
  }

  private setupItemListeners() {
    this.itemsDestroy$.next();
    this.itemsDestroy$.complete();
    this.itemsDestroy$ = new Subject<void>();
    this.items().forEach(item => {
      outputToObservable(item.clicked)
        .pipe(takeUntil(this.itemsDestroy$))
        .subscribe(() => this.scrollTo(item.elementId()));
    });
  }

  private bindScrollListeners() {
    const containerEl = this.container()?.nativeElement as HTMLElement | undefined;
    if (!containerEl) return;

    for (const el of this.resolveScrollElements(containerEl)) {
      if (this.boundScrollElements.has(el)) continue;
      this.boundScrollElements.add(el);
      fromEvent(el, 'scroll')
        .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(10))
        .subscribe(() => this.updateActiveItem());
    }

    if (!this.windowResizeBound) {
      this.windowResizeBound = true;
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(50))
        .subscribe(() => {
          this.bindScrollListeners();
          this.updateActiveItem();
        });
    }
  }

  ngOnDestroy() {
    this.itemsDestroy$.next();
    this.itemsDestroy$.complete();
  }

  /** Content pane plus scrollable ancestors (inner → outer). */
  private resolveScrollElements(containerEl: HTMLElement): HTMLElement[] {
    const elements: HTMLElement[] = [];

    if (containerEl.scrollHeight > containerEl.clientHeight + 1) {
      elements.push(containerEl);
    }

    let node: HTMLElement | null = containerEl.parentElement;
    while (node && node !== document.documentElement) {
      const { overflowY } = getComputedStyle(node);
      if (
        (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
        node.scrollHeight > node.clientHeight + 1
      ) {
        elements.push(node);
      }
      node = node.parentElement;
    }

    if (elements.length === 0) {
      elements.push(containerEl);
    }

    return elements;
  }

  private getPrimaryScrollElement(containerEl: HTMLElement): HTMLElement {
    const scrollables = this.resolveScrollElements(containerEl);
    const scrolling = scrollables.filter(el => el.scrollTop > 0);
    if (scrolling.length > 0) {
      return scrolling[0];
    }
    return scrollables.length > 1 ? scrollables[scrollables.length - 1] : scrollables[0];
  }

  private getSectionElement(containerEl: HTMLElement, id: string): HTMLElement | null {
    if (!id) return null;
    return containerEl.querySelector(`#${CSS.escape(id)}`);
  }

  private updateActiveItem() {
    const containerEl = this.container()?.nativeElement as HTMLElement | undefined;
    const navItems = this.items();
    if (!containerEl || navItems.length === 0) return;

    const scrollEl = this.getPrimaryScrollElement(containerEl);
    const { scrollTop, scrollHeight, clientHeight } = scrollEl;
    const scrollable = scrollHeight - clientHeight > 1;
    this.percentage.set(scrollable ? scrollTop / (scrollHeight - clientHeight) : 0);

    const activationY = containerEl.getBoundingClientRect().top + ACTIVATION_OFFSET_PX;
    let activeItem: ScrollNavItemDirective | undefined;

    if (scrollable && scrollTop + clientHeight >= scrollHeight - 2) {
      activeItem = navItems.at(-1);
    } else {
      for (const item of navItems) {
        const element = this.getSectionElement(containerEl, item.elementId());
        if (!element) continue;
        if (element.getBoundingClientRect().top <= activationY) {
          activeItem = item;
        }
      }
      if (!activeItem) {
        activeItem = navItems[0];
      }
    }

    this.setActiveItem(activeItem);
  }

  private setActiveItem(activeItem: ScrollNavItemDirective | undefined) {
    if (!activeItem) return;
    if (this.selectedItem === activeItem) {
      if (!activeItem.isActive()) {
        activeItem.isActive.set(true);
      }
      return;
    }
    this.selectedItem?.isActive.set(false);
    this.selectedItem = activeItem;
    activeItem.isActive.set(true);
  }

  private scrollTo(id: string) {
    const containerEl = this.container()?.nativeElement as HTMLElement | undefined;
    const el = containerEl ? this.getSectionElement(containerEl, id) : null;
    if (!containerEl || !el) return;

    const scrollEl = this.getPrimaryScrollElement(containerEl);
    const top =
      el.getBoundingClientRect().top -
      scrollEl.getBoundingClientRect().top +
      scrollEl.scrollTop -
      12;

    scrollEl.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    const syncActive = () => this.updateActiveItem();
    scrollEl.addEventListener('scroll', syncActive, { passive: true });
    window.setTimeout(() => {
      scrollEl.removeEventListener('scroll', syncActive);
      syncActive();
    }, 800);
  }
}
