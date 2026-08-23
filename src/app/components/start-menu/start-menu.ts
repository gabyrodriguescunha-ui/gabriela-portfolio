import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-start-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    @if (isOpen()) {
      <div class="start-menu-overlay" (click)="close.emit()"></div>
      <div class="start-menu">
        <div class="start-menu-header">
          <div class="user-info">
            <div class="avatar">GR</div>
            <div>
              <div class="user-name">Gabriela</div>
              <div class="user-role">Full Stack Developer</div>
            </div>
          </div>
        </div>

        <div class="start-menu-items">
          <button mat-button class="menu-item" (click)="openWindow.emit('about')">
            <mat-icon>person</mat-icon>
            <span>Sobre mim</span>
          </button>
          <button mat-button class="menu-item" (click)="openWindow.emit('projects')">
            <mat-icon>folder</mat-icon>
            <span>Projetos</span>
          </button>
          <button mat-button class="menu-item" (click)="openWindow.emit('contact')">
            <mat-icon>email</mat-icon>
            <span>Contato</span>
          </button>
          <button mat-button class="menu-item" (click)="openWindow.emit('terminal')">
            <mat-icon>terminal</mat-icon>
            <span>Terminal</span>
          </button>
        </div>

        <div class="start-menu-footer">
          <button mat-button class="logout-btn" type="button" (click)="returnToHome()">
            <mat-icon>power_settings_new</mat-icon>
            <span>Sair</span>
          </button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .start-menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
      }

      .start-menu {
        position: fixed;
        bottom: 50px;
        left: 0;
        width: 350px;
        max-height: 500px;
        background: var(--cor-janela);
        border: 2px solid var(--cor-branco);
        border-right-color: var(--cor-rosa-escuro);
        border-bottom-color: var(--cor-rosa-escuro);
        border-radius: 0;
        box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .start-menu-header {
        padding: 20px;
        background: linear-gradient(#ff69b4, #ff1493);
        border-radius: 0;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .avatar {
        width: 50px;
        height: 50px;
        background: var(--cor-branco);
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: var(--cor-rosa-escuro);
        font-size: 20px;
      }

      .user-name {
        color: white;
        font-weight: bold;
        font-size: 18px;
      }

      .user-role {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
      }

      .start-menu-items {
        padding: 10px;
        flex: 1;
        overflow-y: auto;
        background: var(--cor-conteudo);
      }

      .menu-item {
        width: 100%;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 15px;
        color: var(--cor-preto);
        border-radius: 0;
        margin-bottom: 5px;
        transition: all 0.2s;
      }

      .menu-item:hover {
        background: rgb(255 105 180 / 25%);
      }

      .menu-item mat-icon {
        color: var(--cor-rosa-principal);
      }

      .start-menu-footer {
        padding: 15px;
        border-top: 1px solid var(--cor-cinza-escuro);
      }

      .logout-btn {
        width: 100%;
        color: #ff6b6b;
      }

      @media (max-width: 768px) {
        .start-menu {
          width: 100%;
          max-height: 70vh;
          bottom: 60px;
        }
      }
    `,
  ],
})
export class StartMenuComponent {
  isOpen = input.required<boolean>();
  close = output<void>();
  openWindow = output<string>();

  returnToHome(): void {
    window.location.reload();
  }
}
