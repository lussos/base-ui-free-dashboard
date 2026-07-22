// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { IconComponent } from '../../icon/icon.component';
import { cn } from '../../tw-merge/tw-merge';

/**
 * An individual breadcrumb link within a `base-breadcrumb`.
 *
 * @example
 * <base-breadcrumb-item href="/products">Products</base-breadcrumb-item>
 */
@Component({
  selector: 'base-breadcrumb-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './breadcrumb-item.component.html',
  host: { '[class]': 'hostCls()' } })
export class BreadcrumbItemComponent {
  readonly extraClass = input('', { alias: 'class' });
  readonly icon      = input<string | undefined>();
  readonly link      = input<string | undefined>();
  readonly label     = input('');
  readonly separator = input<string | undefined>();

  protected readonly hostCls = computed(() =>
    cn(
      'inline-flex items-center gap-4 after:content-["|"] after:mx-2 last-of-type:after:content-[""] peer pointer-events-none text-sm',
      this.extraClass()
    )
  );
}
