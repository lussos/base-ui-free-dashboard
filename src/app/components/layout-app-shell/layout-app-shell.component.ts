// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IconComponent } from '../icon/icon.component';
import { IconStrokedButtonDirective } from '../button/base-icon-stroked-button.directive';
import { SidebarService } from '../sidebar/sidebar.service';
import { cn } from '../tw-merge/tw-merge';

/**
 * Primary **application / dashboard chrome**: left sidebar, sticky top bar, and
 * scrollable content. Pair with `base-app-shell-sidebar`, `base-app-shell-topbar`,
 * and `base-app-shell-content`.
 *
 * Use this for authenticated app frames. Do **not** use `base-sidenav` for app
 * chrome — that component is for in-page section navigation only.
 *
 * Collapse state is driven by {@link SidebarService}. Nested nav, mega menus,
 * and opinionated dashboard pages belong in Base UI Pro (`mega-menu`, `tree`,
 * `layout-dashboard`).
 *
 * @example
 * <base-app-shell>
 *   <base-app-shell-sidebar>
 *     <base-nav-list>…</base-nav-list>
 *   </base-app-shell-sidebar>
 *   <base-app-shell-topbar>Title / search / avatar</base-app-shell-topbar>
 *   <base-app-shell-content>
 *     <router-outlet />
 *   </base-app-shell-content>
 * </base-app-shell>
 */
@Component({
  selector: 'base-app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, IconStrokedButtonDirective],
  templateUrl: './layout-app-shell.component.html',
  host: { '[class]': 'hostCls()' },
})
export class LayoutAppShellComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly sidebar = inject(SidebarService);

  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-app-shell class="bg-slate-50"></base-app-shell>
   */
  readonly extraClass = input('', { alias: 'class' });

  /** Tracks viewport below `lg` for overlay + drawer behavior. */
  private readonly isMobile = signal(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)').matches : false
  );

  protected readonly hostCls = computed(() =>
    cn('relative flex h-full w-full overflow-hidden', this.extraClass())
  );

  protected readonly showMobileOverlay = computed(
    () => this.isMobile() && this.sidebar.isOpen()
  );

  protected readonly sidebarClass = computed(() => {
    const open = this.sidebar.isOpen();
    return cn(
      'fixed inset-y-0 left-0 z-40 flex w-[min(18rem,88vw)] flex-col overflow-y-auto border-r border-slate-200 bg-white py-4 shadow-xl transition-transform duration-300 ease-out dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 lg:static lg:z-auto lg:w-60 lg:max-w-none lg:shadow-none lg:translate-x-0',
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      !open && 'lg:w-0 lg:min-w-0 lg:overflow-hidden lg:border-0 lg:py-0'
    );
  });

  protected readonly mainClass = computed(() =>
    cn('flex min-w-0 flex-1 flex-col overflow-hidden')
  );

  protected readonly topbarClass = computed(() =>
    cn(
      'sticky top-0 z-20 flex w-full shrink-0 items-center gap-2 border-b border-slate-200 bg-white/95 px-3 py-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:gap-3 sm:px-4 sm:py-3 md:px-6'
    )
  );

  protected readonly contentClass = computed(() =>
    cn('min-h-0 flex-1 overflow-x-hidden overflow-y-auto')
  );

  constructor() {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(max-width: 1023px)');
      const onChange = () => {
        this.isMobile.set(mq.matches);
        // Desktop: keep sidebar open by default; mobile: closed until toggled
        if (!mq.matches) {
          this.sidebar.setOpen(true);
        } else {
          this.sidebar.setOpen(false);
        }
      };
      mq.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => mq.removeEventListener('change', onChange));
      onChange();
    }

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (this.isMobile()) {
          this.sidebar.setOpen(false);
        }
      });
  }

  protected toggleSidebar(): void {
    this.sidebar.toggle();
  }

  protected closeMobile(): void {
    this.sidebar.setOpen(false);
  }
}
