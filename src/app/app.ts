import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskbarComponent } from './components/taskbar/taskbar';
import { StartMenuComponent } from './components/start-menu/start-menu';
import { DesktopIconComponent } from './components/desktop-icon/desktop-icon';
import { WindowFrameComponent } from './components/window-frame/window-frame';
import { AboutComponent } from './pages/about/about';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';
import { TerminalComponent } from './pages/terminal/terminal';
import { WindowManagerService } from './services/window-manager';
import { ThemeService } from './services/theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskbarComponent,
    StartMenuComponent,
    DesktopIconComponent,
    WindowFrameComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    TerminalComponent,
    CommonModule,
  ],
  template: `
    <div class="desktop" [class.mobile]="themeService.isMobile()">
      <div class="desktop-copy">
        <section class="desktop-intro" aria-label="Apresentação">
          <h1>GABRIELA.EXE</h1>
          <h2>FULL STACK DEVELOPER</h2>
          <p>Olá! Bem-vindo ao meu espaço na web.<br>Explore meus projetos e um pouco sobre mim.</p>
        </section>

        <aside class="navigation-note" aria-label="Instruções de navegação">
          <span class="navigation-note__pin" aria-hidden="true"></span>
          <h3>COMO NAVEGAR</h3>
          <ul>
            <li>Clique nos ícones para abrir as janelas.</li>
            <li>Arraste as janelas pela barra rosa.</li>
            <li>Use os botões para minimizar, maximizar ou fechar.</li>
            <li>Clique na barra de tarefas para restaurar uma janela.</li>
          </ul>
        </aside>
      </div>
      <div class="desktop-icons">
        <app-desktop-icon title="Sobre mim" icon="/images/icones/sobre-mim.png" (click)="openWindow('about')" />
        <app-desktop-icon title="Projetos" icon="/images/icones/projetos.png" (click)="openWindow('projects')" />
        <app-desktop-icon title="Contato" icon="/images/icones/contato.png" (click)="openWindow('contact')" />
        <app-desktop-icon title="Terminal" icon="/images/icones/terminal.png" (click)="openWindow('terminal')" />
      </div>

      @for (window of windowManager.openWindows(); track window.id) {
        @if (!window.isMinimized) {
          <app-window-frame
            [windowData]="window"
            (close)="closeWindow($event)"
            (minimize)="minimizeWindow($event)"
            (maximize)="maximizeWindow($event)"
            (activate)="activateWindow($event)"
          >
            <ng-container [ngSwitch]="window.component">
              <app-about *ngSwitchCase="'about'" />
              <app-projects *ngSwitchCase="'projects'" />
              <app-contact *ngSwitchCase="'contact'" />
              <app-terminal *ngSwitchCase="'terminal'" />
            </ng-container>
          </app-window-frame>
        }
      }

      <app-start-menu
        [isOpen]="isStartMenuOpen"
        (close)="isStartMenuOpen = false"
        (openWindow)="openWindow($event)"
      />

      <app-taskbar
        [windows]="windowManager.openWindows()"
        (openStartMenu)="isStartMenuOpen = true"
        (activateWindow)="activateWindow($event)"
        (minimizeWindow)="minimizeWindow($event)"
        (closeWindow)="closeWindow($event)"
      />
    </div>
  `,
  styles: [
    `
      .desktop {
        min-height: 100vh;
        background: var(--cor-roxo-escuro) url('/images/background-desktop.png') center/cover no-repeat;
        position: relative;
        overflow: hidden;
        padding-bottom: var(--altura-taskbar);
      }

      .desktop.mobile {
        padding-bottom: 60px;
      }

      .desktop-icons {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 20px 15px;
        flex-wrap: wrap;
        max-height: calc(100vh - 100px);
      }

      .desktop-copy { display: contents; }

      .desktop-intro {
        position: absolute;
        left: 160px;
        top: 170px;
        width: 440px;
        color: var(--cor-branco);
        z-index: 2;
      }

      .desktop-intro h1 {
        margin: 0 0 14px;
        font-family: var(--fonte-titulo);
        font-size: clamp(28px, 3vw, 42px);
        line-height: 1.25;
        text-shadow: 3px 3px 0 var(--cor-rosa-principal);
      }

      .desktop-intro h2 {
        margin: 0 0 18px;
        font-family: var(--fonte-titulo);
        font-size: 15px;
        letter-spacing: 2px;
        color: var(--cor-rosa-principal);
      }

      .desktop-intro p {
        margin: 0;
        font-family: var(--fonte-texto);
        font-size: 19px;
        line-height: 1.3;
        text-shadow: 1px 1px 2px var(--cor-roxo-escuro);
      }

      .navigation-note {
        position: absolute;
        top: 88px;
        right: 58px;
        z-index: 2;
        width: 285px;
        padding: 30px 22px 24px;
        background: #fff3a8;
        color: #332f24;
        border: 1px solid #d9c968;
        box-shadow: 8px 10px 0 rgb(18 11 61 / 34%);
        font-family: var(--fonte-menu-sistema);
        transform: rotate(1.5deg);
      }

      .navigation-note::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        border-style: solid;
        border-width: 0 0 22px 22px;
        border-color: transparent transparent #dfcf73 transparent;
      }

      .navigation-note__pin {
        position: absolute;
        top: 9px;
        left: 50%;
        width: 13px;
        height: 13px;
        background: var(--cor-rosa-principal);
        border: 2px solid #b10968;
        border-radius: 50%;
        box-shadow: 2px 3px 0 rgb(0 0 0 / 24%);
        transform: translateX(-50%);
      }

      .navigation-note h3 {
        margin: 0 0 13px;
        font-family: var(--fonte-interface);
        font-size: 22px;
        letter-spacing: 1px;
        text-align: center;
      }

      .navigation-note ul {
        margin: 0;
        padding-left: 18px;
        font-size: 13px;
        line-height: 1.45;
      }

      .navigation-note li + li { margin-top: 8px; }

      @media (max-width: 768px) {
        .desktop {
          min-height: 100dvh;
          overflow-y: auto;
          background-position: center top;
        }
        .desktop-icons {
          position: relative;
          z-index: 3;
          width: 112px;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;
          gap: 18px;
          padding: 24px 8px 100px;
          max-height: none;
        }
        .desktop-copy {
          position: absolute;
          top: 145px;
          left: 31%;
          width: 64%;
          margin: 0;
          display: block;
          z-index: 2;
        }
        .desktop-intro {
          position: static;
          width: 100%;
          text-align: left;
        }
        .desktop-intro h1 { font-size: clamp(22px, 8vw, 38px); }
        .desktop-intro h2 { font-size: clamp(10px, 3.4vw, 15px); line-height: 1.45; }
        .desktop-intro p { font-size: clamp(14px, 4.2vw, 19px); line-height: 1.55; }
        .navigation-note {
          position: relative;
          inset: auto;
          width: 100%;
          margin-top: 28px;
          padding: 27px 15px 19px;
          box-shadow: 5px 7px 0 rgb(18 11 61 / 34%);
          transform: rotate(0.7deg);
        }
        .navigation-note h3 { font-size: 19px; }
        .navigation-note ul { padding-left: 16px; font-size: 12px; }
      }

      @media (max-width: 420px) {
        .desktop-icons { width: 100px; gap: 13px; }
        .desktop-copy { left: 30%; width: 67%; top: 132px; }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  isStartMenuOpen = false;

  constructor(
    public readonly windowManager: WindowManagerService,
    public readonly themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.themeService.checkScreenSize();
    window.addEventListener('resize', () => this.themeService.checkScreenSize());

  }

  openWindow(windowType: string) {
    this.isStartMenuOpen = false;

    const windows: Record<string, any> = {
      about: { id: 'about', title: 'Sobre mim', icon: 'person', component: 'about' },
      projects: { id: 'projects', title: 'Meus Projetos', icon: 'folder', component: 'projects' },
      contact: { id: 'contact', title: 'Contato.txt', icon: 'email', component: 'contact' },
      terminal: { id: 'terminal', title: 'Terminal', icon: 'terminal', component: 'terminal' },
    };

    if (windows[windowType]) {
      this.windowManager.openWindow(windows[windowType]);
    }
  }

  closeWindow(id: string) {
    this.windowManager.closeWindow(id);
  }

  minimizeWindow(id: string) {
    this.windowManager.minimizeWindow(id);
  }

  maximizeWindow(id: string) {
    this.windowManager.toggleMaximize(id);
  }

  activateWindow(id: string) {
    this.windowManager.restoreWindow(id);
    this.windowManager.bringToFront(id);
  }
}
