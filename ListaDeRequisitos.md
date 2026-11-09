## Regras de ouro

- O Domínio não conhece a Visão: nenhuma classe de domínio usa `document`, `window`, `alert` ou `localStorage`.
- A Visão não decide regras: a tela chama métodos do Domínio e só exibe o resultado.
- TypeScript estrito, sem `any`.
- Polimorfismo de verdade: sem `if/switch/instanceof` para checar tipo.
- Todo integrante explica o Domínio inteiro na arguição.

---

# Checklist de requisitos

## 1. Organização do grupo e Git

- [ ] ORG-01 Registrar os integrantes e o responsável principal de cada tópico.
- [ ] ORG-02 Criar o repositório remoto e dar acesso a todos.
- [ ] ORG-03 Combinar convenção de branches (`feature/workspace`) e de commits.
- [ ] ORG-04 Cada integrante commita o próprio trabalho.
- [ ] ORG-05 Integrar na `main` por Pull Request revisado por outro integrante.
- [ ] ORG-06 Criar quadro de tarefas (issues) com os itens deste checklist.
- [ ] ORG-07 Definir canal de comunicação e reunião fixa semanal.
- [ ] ORG-08 Rodízio de explicação: cada um explica a classe de outro colega.
- [ ] ORG-09 Anotar as datas dos Status Reports.

## 2. Configuração do projeto TypeScript

- [ ] CFG-01 Inicializar `package.json` com TypeScript como dependência de desenvolvimento.
- [ ] CFG-02 `tsconfig.json` com `"strict": true`.
- [x] CFG-03 Criar `src/dominio`, `src/persistencia`, `src/visao`, `docs`.
- [ ] CFG-04 Definir como o navegador executa o TypeScript e documentar.
- [ ] CFG-05 Script `npm start` que compila e serve a aplicação.
- [ ] CFG-06 Script separado (`npm run demo`) que exercita só o Domínio no console.
- [ ] CFG-07 `.gitignore` com `node_modules` e pasta de build.
- [ ] CFG-08 Dependências no mínimo, cada pacote extra justificado.

## 3. Diagrama de classes UML (PlantUML)

- [ ] UML-01 `.puml` em `docs/` e imagem exportada (PNG ou SVG) no repositório.
- [ ] UML-02 Todas as classes do Domínio: `ItemAcademico` (abstrata), `AtividadePratica`, `TrabalhoEmGrupo`, `Lembrete`, `Workspace` e o painel do estudante.
- [ ] UML-03 Tipos auxiliares: item de checklist, etapa de trabalho em grupo e origem (`"PROFESSOR" | "AUTOESTUDO"`).
- [ ] UML-04 Atributos com visibilidade e tipo.
- [ ] UML-05 Métodos com visibilidade, parâmetros e retorno; abstratos marcados.
- [ ] UML-06 Herança, composição/agregação com multiplicidade e associação painel–workspaces.
- [ ] UML-07 Decidir e justificar a herança de `TrabalhoEmGrupo`.
- [ ] UML-08 Conferir código × diagrama e atualizar o `.puml` a cada mudança de assinatura.
- [ ] UML-09 Todos conseguem explicar cada seta e decisão do diagrama.

## 4. Domínio: ItemAcademico (classe abstrata)

- [ ] IT-01 `id: string`, gerado no cadastro, único e imutável.
- [ ] IT-02 `titulo: string`, validado (não vazio nem só espaços).
- [ ] IT-03 `descricao: string`, com validação definida pelo grupo.
- [ ] IT-04 `dataCriacao: Date`, definida no cadastro.
- [ ] IT-05 `workspaceId: string`.
- [ ] IT-06 Classe `abstract`, não instanciável diretamente.
- [ ] IT-07 Métodos concretos: validação de título e descrição, consulta do id e resumo básico.
- [ ] IT-08 Abstrato `obterCategoria(): string`.
- [ ] IT-09 Abstrato `estaPendente(): boolean`.
- [ ] IT-10 Abstrato `obterExibicaoFormatada(): string`.
- [ ] IT-11 Getters, sem setters que quebrem invariantes.
- [ ] IT-12 Saber responder: por que esses três métodos são abstratos?

## 5. Domínio: AtividadePratica

