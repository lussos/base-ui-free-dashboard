// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * Content slot for `base-sidenav` (in-page section body).
 * Not for primary app chrome — use `base-app-shell-content` instead.
 *
 * @example
 * <base-sidenav-body>
 *   Section content
 * </base-sidenav-body>
 */
@Component({
  selector: 'base-sidenav-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidenav-body.component.html',
  host: { '[class]': 'hostCls()' },
})
export class SidenavBodyComponent {
  /**
   * Extra host classes merged via `cn()`.
   *
   * @example
   * <base-sidenav-body class="bg-white dark:bg-slate-950"></base-sidenav-body>
   */
  readonly extraClass = input('', { alias: 'class' });

  protected readonly hostCls = computed(() =>
    cn('flex-1 overflow-y-auto overflow-x-auto block h-full', this.extraClass())
  );
}
