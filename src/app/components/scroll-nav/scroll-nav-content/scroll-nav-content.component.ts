// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';
import { cn } from '../../tw-merge/tw-merge';

/**
 * The scrollable content area for `base-scroll-nav`.
 *
 * @example
 * <base-scroll-nav-content>
 *   <section id="section-1">Content</section>
 * </base-scroll-nav-content>
 */
@Component({
  selector: 'base-scroll-nav-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-nav-content.component.html',
  host: { '[class]': 'hostCls()' }
})
export class ScrollNavContentComponent {
  readonly extraClass = input('', { alias: 'class' });
  protected readonly hostCls = computed(() =>
    cn('overflow-y-auto p-4 h-full w-full flex-1', this.extraClass())
  );
}
