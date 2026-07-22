// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/lussos/base-theme/blob/main/LICENSE.md

import { Injectable, Injector, ApplicationRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastColor, ToastPosition } from '../types';

export interface ToastConfig {
  color?: ToastColor;
  duration?: number;
  icon?: string;
  position?: ToastPosition;
}

export interface ToastItem {
  id: number;
  message: string;
  color: ToastColor;
  icon: string;
  duration: number;
  position: ToastPosition;
  removing: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private injector = inject(Injector);
  private appRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  private hostEl?: HTMLElement;
  private toastComponent?: ToastComponent;
  private nextId = 0;
  private defaultDuration = 4000;

  private ensureContainer() {
    if (this.hostEl) return;

    const hostEl = document.createElement('div');
    hostEl.setAttribute('aria-live', 'polite');
    hostEl.setAttribute('aria-relevant', 'additions removals');
    document.body.appendChild(hostEl);

    const componentRef = createComponent(ToastComponent, {
      environmentInjector: this.environmentInjector,
      hostElement: hostEl,
    });

    this.appRef.attachView(componentRef.hostView);
    this.toastComponent = componentRef.instance;
    this.hostEl = hostEl;
  }

  show(message: string, config: ToastConfig = {}): number {
    this.ensureContainer();

    const id = ++this.nextId;
    const toast: ToastItem = {
      id,
      message,
      color: config.color || 'primary',
      icon: config.icon || this.getDefaultIcon(config.color),
      duration: config.duration ?? this.defaultDuration,
      position: config.position || 'top-right',
      removing: false,
    };

    this.toastComponent!.addToast(toast);

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  dismiss(id: number) {
    if (!this.toastComponent) return;
    this.toastComponent.removeToast(id);

    setTimeout(() => {
      if (this.toastComponent) {
        this.toastComponent.cleanToast(id);
      }
    }, 300);
  }

  success(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'success', icon: 'check' });
  }

  error(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'danger', icon: 'alert-triangle' });
  }

  warning(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'warning', icon: 'alert-circle' });
  }

  info(message: string, config?: ToastConfig): number {
    return this.show(message, { ...config, color: 'primary', icon: 'info-circle' });
  }

  clearAll() {
    if (!this.toastComponent) return;
    this.toastComponent.toasts.set(
      this.toastComponent.toasts().map(t => ({ ...t, removing: true }))
    );
    setTimeout(() => {
      if (this.toastComponent) {
        this.toastComponent.toasts.set([]);
      }
    }, 300);
  }

  private getDefaultIcon(color?: ToastColor): string {
    switch (color) {
      case 'success': return 'check';
      case 'danger': return 'alert-triangle';
      case 'warning': return 'alert-circle';
      case 'primary': return 'info-circle';
      case 'accent': return 'help-circle';
      default: return 'info-circle';
    }
  }
}
