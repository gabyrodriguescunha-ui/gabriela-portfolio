# Gabriela.exe — Portfólio Full Stack

Portfólio pessoal desenvolvido em Angular, com uma interface interativa inspirada em sistemas operacionais retrô.

O projeto apresenta minha trajetória, tecnologias, formas de contato e principais trabalhos por meio de janelas que podem ser abertas, movidas, minimizadas, maximizadas e fechadas.

## Acesse o projeto

🔗 [Visualizar portfólio online](https://portfolio-gabriela-rodrigues.netlify.app/)

## Funcionalidades

- Interface inspirada em um desktop retrô;
- Ícones para acessar as diferentes seções;
- Menu iniciar e barra de tarefas;
- Sistema de janelas interativas;
- Possibilidade de minimizar, maximizar, restaurar e fechar janelas;
- Controle de sobreposição das janelas;
- Seção de apresentação profissional;
- Exibição das tecnologias utilizadas;
- Galeria de projetos com links para demonstração e GitHub;
- Área de contato;
- Terminal visual;
- Layout responsivo para computadores e dispositivos móveis.

## Seções do portfólio

### Sobre mim

Apresentação da minha trajetória como jornalista e desenvolvedora Full Stack, reunindo comunicação, tecnologia e criação visual.

### Projetos

Galeria com alguns dos projetos que desenvolvi:

- Cultiva Gestão;
- ClickStore;
- Revela;
- Pokédex;
- Adota+;
- Sakura Trip.

### Contato

Janela inspirada no Bloco de Notas, com acesso ao meu e-mail, GitHub e LinkedIn.

### Terminal

Interface visual inspirada em terminais de sistemas operacionais.

## Tecnologias

- Angular 22;
- TypeScript;
- HTML;
- SCSS;
- Angular Material;
- Vitest;
- Git e GitHub;
- Netlify.

## Conceitos aplicados

- Componentes standalone;
- Gerenciamento de estado com Signals;
- Serviços Angular;
- Componentização da interface;
- Interfaces TypeScript;
- Layout responsivo;
- Controle dinâmico de janelas;
- Renderização condicional;
- Eventos entre componentes;
- Organização por componentes, páginas, modelos e serviços.

## Estrutura do projeto

```text
src/app/
├── components/
│   ├── desktop-icon/
│   ├── start-menu/
│   ├── taskbar/
│   ├── title-bar/
│   ├── window-container/
│   └── window-frame/
├── models/
│   ├── project.ts
│   ├── window-config.ts
│   └── window-data.ts
├── pages/
│   ├── about/
│   ├── contact/
│   ├── projects/
│   └── terminal/
├── services/
│   ├── theme.ts
│   └── window-manager.ts
├── app.config.ts
├── app.routes.ts
└── app.ts
```
## Como executar o projeto

### Pré-requisitos

Antes de começar, tenha instalado em seu computador:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Instalação

Clone o repositório:

```bash
git clone https://github.com/gabyrodriguescunha-ui/gabriela-portfolio.git
```

Entre na pasta do projeto:

```bash
cd gabriela-portfolio
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm start
```

Depois, acesse no navegador:

```text
http://localhost:4200
```

## Como executar os testes

Para executar os testes do projeto:

```bash
npm test -- --watch=false
```

## Build de produção

Para gerar os arquivos de produção:

```bash
npm run build
```

Os arquivos compilados serão armazenados na pasta `dist/`.

## Responsividade

O portfólio possui layout responsivo e foi adaptado para computadores, tablets e celulares.

Em dispositivos móveis, os ícones, textos, janelas e elementos de navegação são reorganizados para oferecer uma experiência adequada a telas menores.

## Autora

Desenvolvido por **Gabriela Rodrigues**.

- [Portfólio](https://portfolio-gabriela-rodrigues.netlify.app/)
- [GitHub](https://github.com/gabyrodriguescunha-ui)
- [LinkedIn](https://www.linkedin.com/in/gabriela-rodrigues-b7289119a/)
