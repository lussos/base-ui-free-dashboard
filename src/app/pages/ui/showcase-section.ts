import { Component, input } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from 'Base';

@Component({
  selector: 'app-showcase-section',
  imports: [CardComponent, CardHeaderComponent, CardBodyComponent],
  template: `
    <section [attr.id]="sectionId() || null" class="scroll-mt-6 block">
      <base-card class="overflow-hidden">
        <base-card-header class="!h-auto flex-col !items-start gap-1 px-4 py-4 sm:px-6">
          <h3 class="text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-white">
            {{ title() }}
          </h3>
          @if (description()) {
            <p class="text-xs font-normal normal-case tracking-normal text-slate-500 dark:text-slate-400">
              {{ description() }}
            </p>
          }
          @if (componentName()) {
            <code
              class="mt-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {{ componentName() }}
            </code>
          }
        </base-card-header>
        <base-card-body class="space-y-4 p-4 sm:p-6">
          <ng-content />
        </base-card-body>
      </base-card>
    </section>
  `,
})
export class ShowcaseSection {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly componentName = input('');
  readonly sectionId = input('');
}
