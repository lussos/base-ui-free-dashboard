// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Component, computed, input ,
  ChangeDetectionStrategy
} from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { cn } from '../tw-merge/tw-merge';
import { StatCardColor } from '../types';

/**
 * A dashboard metric card displaying a large value, label, optional trend, and icon.
 *
 * @example
 * <base-stat-card label="Revenue" value="$48,295" trend="+12.5%" [trendUp]="true" icon="dollar-sign" color="primary">
 * </base-stat-card>
 */
@Component({
  selector: 'base-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './stat-card.component.html',
  host: { '[class]': 'hostCls()' } })
export class StatCardComponent {
  readonly extraClass = input('', { alias: 'class' });
  readonly value   = input('');
  readonly label   = input('');
  readonly trend   = input<string | undefined>();
  readonly trendUp = input<boolean | undefined>();
  readonly icon    = input<string | undefined>();
  readonly color   = input<StatCardColor>('primary');
  readonly caption = input<string | undefined>();

  protected readonly hostCls = computed(() => cn('block', this.extraClass()));

  readonly iconBgClasses = computed(() => {
    const map: Record<StatCardColor, string> = {
      primary: 'bg-blue-50 dark:bg-blue-900/30',
      success: 'bg-green-50 dark:bg-green-900/30',
      danger:  'bg-red-50 dark:bg-red-900/30',
      warning: 'bg-orange-50 dark:bg-orange-900/30',
      accent:  'bg-purple-50 dark:bg-purple-900/30',
      default: 'bg-slate-100 dark:bg-slate-700' };
    return map[this.color()] ?? map.default;
  });

  readonly iconStrokeClasses = computed(() => {
    const map: Record<StatCardColor, string> = {
      primary: 'stroke-blue-500',
      success: 'stroke-green-500',
      danger:  'stroke-red-500',
      warning: 'stroke-orange-500',
      accent:  'stroke-purple-500',
      default: 'stroke-slate-500' };
    return map[this.color()] ?? map.default;
  });
}
