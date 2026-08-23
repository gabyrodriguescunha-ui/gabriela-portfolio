import { Injectable, signal, computed } from '@angular/core';
import { WindowData } from '../models/window-data';

@Injectable({
  providedIn: 'root',
})
export class WindowManagerService {
  private readonly windows = signal<WindowData[]>([]);
  private readonly activeWindowId = signal<string | null>(null);
  private readonly nextZIndex = signal(100);

  readonly openWindows = computed(() => this.windows());
  readonly activeWindow = computed(() => {
    const id = this.activeWindowId();
    return this.windows().find((w) => w.id === id) || null;
  });

  openWindow(window: Omit<WindowData, 'isMinimized' | 'isMaximized' | 'zIndex'>) {
    const existingWindow = this.windows().find((w) => w.id === window.id);

    if (existingWindow) {
      this.bringToFront(window.id);
      this.restoreWindow(window.id);
      return;
    }

    const newWindow: WindowData = {
      ...window,
      isMinimized: false,
      isMaximized: false,
      zIndex: this.nextZIndex(),
    };

    this.windows.update((windows) => [...windows, newWindow]);
    this.activeWindowId.set(window.id);
    this.nextZIndex.update((z) => z + 1);
  }

  closeWindow(id: string) {
    this.windows.update((windows) => windows.filter((w) => w.id !== id));
    if (this.activeWindowId() === id) {
      this.activeWindowId.set(null);
    }
  }

  minimizeWindow(id: string) {
    this.windows.update((windows) =>
      windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    );
  }

  restoreWindow(id: string) {
    this.windows.update((windows) =>
      windows.map((w) => (w.id === id ? { ...w, isMinimized: false } : w)),
    );
  }

  toggleMaximize(id: string) {
    this.windows.update((windows) =>
      windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)),
    );
  }

  bringToFront(id: string) {
    this.activeWindowId.set(id);
    this.windows.update((windows) =>
      windows.map((w) => (w.id === id ? { ...w, zIndex: this.nextZIndex() } : w)),
    );
    this.nextZIndex.update((z) => z + 1);
  }

  isWindowOpen(id: string): boolean {
    return this.windows().some((w) => w.id === id);
  }
}
