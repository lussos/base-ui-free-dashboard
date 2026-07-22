import { Component } from '@angular/core';
import {
  AvatarComponent,
  AvatarGroupComponent,
  CalendarComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CodeComponent,
  HorizontalCarouselComponent,
  PaginatorComponent,
  PPageComponent,
  QuoteComponent,
  StatCardComponent,
  TimelineComponent,
  TimelineItemComponent,
} from 'Base';
import { ShowcasePage, ShowcaseNavSection } from '../showcase-page';
import { ShowcaseSection } from '../showcase-section';

@Component({
  selector: 'app-ui-data-display',
  imports: [
    ShowcasePage,
    ShowcaseSection,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    StatCardComponent,
    TimelineComponent,
    TimelineItemComponent,
    AvatarComponent,
    AvatarGroupComponent,
    QuoteComponent,
    CalendarComponent,
    HorizontalCarouselComponent,
    CodeComponent,
    PaginatorComponent,
    PPageComponent,
  ],
  templateUrl: './data-display.html',
})
export class UiDataDisplay {
  protected readonly team = [
    { initials: 'SM', name: 'Sarah' },
    { initials: 'JC', name: 'James' },
    { initials: 'PP', name: 'Priya' },
    { initials: 'NK', name: 'Noah' },
    { initials: 'ER', name: 'Elena' },
  ];

  protected readonly carouselItems = [
    { title: 'Analytics', color: 'bg-blue-500' },
    { title: 'Billing', color: 'bg-emerald-500' },
    { title: 'Team', color: 'bg-violet-500' },
    { title: 'Reports', color: 'bg-amber-500' },
    { title: 'Security', color: 'bg-rose-500' },
    { title: 'Inbox', color: 'bg-cyan-500' },
    { title: 'Settings', color: 'bg-indigo-500' },
    { title: 'Support', color: 'bg-pink-500' },
  ];

  protected readonly sampleCode = `const greeting = 'Hello Base UI';
export function greet() {
  return greeting;
}`;

  protected readonly sections: ShowcaseNavSection[] = [
    { id: 'stat-cards', label: 'Stat cards' },
    { id: 'cards', label: 'Cards' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'carousel', label: 'Carousel' },
    { id: 'code', label: 'Code' },
    { id: 'paginator', label: 'Paginator' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'avatar-group', label: 'Avatar group' },
    { id: 'quote', label: 'Quote' },
  ];
}
