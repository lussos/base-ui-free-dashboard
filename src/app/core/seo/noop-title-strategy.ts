import { Injectable } from '@angular/core';
import { TitleStrategy, type RouterStateSnapshot } from '@angular/router';

/** Titles are owned by `SeoService` (includes site suffix + meta tags). */
@Injectable()
export class NoopTitleStrategy extends TitleStrategy {
  override updateTitle(_snapshot: RouterStateSnapshot): void {
    // no-op
  }
}
