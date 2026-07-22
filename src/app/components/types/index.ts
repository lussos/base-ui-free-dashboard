// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

export type AlertColor = '' | 'primary' | 'success' | 'danger' | 'accent' | 'warning';
export type AlertVariant = 'soft' | 'solid' | 'outline';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'active' | 'inactive';
export type BadgeColor = 'primary' | 'danger' | 'success' | 'accent' | 'warning' | 'slate-light' | 'primary-light' | 'danger-light' | 'success-light' | 'accent-light' | 'warning-light';
export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';
export type BadgeShape = 'rectangular' | 'circle';
export type CheckboxColor = 'primary' | 'danger' | 'success' | 'accent' | 'warning';
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | string;
export type FileUploadVariant = 'input' | 'button' | 'dropzone' | 'icon';
export type FileUploadButtonColor = 'primary' | 'danger' | 'success' | 'warning' | 'accent' | '';
export type FileUploadButtonVariant = 'solid' | 'stroked';
export type ProgressColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent';
export type ProgressSize = 'sm' | 'md' | 'lg' | 'xl';

/** Semantic color for a meter-group segment (same palette as progress). */
export type MeterGroupColor = ProgressColor;

/** Size / thickness of the meter-group bar. */
export type MeterGroupSize = ProgressSize;

/** A single segment in a {@link MeterGroupComponent}. */
export interface MeterGroupItem {
  /** Display label for the legend. */
  label: string;
  /** Absolute value used to compute width share of the bar. */
  value: number;
  /** Segment color. Defaults by cycling the palette when omitted. */
  color?: MeterGroupColor;
  /** Optional `base-icon` name shown in the legend. */
  icon?: string;
}
export type QuoteVariant = 'default' | 'border-left' | 'icon-top' | 'avatar-left';
export type RadioColor = 'primary' | 'danger' | 'success' | 'accent' | 'warning';
export type SpinnerColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'inverted';
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type ToggleColor = 'primary' | 'danger' | 'success' | 'accent' | 'warning';
export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleShape = 'rounded' | 'square' | 'smooth';
export type GroupButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'transparent' | 'default';
export type GroupButtonSize = 'sm' | 'default' | 'lg' | 'xl' | 'xxl';
export type ButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'white' | 'black' | 'default' | 'transparent';
export type ButtonSize = 'sm' | 'default' | 'lg' | 'xl' | 'xxl';
export type IconButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'white' | 'black' | 'default' | 'transparent';
export type IconButtonSize = 'sm' | 'default' | 'lg' | 'xl' | 'xxl';
export type IconStrokedButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'white' | 'black' | 'default' | 'transparent';
export type IconStrokedButtonSize = 'sm' | 'default' | 'lg' | 'xl' | 'xxl';

/** Force sidenav chrome for demos/previews; `auto` follows the `lg` breakpoint.
 *  Sidenav is for in-page section navigation — use `base-app-shell` for app chrome. */
export type SidenavLayoutMode = 'auto' | 'mobile' | 'desktop';
export type LinkColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'default';
export type LinkSize = 'sm' | 'default' | 'lg' | 'xl';
export type StrokedButtonColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'white' | 'black' | 'default';
export type StrokedButtonSize = 'sm' | 'default' | 'lg' | 'xl' | 'xxl';
export type DropdownPlacement = 'start' | 'end' | 'left' | 'right' | 'top-start' | 'top-end';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'card' | 'table-row';

export type ChipColor = '' | 'primary' | 'success' | 'danger' | 'warning' | 'accent';
export type ChipSize = 'sm' | 'md' | 'lg';

export type ToastColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export type SliderColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent';

/** Selected span for `base-dual-range-slider` (start ≤ end). */
export type DualRangeValue = { start: number; end: number };

/** Panel layout for `base-splitter`. */
export type SplitterOrientation = 'horizontal' | 'vertical';

export type TableSortDirection = 'asc' | 'desc' | '';
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

// New component types
export type TimelineColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'default';
export type StatCardColor = 'primary' | 'success' | 'danger' | 'warning' | 'accent' | 'default';
export type PopoverPlacement =
  | 'top' | 'bottom' | 'left' | 'right'
  | 'top-start' | 'top-end'
  | 'bottom-start' | 'bottom-end';

/** 'auto' fits content, 'half'/'full' are viewport fractions, or pass a custom CSS height value (e.g. '420px'). */
export type BottomSheetHeight = 'auto' | 'half' | 'full' | string;

/** Corner placement for scroll-top / scroll-bottom FAB buttons. */
export type ScrollButtonPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

/** Direction actions expand from a speed-dial trigger. */
export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';

/** Corner placement for a fixed/absolute speed dial. */
export type SpeedDialPosition = ScrollButtonPosition;

export type { ScrollContainerTarget } from '../scroll-container/scroll-container';
