// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * A sidebar navigation panel for `base-scroll-nav`.
 *
 * @example
 * <base-scroll-nav-sidebar>
 *   <a base-list-item>Section 1</a>
 * </base-scroll-nav-sidebar>
 */
@Component({
  selector: 'base-scroll-nav-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-nav-sidebar.component.html',
  host: { '[class]': 'hostCls()' }
})
export class ScrollNavSidebarComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn(
      'hidden lg:block w-[240px] min-w-[240px] max-w-[240px] sticky top-0 max-h-full overflow-y-auto overflow-x-hidden border-r border-transparent p-4',
      this.extraClass()
    )
  );
}
