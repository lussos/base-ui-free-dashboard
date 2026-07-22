// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Component, OnInit, OnDestroy, OnChanges, computed, input, output ,
  ChangeDetectionStrategy, signal, booleanAttribute } from '@angular/core';

import { cn } from '../tw-merge/tw-merge';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

/**
 * A countdown timer counting down to a target date.
 *
 * @example
 * <base-countdown [targetDate]="launchDate" (finished)="onLaunch()"></base-countdown>
 */
@Component({
  selector: 'base-countdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './countdown.component.html',
  host: { '[class]': 'hostCls()' }
})
export class CountdownComponent implements OnInit, OnChanges, OnDestroy {
  readonly extraClass    = input('', { alias: 'class' });
  readonly targetDate    = input.required<Date | string>();
  readonly showDays = input(true, { transform: booleanAttribute });
  readonly daysLabel     = input('Days');
  readonly hoursLabel    = input('Hours');
  readonly minutesLabel  = input('Min');
  readonly secondsLabel  = input('Sec');

  readonly tick     = output<CountdownTime>();
  readonly finished = output<void>();

  protected readonly hostCls = computed(() => cn('flex gap-2', this.extraClass()));

  readonly time = signal<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  readonly done = signal(false);

  private interval?: ReturnType<typeof setInterval>;

  ngOnInit()    { this.start(); }
  ngOnChanges() { this.start(); }

  private start() {
    clearInterval(this.interval);
    this.done.set(false);
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  private update() {
    const total = Math.max(0, new Date(this.targetDate()).getTime() - Date.now());
    const newTime = {
      days:    Math.floor(total / 86_400_000),
      hours:   Math.floor((total / 3_600_000) % 24),
      minutes: Math.floor((total / 60_000) % 60),
      seconds: Math.floor((total / 1_000) % 60),
      total
    };
    this.time.set(newTime);
    this.tick.emit(newTime);
    if (total === 0 && !this.done()) {
      this.done.set(true);
      this.finished.emit();
      clearInterval(this.interval);
    }
  }

  pad(n: number): string { return String(n).padStart(2, '0'); }

  ngOnDestroy() { clearInterval(this.interval); }
}
