import { Component, HostListener, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WindowData } from '../../models/window-data';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-window-frame',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div
      class="window-frame"
      [class.maximized]="windowData().isMaximized"
      [class.mobile]="themeService.isMobile()"
      [class.window-about]="windowData().id === 'about'"
      [class.window-projects]="windowData().id === 'projects'"
      [class.window-terminal]="windowData().id === 'terminal'"
      [class.window-contact]="windowData().id === 'contact'"
      [style.zIndex]="windowData().zIndex"
      [style.translate]="dragTranslation"
      (mousedown)="activate.emit(windowData().id)"
    >
      <div class="title-bar" (pointerdown)="startDrag($event)">
        <div class="title-bar-left">
          <span class="window-title">{{ windowData().title }}</span>
        </div>
        <div class="title-bar-controls">
          <button mat-icon-button (pointerdown)="$event.stopPropagation()" (click)="minimize.emit(windowData().id)">
            <mat-icon>remove</mat-icon>
          </button>
          <button mat-icon-button (pointerdown)="$event.stopPropagation()" (click)="maximize.emit(windowData().id)">
            <mat-icon>{{ windowData().isMaximized ? 'filter_none' : 'crop_square' }}</mat-icon>
          </button>
          <button mat-icon-button class="close-btn" (pointerdown)="$event.stopPropagation()" (click)="close.emit(windowData().id)">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>
      <div class="window-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .window-frame {
        position: absolute;
        top: 46px;
        left: 115px;
        right: 30px;
        bottom: 70px;
        width: auto;
        max-height: none;
        transform: none;
        background: var(--cor-janela);
        border-top: 2px solid var(--cor-branco);
        border-left: 2px solid var(--cor-branco);
        border-right: 2px solid var(--cor-rosa-escuro);
        border-bottom: 2px solid var(--cor-rosa-escuro);
        border-radius: 0;
        box-shadow: 4px 4px 0 rgb(70 10 55 / 55%);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-width: 300px;
        min-height: 200px;
      }

      .window-frame.maximized {
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        width: auto;
        max-height: none;
        transform: none;
        border-radius: 0;
      }

      .window-frame.mobile {
        top: 0;
        left: 0;
        right: 0;
        bottom: 60px;
        border-radius: 0;
        width: auto;
        max-height: none;
        transform: none;
      }

      .title-bar {
        background: var(--cor-rosa-principal);
        padding: 3px 5px 3px 9px;
        min-height: 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        user-select: none;
        touch-action: none;
      }

      .title-bar-left {
        display: flex;
        align-items: center;
        gap: 7px;
        color: white;
        font-family: var(--fonte-texto);
        font-weight: bold;
      }

      .title-bar mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .title-bar-controls {
        display: flex;
        gap: 5px;
      }

      .title-bar-controls button {
        width: 26px;
        height: 26px;
        line-height: 26px;
        padding: 0;
        background: var(--cor-cinza);
        color: var(--cor-rosa-escuro);
        border-top: 2px solid var(--cor-branco);
        border-left: 2px solid var(--cor-branco);
        border-right: 2px solid var(--cor-cinza-escuro);
        border-bottom: 2px solid var(--cor-cinza-escuro);
        border-radius: 0;
      }

      .title-bar-controls button:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .close-btn:hover {
        background: #ff6b6b !important;
      }

      .window-content {
        flex: 1;
        overflow: auto;
        background: var(--cor-conteudo);
        padding: 14px;
        border-top: 2px solid var(--cor-cinza-escuro);
      }

      .window-about .window-content,
      .window-contact .window-content,
      .window-terminal .window-content,
      .window-projects .window-content {
        padding: 0;
      }

      .window-terminal .window-content { background: var(--cor-roxo-escuro); }

      @media (max-width: 768px) {
        .window-frame {
          top: 112px;
          left: 10px;
          right: 10px;
          bottom: 64px;
          width: auto;
          min-width: 0;
          max-height: none;
          transform: none;
        }

        .window-content {
          padding: 10px;
        }
      }

      @media (max-width: 899px) {
        .title-bar { cursor: default; touch-action: auto; }
      }
    `,
  ],
})
export class WindowFrameComponent implements OnInit {
  windowData = input.required<WindowData>();
  close = output<string>();
  minimize = output<string>();
  maximize = output<string>();
  activate = output<string>();

  private dragging = false;
  private pointerX = 0;
  private pointerY = 0;
  private positionX = 0;
  private positionY = 0;
  private frame?: HTMLElement;

  get dragTranslation(): string {
    if (this.windowData().isMaximized || this.themeService.isMobile()) {
      return '0 0';
    }
    return `${this.positionX}px ${this.positionY}px`;
  }

  constructor(public readonly themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.checkScreenSize();
  }

  startDrag(event: PointerEvent): void {
    if (window.innerWidth < 900 || event.button !== 0 || this.windowData().isMaximized) {
      return;
    }

    this.dragging = true;
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
    this.frame = (event.currentTarget as HTMLElement).closest('.window-frame') as HTMLElement;
    this.activate.emit(this.windowData().id);
    event.preventDefault();
  }

  @HostListener('document:pointermove', ['$event'])
  moveWindow(event: PointerEvent): void {
    if (!this.dragging || !this.frame) return;

    const rect = this.frame.getBoundingClientRect();
    let deltaX = event.clientX - this.pointerX;
    let deltaY = event.clientY - this.pointerY;
    const taskbarHeight = 54;

    deltaX = Math.max(-rect.left, Math.min(deltaX, window.innerWidth - rect.right));
    deltaY = Math.max(-rect.top, Math.min(deltaY, window.innerHeight - taskbarHeight - rect.bottom));

    this.positionX += deltaX;
    this.positionY += deltaY;
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
  }

  @HostListener('document:pointerup')
  stopDrag(): void {
    this.dragging = false;
    this.frame = undefined;
  }
}
