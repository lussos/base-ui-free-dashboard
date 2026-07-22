// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * Sidebar slot for `base-app-shell` — logo, primary nav (`base-nav-list`), etc.
 *
 * @example
 * <base-app-shell-sidebar class="px-4">
 *   <base-nav-list>…</base-nav-list>
 * </base-app-shell-sidebar>
 */
@Component({
  selector: 'base-app-shell-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell-sidebar.component.html',
  host: { '[class]': 'hostCls()' },
})
export class AppShellSidebarComponent {
  readonly extraClass = input('', { alias: 'class' });

  protected readonly hostCls = computed(() =>
    cn('block w-full min-w-60 h-full overflow-y-auto overflow-x-hidden px-3 sm:px-4', this.extraClass())
  );
}
