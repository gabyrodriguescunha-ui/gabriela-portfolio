import { Component } from '@angular/core';

interface Projeto {
  nome: string;
  descricao: string;
  imagem: string;
  demo: string;
  github: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  projetos: Projeto[] = [
    { nome: 'CULTIVAGESTÃO', descricao: 'Sistema de gestão de horto.', imagem: 'images/projects/projeto-01.png', demo: 'https://cultiva-gestao.netlify.app/login', github: '' },
    { nome: 'CLICKSTORE', descricao: 'Ecommerce de produtos fotográficos.', imagem: 'images/projects/projeto-02.png', demo: 'https://clickstore-loja.netlify.app/', github: '' },
    { nome: 'REVELA', descricao: 'Site para festival de fotografia feminina.', imagem: 'images/projects/projeto-03.png', demo: 'https://gabyrodriguescunha-ui.github.io/EventoFotografia/', github: '' },
    { nome: 'POKEDEX', descricao: 'Aplicação com consumo de API.', imagem: '/images/projects/projeto-04.png', demo: 'https://gabyrodriguescunha-ui.github.io/PokeDex/', github: '' },
    { nome: 'ADOTA+', descricao: 'Sistema de adoção com API REST e interface em JavaFX.', imagem: '/images/projects/projeto-05.png', demo: '', github: 'https://github.com/gabyrodriguescunha-ui/Adota-Mais' },
    { nome: 'SAKURATRIP', descricao: 'SaaS de agência de viagem para o Japão.', imagem: '/images/projects/projeto-06.png', demo: 'https://sakura-trip.netlify.app/', github: '' },
  ];
}
