// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Component ,
  ChangeDetectionStrategy
} from '@angular/core';

/**
 * A container component for breadcrumb navigation.
 * Usually contains multiple `base-breadcrumb-item` components.
 * 
 * @example
 * <base-breadcrumb>
 *   <base-breadcrumb-item label="Home" link="/"></base-breadcrumb-item>
 *   <base-breadcrumb-item label="Dashboard" link="/dashboard"></base-breadcrumb-item>
 * </base-breadcrumb>
 */
@Component({
  selector: 'base-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {}