- [ ] AT-01 `dataLimite: Date`, validada.
- [ ] AT-02 `concluida: boolean`, iniciando em `false`.
- [ ] AT-03 `dataConclusao?: Date`, preenchida só ao concluir.
- [ ] AT-04 `origem: "PROFESSOR" | "AUTOESTUDO"`.
- [ ] AT-05 `checklist: Array<{ descricao: string, feita: boolean }>`, começa vazio.
- [ ] AT-06 `linkEntrega?: string`.
- [ ] AT-07 `estaPendente()` retorna `true` enquanto `concluida === false`.
- [ ] AT-08 `marcarComoConcluida()` define `concluida = true` e registra `dataConclusao`.
- [ ] AT-09 Definir o que ocorre ao concluir uma atividade já concluída.
- [ ] AT-10 `verificarSeAtrasada()` com data de referência opcional (`hoje: Date = new Date()`).
- [ ] AT-11 `calcularDiasRestantes()` com a mesma data de referência.
- [ ] AT-12 Checklist: adicionar item, marcar como feito e calcular progresso, sem expor o array.
- [ ] AT-13 Implementar `obterCategoria()` ("Atividade Prática") e `obterExibicaoFormatada()`.

## 6. Domínio: TrabalhoEmGrupo

- [ ] TG-01 Herdar `dataLimite`, `concluida` e `dataConclusao` sem duplicar código.
- [ ] TG-02 `colegasDeEquipe: string[]`.
- [ ] TG-03 `papelDoAluno: string`.
- [ ] TG-04 `etapas: Array<{ titulo: string, responsavel: string, entregue: boolean }>`.
- [ ] TG-05 `estaPendente()` retorna `true` até o trabalho estar 100% finalizado.
- [ ] TG-06 Marcar etapa como entregue; erro claro se não existir.
- [ ] TG-07 Progresso percentual da equipe (tratar zero etapas).
- [ ] TG-08 Definir se conclui automaticamente quando todas as etapas forem entregues.
- [ ] TG-09 Adicionar/remover colegas e etapas com validação.
- [ ] TG-10 Listas internas encapsuladas (cópia ou `ReadonlyArray`).
- [ ] TG-11 Implementar `obterCategoria()` ("Trabalho em Grupo") e `obterExibicaoFormatada()`.

## 7. Domínio: Lembrete

- [ ] LE-01 `dataAviso?: Date`.
- [ ] LE-02 `fixado: boolean`.
- [ ] LE-03 `etiqueta: string`, validada.
- [ ] LE-04 `alternarFixacao()` inverte `fixado`.
- [ ] LE-05 `estaPendente()` retorna `false` por padrão; `true` só com `dataAviso` futura e lembrete não arquivado.
- [ ] LE-06 Decidir se existe atributo `arquivado` e como ele muda.
- [ ] LE-07 Implementar `obterCategoria()` ("Lembrete") e `obterExibicaoFormatada()`.
- [ ] LE-08 Fixados localizáveis pelas consultas do workspace e do painel.

## 8. Domínio: Workspace (disciplina)

- [ ] WS-01 Atributos: `codigo`, `nome`, `professor`, `salaOuLink?`, `horario?`.
- [ ] WS-02 `codigo` e `nome` obrigatórios (sem vazio nem só espaços).
- [ ] WS-03 Coleção de `ItemAcademico` privada, nunca exposta.
- [ ] WS-04 Impedir itens com `id` duplicado.
- [ ] WS-05 Garantir `workspaceId` coerente nos itens adicionados.
- [ ] WS-06 `adicionarItem`, `buscarItem`, `removerItem`, `listarItens` (cópia ou `ReadonlyArray`).
- [ ] WS-07 Consultar itens pendentes, concluídos e em atraso.
- [ ] WS-08 Total de atividades cadastradas.
- [ ] WS-09 Taxa percentual de conclusão (tratar workspace sem atividades).
- [ ] WS-10 Resolver "concluído" e "em atraso" sem `instanceof`, com métodos polimórficos na base.
- [ ] WS-11 Percorrer `ItemAcademico[]` chamando métodos polimórficos.

## 9. Busca, filtros e ordenação

