import { Component, input } from '@angular/core';
import {
  BaseListItemDirective,
  NavListComponent,
  ScrollNavComponent,
  ScrollNavContentComponent,
  ScrollNavItemDirective,
  ScrollNavSidebarComponent,
} from 'Base';

export interface ShowcaseNavSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-showcase-page',
  imports: [
    ScrollNavComponent,
    ScrollNavSidebarComponent,
    ScrollNavContentComponent,
    ScrollNavItemDirective,
    NavListComponent,
    BaseListItemDirective,
  ],
  template: `
    <base-scroll-nav
      class="-mx-4 -mt-4 h-[calc(100dvh-5.25rem)] sm:-mx-6 sm:-mt-6 sm:h-[calc(100dvh-5.75rem)] md:-mx-8 md:-mt-8 md:h-[calc(100dvh-6.25rem)]">
      <base-scroll-nav-sidebar
        class="!border-r !border-slate-200 !bg-white/80 !py-6 dark:!border-slate-800 dark:!bg-slate-900/80">
        <p class="mb-3 px-2 text-[10px] font-medium uppercase tracking-widest text-slate-400">On this page</p>
        <base-nav-list [ariaLabel]="navLabel()">
          @for (section of sections(); track section.id) {
            <button
              type="button"
              base-list-item
              class="rounded-lg px-2 text-left"
              [base-scroll-nav-item]="section.id">
              {{ section.label }}
            </button>
          }
        </base-nav-list>
      </base-scroll-nav-sidebar>

      <base-scroll-nav-content class="!p-0">
        <div class="mx-auto w-full max-w-[1080px] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6 md:px-8 md:pb-20">
          <header class="mb-6 sm:mb-8">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ title() }}</h2>
            @if (description()) {
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ description() }}</p>
            }
          </header>

          <div class="flex flex-col gap-6 sm:gap-8">
            <ng-content />
          </div>
        </div>
      </base-scroll-nav-content>
    </base-scroll-nav>
  `,
})
export class ShowcasePage {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly sections = input.required<ShowcaseNavSection[]>();
  readonly navLabel = input('On this page');
}
