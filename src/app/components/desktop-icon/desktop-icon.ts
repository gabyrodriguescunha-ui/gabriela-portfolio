import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-desktop-icon',
  standalone: true,
  imports: [],
  template: `
    <div class="desktop-icon" (click)="click.emit()">
      <img class="icon-image" [src]="icon()" [alt]="title()" />
      <span class="icon-label">{{ title() }}</span>
    </div>
  `,
  styles: [
    `
      .desktop-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 5px;
        border: 0;
        cursor: pointer;
        transition: all 0.2s;
        width: 90px;
      }

      .desktop-icon:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      .icon-image { width: 56px; height: 56px; object-fit: contain; }

      .icon-label {
  color: white;
  font-family: var(--fonte-menu-sistema);
  font-size: 13px;
  font-weight: 600;
  line-height: 17px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  word-break: normal;
  background: rgb(18 11 61 / 55%);
  padding: 2px 5px;
}

      @media (max-width: 768px) {
  .desktop-icon {
    width: 90px;
    padding: 8px 4px;
  }

  .icon-image {
    width: 44px;
    height: 44px;
  }

  .icon-label {
    font-size: 11px;
    line-height: 14px;
    white-space: nowrap;
    word-break: normal;
  }
}
    `,
  ],
})
export class DesktopIconComponent {
  title = input.required<string>();
  icon = input.required<string>();
  click = output<void>();
}