- [ ] BF-01 Filtro: atividades pendentes.
- [ ] BF-02 Filtro: atividades concluídas.
- [ ] BF-03 Filtro: lembretes fixados.
- [ ] BF-04 Ordenar por prazo mais próximo (sem prazo vai para o fim).
- [ ] BF-05 Ordenar por data de cadastro.
- [ ] BF-06 Ordenar por origem.
- [ ] BF-07 Busca textual por título ou descrição.
- [ ] BF-08 Definir se a busca ignora maiúsculas/acentos e o comportamento com busca vazia.
- [ ] BF-09 Toda consulta devolve nova lista, sem alterar a coleção original.
- [ ] BF-10 Nenhum filtro/ordenação usa `instanceof`/`switch` por tipo.
- [ ] BF-11 Testar tudo no console com o `dados-iniciais.json`.

## 10. Painel Geral do Estudante (Dashboard)

- [ ] PN-01 Classe de domínio do painel (`PainelEstudante`) que agrega `Workspace`.
- [ ] PN-02 Adicionar, remover e listar workspaces, com código único.
- [ ] PN-03 Próximos prazos da semana (pendentes, vencendo em 7 dias, ordenados).
- [ ] PN-04 Atividades em atraso de todas as disciplinas.
- [ ] PN-05 Mural de lembretes fixados de todas as disciplinas.
- [ ] PN-06 Contador de concluídas na semana.
- [ ] PN-07 Contador de concluídas no mês.
- [ ] PN-08 Pendentes por disciplina.
- [ ] PN-09 Data de referência opcional em todos os métodos.
- [ ] PN-10 Definir "semana" e "mês" e documentar.
- [ ] PN-11 Responder: como a tela pede as tarefas em atraso sem violar o Domínio?

## 11. Persistência e dados iniciais

- [ ] DD-01 Mínimo de 4 disciplinas reais de ADS.
- [ ] DD-02 De 3 a 4 itens por disciplina, misturando os três tipos.
- [ ] DD-03 Pendentes nos próximos dias, concluídas e pelo menos uma em atraso.
- [ ] DD-04 Cobrir `PROFESSOR` e `AUTOESTUDO`, checklist, trabalho em grupo com etapas e lembrete fixado.
- [ ] DD-05 Resolver o envelhecimento das datas (datas relativas ou ajuste perto da apresentação).
- [ ] DD-06 Campo discriminante de tipo em cada item do JSON.
- [ ] DD-07 Fábrica/hidratação recria instâncias reais, nunca objetos soltos.
- [ ] DD-08 Converter datas texto ↔ `Date`.
- [ ] DD-09 Esse código fica fora de `dominio/`.
- [ ] DD-10 Salvar no `localStorage` após cada alteração.
- [ ] DD-11 Restaurar o estado ao recarregar.
- [ ] DD-12 Storage vazio carrega o `dados-iniciais.json`.
- [ ] DD-13 Opção para restaurar dados iniciais.
- [ ] DD-14 Tratar JSON corrompido sem quebrar.

## 12. Camada de Visão

- [ ] VI-01 `index.html`, CSS e script de renderização em `src/visao/`.
- [ ] VI-02 Dashboard como tela principal.
- [ ] VI-03 Navegação entre workspaces.
- [ ] VI-04 Cadastro de atividade (origem professor/autoestudo).
- [ ] VI-05 Cadastro de trabalho em grupo.
- [ ] VI-06 Cadastro de lembrete.
- [ ] VI-07 Concluir atividade, marcar checklist e etapas, fixar/desafixar lembrete.
- [ ] VI-08 Remover itens.
- [ ] VI-09 Filtros, ordenação e busca chamando o Domínio.
- [ ] VI-10 Alerta visual de atraso e etiquetas coloridas.
- [ ] VI-11 Exibir erros de validação do Domínio (`try/catch` na Visão).
- [ ] VI-12 Passar à IA os métodos públicos do Domínio como especificação.
- [ ] VI-13 Revisar o código gerado: a tela não calcula atraso, progresso, taxa nem ordenação.
- [ ] VI-14 Todos sabem explicar como a tela chama o Domínio e onde está o `localStorage`.

## 13. Arquitetura e qualidade de código

