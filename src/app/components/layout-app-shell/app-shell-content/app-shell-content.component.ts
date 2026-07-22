// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * Main content slot for `base-app-shell` (typically a `router-outlet` or `base-page-main`).
 *
 * @example
 * <base-app-shell-content>
 *   <router-outlet />
 * </base-app-shell-content>
 */
@Component({
  selector: 'base-app-shell-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell-content.component.html',
  host: { '[class]': 'hostCls()' },
})
export class AppShellContentComponent {
  readonly extraClass = input('', { alias: 'class' });

  protected readonly hostCls = computed(() =>
    cn('block h-full w-full p-4 pb-10 sm:p-6 sm:pb-12 md:p-8 md:pb-14', this.extraClass())
  );
}
