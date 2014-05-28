OSC Dashboard
-----

Desenvolvido durante o Hackathon das OSCs -  Maratona Hacker das Ogranizações da Sociedade Civil - de 21 a 25 de maio de 2014 - Brasilia - Brasil

Acesse o fonte em: https://github.com/hackathon-oscs/osc-dashboard
Acesse o alpha em:  http://hemingway.softwarelivre.org:8028/

![logo](https://dl.dropboxusercontent.com/u/28840639/logo.png)

**Sobre o Projeto:**

De acordo com o proposto pela organização do Hackathon, o presente projeto tem como objetivo utilizar a API de conexão a base de dados SICONV (Sistema de Convenios ) [1] disponibilizada pelo portal de transparência governamental[2].  O ponto chave do projeto é  a transparência do repasse de verbas às OSCs, onde qualquer cidadão poderá ter acesso a informações , principalmente as esferas públicos e as  Organizações da Sociedade Civil.

[1][https://www.convenios.gov.br/portal/]
[2][http://api.convenios.gov.br/siconv/doc/]


**Objetivos iniciais:**
Apresentar painel de Visualização (dashboard);
Permitir pesquisas em filtros básicos;
Atenção a mobilidade e acessibilidade;
Função de alerta para convênios em aberto;
Visualização gráfica artistica das relações entre as organizações;

**Funcionalidades previstas:**
Menu para seleção de ano de analise e filtros;

Dash 1: Gráficos Pizza
1.1  Convênios - relação de propostas efetuadas e convênios executados;
1.2  Valor total de convênios previstos e total de convênios executados;
1.3 TOP 10 -    areas de atuação que recebem mais dinheiro ) ;

Dash 2:Gráfico Barras
2.1 comparativo entre áreas de atuação;

Dash 3: listagem
Informações sobre convenios em aberto, com filtros por área de atuação;

Temporal: link para hospedagem em meteor - http://oscs.meteor.com/
Função de visualização das relações entre entes da base através de relação gráfica animada.

**Tecnologias utilizadas:**
- Análise do BD / Api (Conexão com API Siconv)
- Infra local para desenvolvimento e BD ( Node.js SQLITE)
- Layout para Dashboard ( Angular e D3)
- Identidade Visual ( Inkscape )
- Front End  (Html5 css3)
- Visualização artistica - Temporal - Meteor 
- Repositório  e controle de versões (GIT & Github)

**Autores:**
Bernardo Pansera, Carlos Ferreira, Felipe Mobus,  Filipe Brandão, Laureane Sousa, Renato Fabbri, Rodrigo Troian, Rosangela Rocha, Tania Silva, Wellington Jonathan

Tutor: Deivi Kuhn


Sob licença AGPL3 http://www.gnu.org/licenses/agpl-3.0.html
