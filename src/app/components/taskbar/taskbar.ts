import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowData } from '../../models/window-data';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="taskbar">
      <button type="button" class="start-button" (click)="openStartMenu.emit()">
        <span class="start-symbol">✦</span>
        <span class="start-label">Iniciar</span>
      </button>

      <div class="taskbar-items">
        @for (window of windows(); track window.id) {
          <button
            type="button"
            class="taskbar-item"
            [class.active]="window.isOpen && !window.isMinimized"
            (click)="onTaskbarClick(window.id)"
          >
            <img class="taskbar-icon" [src]="iconFor(window.id)" [alt]="window.title" />
            <span class="taskbar-title">{{ window.title }}</span>
          </button>
        }
      </div>

      <div class="taskbar-time">
        {{ currentTime | date: 'HH:mm' }}
      </div>
    </div>
  `,
  styles: [
    `
      .taskbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: linear-gradient(#4f83d1, #3169ba 45%, #1d4f9d);
        border-top: 2px solid #8eb5ee;
        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 10px;
        z-index: 10000;
        box-shadow: inset 0 1px #b9d3f5, 0 -2px 5px rgb(0 0 0 / 25%);
        font-family: var(--fonte-menu-sistema);
      }

      .start-button {
        background: linear-gradient(#6f9ee0, #477bc6 55%, #3264ae);
        color: white;
        border: 1px solid #214d8e;
        border-radius: 2px;
        padding: 5px 15px;
        font: italic bold 16px var(--fonte-menu-sistema);
        display: flex;
        align-items: center;
        gap: 7px;
        min-width: 120px;
        height: 40px;
        justify-content: center;
        white-space: nowrap;
      }

      .start-symbol { font-size: 22px; }
      .taskbar-icon { width: 21px; height: 21px; object-fit: contain; flex-shrink: 0; }

      .taskbar-items {
        display: flex;
        gap: 5px;
        flex: 1;
        overflow-x: auto;
      }

      .taskbar-item {
        background: linear-gradient(#6592d2, #3d70ba);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        padding: 5px 10px;
        min-width: 150px;
        max-width: 200px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
        height: 34px;
        flex-direction: row;
        justify-content: flex-start;
        font-family: var(--fonte-menu-sistema);
        font-size: 13px;
        font-weight: 400;
        line-height: 1;
        white-space: nowrap;
      }

      .taskbar-item:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .taskbar-item.active {
        background: #315d9f;
        border-color: #8eb5ee;
      }

      .taskbar-title {
        flex: 1;
        text-align: left;
        font-family: var(--fonte-menu-sistema);
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .close-btn {
        width: 20px;
        height: 20px;
        line-height: 20px;
        padding: 0;
      }

      .close-btn mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .taskbar-time {
        color: white;
        padding: 0 15px;
        font-size: 14px;
        background: rgb(36 91 166 / 55%);
        border-radius: 4px;
        font-family: var(--fonte-menu-sistema);
      }

      @media (max-width: 768px) {
        .taskbar { height: 58px; padding: 4px; gap: 4px; }
        .start-button {
          width: 78px;
          min-width: 78px;
          height: 46px;
          padding: 0 7px;
          gap: 5px;
          font-size: 13px;
        }
        .start-symbol { font-size: 17px; }
        .taskbar-item {
          min-width: 108px;
          max-width: 125px;
          height: 46px;
          padding: 5px 8px;
          justify-content: flex-start;
        }

        .taskbar-title {
          display: block;
          font-size: 12px;
        }

        .taskbar-time {
          font-size: 12px;
          padding: 0 8px;
        }
      }
    `,
  ],
})
export class TaskbarComponent {
  windows = input.required<WindowData[]>();
  openStartMenu = output<void>();
  activateWindow = output<string>();
  minimizeWindow = output<string>();
  closeWindow = output<string>();

  currentTime = new Date();

  constructor() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  onTaskbarClick(windowId: string) {
    const window = this.windows().find((w) => w.id === windowId);
    if (window) {
      if (window.isMinimized || !window.isOpen) {
        this.activateWindow.emit(windowId);
      } else {
        this.minimizeWindow.emit(windowId);
      }
    }
  }

  iconFor(windowId: string): string {
    const icons: Record<string, string> = {
      about: '/images/icones/sobre-mim.png',
      projects: '/images/icones/projetos.png',
      terminal: '/images/icones/terminal.png',
      contact: '/images/icones/contato.png',
    };
    return icons[windowId] ?? '/images/icones/terminal.png';
  }
}
