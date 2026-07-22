import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AvatarComponent,
  BadgeComponent,
  BaseButtonDirective,
  ButtonGroupComponent,
  ChipComponent,
  CurrentScreenSizeService,
  DividerComponent,
  GroupButtonComponent,
  IconButtonDirective,
  IconComponent,
  IconStrokedButtonDirective,
  RevealDirective,
  RippleDirective,
  StrokedButtonDirective,
} from 'Base';
import { ShowcasePage, ShowcaseNavSection } from '../showcase-page';
import { ShowcaseSection } from '../showcase-section';

@Component({
  selector: 'app-ui-primitives',
  imports: [
    FormsModule,
    ShowcasePage,
    ShowcaseSection,
    BaseButtonDirective,
    StrokedButtonDirective,
    IconButtonDirective,
    IconStrokedButtonDirective,
    ButtonGroupComponent,
    GroupButtonComponent,
    BadgeComponent,
    ChipComponent,
    AvatarComponent,
    IconComponent,
    DividerComponent,
    RippleDirective,
    RevealDirective,
  ],
  templateUrl: './primitives.html',
})
export class UiPrimitives {
  viewMode: string | number = 'list';
  protected readonly screen = inject(CurrentScreenSizeService);

  protected readonly sections: ShowcaseNavSection[] = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'button-group', label: 'Button group' },
    { id: 'badges-chips', label: 'Badges & chips' },
    { id: 'avatars', label: 'Avatars' },
    { id: 'icons-divider', label: 'Icons & divider' },
    { id: 'ripple', label: 'Ripple' },
    { id: 'reveal', label: 'Reveal' },
    { id: 'screen-size', label: 'Screen size' },
  ];
}