- [ ] QC-01 `src/dominio/` não importa de `visao/` nem de `persistencia/`.
- [ ] QC-02 Zero ocorrências de `document`, `window`, `alert`, `localStorage` em `src/dominio/`.
- [ ] QC-03 Zero `any` no projeto.
- [ ] QC-04 Encapsulamento: atributos `private`/`protected`, coleções nunca expostas.
- [ ] QC-05 Invariantes validadas no construtor e nos métodos que mudam estado.
- [ ] QC-06 Zero `instanceof` e `switch` por tipo no Domínio.
- [ ] QC-07 Composição e agregação iguais ao UML.
- [ ] QC-08 Nomes iguais aos do enunciado e do diagrama.
- [ ] QC-09 Script de console cobrindo invariantes, atraso, taxa, filtros, ordenação, busca e painel.
- [ ] QC-10 Sem código morto nem `console.log` esquecido.
- [ ] QC-11 Compila sem erros com `strict` ligado.

## 14. Avaliação

- [ ] AV-01 Registrar datas dos Status Reports.
- [ ] AV-02 Report 1: UML pronto, hierarquia rodando no console, dúvidas conceituais.
- [ ] AV-03 Report 2: `Workspace` com filtros/ordenação/busca e JSON inicial.
- [ ] AV-04 Report seguinte: painel e primeira versão da tela.
- [ ] AV-05 Todos participam dos reports.
- [ ] AV-06 Roteiro de demo: workspaces, cadastros, conclusão, filtros, dashboard e recarregar a página.
- [ ] AV-07 Testar `npm install` e `npm start` em máquina limpa.
- [ ] AV-08 Ensaiar com cronômetro.
- [ ] AV-09 Todos respondem: por que abstrato na base? Onde está o encapsulamento da lista? Como a tela pede atrasos sem violar o Domínio?
- [ ] AV-10 Todos explicam: herança, polimorfismo sem `instanceof`, hidratação e datas injetáveis.
- [ ] AV-11 Simulado de arguição entre os integrantes.
- [ ] AV-12 Todos navegam em qualquer arquivo do Domínio.

## 15. Entrega final

- [ ] EN-01 README com descrição e integrantes.
- [ ] EN-02 Instruções `npm install` e `npm start` com versão do Node.
- [ ] EN-03 Estrutura de pastas explicada.
- [ ] EN-04 Decisões de design registradas (seção abaixo).
- [ ] EN-05 Repositório Git com histórico de toda a equipe.
- [ ] EN-06 UML `.puml` + imagem atualizados.
- [ ] EN-07 `dados-iniciais.json` no repositório.
- [ ] EN-08 Clonar do zero e rodar sem ajustes manuais.
- [ ] EN-09 Rodar as buscas de QC-02, QC-03 e QC-06.
- [ ] EN-10 Conferir o tópico 13 inteiro.

## 16. Decisões de design (preencher)

| # | Decisão | Opções | Sugestão | Decisão do grupo |
| --- | --- | --- | --- | --- |
| 1 | Herança de `TrabalhoEmGrupo` | De `AtividadePratica`, ou de `ItemAcademico` com classe intermediária | De `AtividadePratica` | |
| 2 | Pendência do `Lembrete` | Atributo `arquivado`, ou só `dataAviso` futura | Atributo `arquivado` | |
| 3 | "Em atraso"/"concluído" sem `instanceof` | Métodos polimórficos na base | Métodos polimórficos na base | |
| 4 | Prazo no passado ao cadastrar | Permitir ou rejeitar | Rejeitar na tela; permitir ao carregar dados | |
| 5 | "Semana" e "mês" | Últimos 7/30 dias, ou calendário | Últimos 7 e 30 dias | |
| 6 | Professor obrigatório | Obrigatório ou opcional | Obrigatório | |
| 7 | Reconstruir instâncias do JSON | Campo `tipo` + fábrica, ou `fromJSON` por classe | Campo `tipo` + fábrica | |
| 8 | Executar TypeScript no navegador | `tsc` + servidor estático, ou bundler leve | `tsc` + servidor estático | |

## Ordem das fases

| Fase | Tópicos | Marco de saída | Prazo |
| --- | --- | --- | --- |
| 1. Base | 1, 2, 3 | Repositório, projeto configurado e UML aprovado | |
| 2. Hierarquia de itens | 4, 5, 6, 7 | Quatro classes rodando no console | |
| 3. Agregado e consultas | 8, 9 | `Workspace` completo com filtros, ordenação e busca | |
| 4. Painel e dados | 10, 11 | Painel calculando tudo e JSON carregando por hidratação | |
| 5. Visão | 12 | Tela completa consumindo só a API do Domínio | |
| 6. Fechamento | 13, 14, 15 | Verificação final, ensaio e simulado de arguição | |
