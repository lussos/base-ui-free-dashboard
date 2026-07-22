// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * Top bar slot for `base-app-shell` — page title, search, user menu, etc.
 * The shell already renders a mobile sidebar toggle beside this slot.
 *
 * @example
 * <base-app-shell-topbar>
 *   <h1>Dashboard</h1>
 * </base-app-shell-topbar>
 */
@Component({
  selector: 'base-app-shell-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell-topbar.component.html',
  host: { '[class]': 'hostCls()' },
})
export class AppShellTopbarComponent {
  readonly extraClass = input('', { alias: 'class' });

  protected readonly hostCls = computed(() => cn('block w-full min-w-0', this.extraClass()));
}
