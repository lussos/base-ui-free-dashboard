import { Component } from '@angular/core';
import {
  AvatarComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  IconComponent,
  StatCardComponent,
  TimelineComponent,
  TimelineItemComponent,
} from 'Base';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatCardComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconComponent,
    AvatarComponent,
    TimelineComponent,
    TimelineItemComponent,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly chartPoints = [28, 42, 35, 58, 49, 72, 64, 81, 70, 88, 76, 95];
}
