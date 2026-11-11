# Lista de requisitos — AcademiaFlow (Organizador Acadêmico)

## Regras de ouro [PDF §1.1, §4, §6.2]

- O Domínio não conhece a Visão: nenhuma classe de `src/dominio/` usa `document`, `window`, `alert` ou `localStorage`.
- A Visão não decide regras: a tela só chama métodos do Domínio e exibe o resultado.
- TypeScript estrito, sem `any`.
- Polimorfismo de verdade: sem `if/switch/instanceof` para checar tipo.
- Todo integrante explica o Domínio na arguição ("foi a IA que fez" = nota zero no critério individual).

---

## 1. Entregáveis e Git [PDF §7.2]

- [x] ENT-01 Repositório Git remoto criado.
- [ ] ENT-02 Todos os integrantes commitam: o histórico mostra a equipe toda.
- [x] ENT-03 `README.md` com instruções `npm install` e `npm start`.
- [ ] ENT-04 `docs/diagrama.puml` e imagem exportada (PNG ou SVG) no repositório.
- [ ] ENT-05 `src/dados-iniciais.json` no repositório.
- [x] ENT-06 Clonar do zero e rodar `npm install` e `npm start` sem ajuste manual.

## 2. Configuração do projeto [PDF §4, §7.2]

- [x] CFG-01 Pastas `src/dominio`, `src/persistencia`, `src/visao`, `docs`.
- [x] CFG-02 `tsconfig.json` com `"strict": true`.
- [x] CFG-03 `.gitignore` com `node_modules` e a pasta de build.
- [ ] CFG-04 `npm start` compila e abre a aplicação no navegador [Grupo].
- [ ] CFG-05 `npm run demo` exercita só o Domínio no console [Grupo] (o PDF diz que o Domínio deve ser "testável via código ou console").

## 3. Diagrama de classes UML [PDF §7.2, §7.1.3]

- [ ] UML-01 Documenta as classes do Domínio: `ItemAcademico` (abstrata), `AtividadePratica`, `TrabalhoEmGrupo`, `Lembrete`, `Workspace`, `Estudante`, `Dashboard`.
- [ ] UML-02 Atributos com visibilidade e tipo, métodos com visibilidade, parâmetros e retorno; abstratos marcados.
- [ ] UML-03 Relacionamentos: herança, composição `Workspace` 1 → 0..* `ItemAcademico`, agregação `Estudante` 1 → 0..* `Workspace`, composição dos tipos auxiliares (`ItemChecklist`, `EtapaTrabalho`).
- [ ] UML-04 Tipos do diagrama em TypeScript (`string`, `number`, `Array<>`, `Map<string, number>`).
- [ ] UML-05 Código e diagrama iguais ("fidelidade ao diagrama" é critério de avaliação). Atualizar o `.puml` a cada mudança de assinatura.
- [ ] UML-06 Todos conseguem explicar cada seta e decisão.

**Divergências do UML atual que precisam ser resolvidas (ver seção 15):**
- [ ] UML-07 Datas injetáveis (`hoje?: Date`) nos métodos que dependem da data atual.
- [ ] UML-08 `TrabalhoEmGrupo` sem duplicar `dataLimite`, `concluida`, `dataConclusao`, `verificarSeAtrasada` e `calcularDiasRestantes`.
- [ ] UML-09 `ItemAcademico` do diagrama igual ao código (atributos, getters, `validarTitulo(titulo): void`).
- [ ] UML-10 Progresso do checklist em `AtividadePratica`.

## 4. Domínio: `ItemAcademico` [PDF §3.2.1, UML]

- [ ] IT-01 Classe `abstract`, não instanciável diretamente.
- [ ] IT-02 Atributos protegidos: `id: string` (gerado no cadastro, único, imutável), `titulo: string`, `descricao: string`, `dataCriacao: Date`, `workspaceId: string`.
- [ ] IT-03 Validação de título: não vazio nem só espaços.
- [ ] IT-04 Validação de descrição [Grupo]: limite definido pelo grupo (ex.: até 500 caracteres).
- [ ] IT-05 Consulta do identificador (getter) e `obterResumo(): string`.
- [ ] IT-06 Abstrato `obterCategoria(): string`.
- [ ] IT-07 Abstrato `estaPendente(): boolean`.
- [ ] IT-08 Abstrato `obterExibicaoFormatada(): string`.
- [ ] IT-09 Métodos concretos com resposta padrão, sobrescritos pelas filhas [UML]: `estaConcluido(hoje?)`, `estaAtrasado(hoje?)`, `estaFixado()`, `obterDataLimite()`, `obterOrigem()`. Servem para o `Workspace` filtrar e ordenar sem `instanceof`.
- [ ] IT-10 `Date` protegido: copiar ao receber e ao devolver.
- [ ] IT-11 Sem setters que quebrem invariantes (`id` e `dataCriacao` nunca mudam).
- [ ] IT-12 Saber responder: por que esses três métodos são abstratos?

## 5. Domínio: `AtividadePratica` [PDF §3.2.2, UML]

- [ ] AT-01 `dataLimite: Date`.
- [ ] AT-02 `concluida: boolean`, inicia `false`.
- [ ] AT-03 `dataConclusao?: Date`, preenchida só ao concluir.
- [ ] AT-04 `origem: "PROFESSOR" | "AUTOESTUDO"`.
- [ ] AT-05 `checklist: Array<{ descricao: string, feita: boolean }>`, opcional, começa vazio.
- [ ] AT-06 `linkEntrega?: string`.
- [ ] AT-07 `estaPendente()` retorna `true` enquanto `concluida === false`.
- [ ] AT-08 `marcarComoConcluida()`: `concluida = true` e `dataConclusao` com a data atual.
- [ ] AT-09 `verificarSeAtrasada(hoje?)`: pendente e prazo vencido.
- [ ] AT-10 `calcularDiasRestantes(hoje?)`: dias até o prazo.
- [ ] AT-11 Checklist: adicionar item, marcar como feito, calcular progresso, sem expor o array.
- [ ] AT-12 `obterCategoria()` ("Atividade Prática") e `obterExibicaoFormatada()`.
- [ ] AT-13 Sobrescreve `estaConcluido`, `estaAtrasado`, `obterDataLimite` e `obterOrigem`.

## 6. Domínio: `TrabalhoEmGrupo` [PDF §3.2.3, UML]

- [ ] TG-01 Herda `dataLimite`, `concluida` e `dataConclusao` de atividade, sem duplicar código.
- [ ] TG-02 `colegasDeEquipe: string[]`.
- [ ] TG-03 `papelDoAluno: string`.
- [ ] TG-04 `etapas: Array<{ titulo: string, responsavel: string, entregue: boolean }>`.
- [ ] TG-05 `estaPendente()` retorna `true` enquanto o trabalho não estiver 100% finalizado.
- [ ] TG-06 Marcar etapa como entregue (erro claro se a etapa não existir) [Grupo].
- [ ] TG-07 Progresso percentual da equipe, tratando zero etapas.
- [ ] TG-08 `verificarConclusaoTotal(): boolean` [UML].
- [ ] TG-09 Listas internas encapsuladas (cópia ou `ReadonlyArray`).
- [ ] TG-10 `obterCategoria()` ("Trabalho em Grupo") e `obterExibicaoFormatada()`.

## 7. Domínio: `Lembrete` [PDF §3.2.4, UML]

- [ ] LE-01 `dataAviso?: Date`.
- [ ] LE-02 `fixado: boolean`.
- [ ] LE-03 `etiqueta: string` (ex.: "Aviso de Aula", "Material Necessário").
- [ ] LE-04 `arquivado: boolean` [UML].
- [ ] LE-05 `alternarFixacao()` inverte `fixado`.
- [ ] LE-06 `arquivar()` e `desarquivar()` [UML].
- [ ] LE-07 `estaPendente()` retorna `false` por padrão; `true` só com `dataAviso` futura e lembrete não arquivado.
- [ ] LE-08 `obterCategoria()` ("Lembrete") e `obterExibicaoFormatada()`.
- [ ] LE-09 Sobrescreve `estaFixado()` e `obterDataLimite()` onde necessário.

## 8. Domínio: `Workspace` [PDF §3.1, UML]

- [ ] WS-01 Atributos: `codigo`, `nome`, `professor`, `salaOuLink?`, `horario?`.
- [ ] WS-02 `codigo` e `nome` obrigatórios (sem vazio nem só espaços).
- [ ] WS-03 Coleção de `ItemAcademico` privada, nunca exposta.
- [ ] WS-04 `adicionarItem`, `buscarItemPorId`, `removerItem`, `listarItens` (devolve cópia).
- [ ] WS-05 Impedir itens com `id` duplicado e `workspaceId` incoerente ("integridade das coleções", PDF §7.1).
- [ ] WS-06 `listarPendentes()`, `listarConcluidos()` e `listarAtrasados(hoje?)`.
- [ ] WS-07 `calcularTotalAtividades()`.
- [ ] WS-08 `calcularTaxaConclusao()`, tratando workspace sem atividades.
- [ ] WS-09 Tudo resolvido por métodos polimórficos, sem `instanceof`.

## 9. Busca, filtros e ordenação [PDF §3.3, UML]

- [ ] BF-01 Filtrar atividades pendentes (`listarPendentes`).
- [ ] BF-02 Filtrar atividades concluídas (`listarConcluidos`).
- [ ] BF-03 Filtrar lembretes fixados (`filtrarLembretesFixados`).
- [ ] BF-04 Ordenar por prazo mais próximo (`ordenarPorPrazo`); itens sem prazo vão para o fim.
- [ ] BF-05 Ordenar por data de cadastro (`ordenarPorDataCriacao`).
- [ ] BF-06 Ordenar por origem (`ordenarPorOrigem`): professor × autoestudo.
- [ ] BF-07 Busca textual por título ou descrição (`buscarPorTexto`).
- [ ] BF-08 Toda consulta devolve uma lista nova, sem alterar a original.
- [ ] BF-09 Nenhuma consulta usa `instanceof` ou `switch` por tipo.

## 10. Painel do estudante: `Estudante` e `Dashboard` [PDF §3.4, UML]

- [ ] PN-01 `Estudante`: adicionar, remover, buscar por código e listar workspaces.
- [ ] PN-02 Código de workspace único [Grupo].
- [ ] PN-03 `Dashboard.obterProximosPrazos(hoje?)`: pendentes de todos os workspaces, vencendo em 7 dias, ordenados.
- [ ] PN-04 `Dashboard.obterAtividadesAtrasadas(hoje?)`: atrasadas de todas as disciplinas.
- [ ] PN-05 `Dashboard.obterLembretesFixados()`: mural de todos os workspaces.
- [ ] PN-06 `Dashboard.contarAtividadesConcluidasNaSemana(hoje?)`.
- [ ] PN-07 `Dashboard.contarAtividadesConcluidasNoMes(hoje?)`.
- [ ] PN-08 `Dashboard.contarPendenciasPorDisciplina()`.
- [ ] PN-09 Definir "semana" e "mês" e documentar [Grupo].
- [ ] PN-10 Saber responder: como a tela pede as tarefas em atraso sem violar o Domínio? [PDF §7.1.4]

## 11. Dados iniciais e persistência [PDF §5]

- [ ] DD-01 `dados-iniciais.json` com no mínimo 4 disciplinas reais de ADS.
- [ ] DD-02 De 3 a 4 itens por disciplina, misturando atividades, trabalhos em grupo e lembretes com etiqueta.
- [ ] DD-03 Situações variadas: pendentes nos próximos dias, concluídas e pelo menos uma em atraso.
- [ ] DD-04 Alterações da tela (novas atividades, conclusões, lembretes) salvas no `localStorage`, na camada de Visão.
- [ ] DD-05 A informação não se perde ao recarregar a página.
- [ ] DD-06 Storage vazio carrega o `dados-iniciais.json` [Grupo].
- [ ] DD-07 Recriar instâncias reais das classes a partir do JSON (campo `tipo` + fábrica), fora de `dominio/` [Grupo].
- [ ] DD-08 Converter datas texto ↔ `Date` [Grupo].
- [ ] DD-09 Tratar JSON corrompido sem quebrar a tela [Grupo].
- [ ] DD-10 Resolver o envelhecimento das datas (datas relativas ou ajuste perto da apresentação) [Grupo].

## 12. Camada de Visão [PDF §3.4, §4, §6.1, §7.1.2]

- [ ] VI-01 HTML, CSS e script de renderização em `src/visao/`.
- [ ] VI-02 Dashboard como tela principal.
- [ ] VI-03 Navegação entre workspaces.
- [ ] VI-04 Cadastro de atividade, com origem professor ou autoestudo.
- [ ] VI-05 Cadastro de lembrete.
- [ ] VI-06 Cadastro de trabalho em grupo [Grupo] (o domínio e os dados iniciais o exigem).
- [ ] VI-07 Marcar conclusão, checklist e etapas, e fixar/desafixar lembrete.
- [ ] VI-08 Filtros, ordenação e busca chamando o Domínio.
- [ ] VI-09 Alerta visual de atraso e etiquetas coloridas.
- [ ] VI-10 Exibir erros de validação do Domínio (`try/catch` na Visão).
- [ ] VI-11 A tela não calcula atraso, progresso, taxa nem ordenação.
- [ ] VI-12 Todos sabem explicar como a tela chama o Domínio e onde está o `localStorage`.

## 13. Qualidade e arquitetura [PDF §7.1.3]

- [ ] QC-01 `src/dominio/` não importa de `visao/` nem de `persistencia/`.
- [ ] QC-02 Zero `document`, `window`, `alert`, `localStorage` em `src/dominio/`.
- [ ] QC-03 Zero `any` no projeto.
- [ ] QC-04 Zero `instanceof` e `switch` por tipo no Domínio.
- [ ] QC-05 Encapsulamento: atributos `private`/`protected`, coleções nunca expostas.
- [ ] QC-06 Invariantes validadas no construtor e nos métodos que mudam estado.
- [ ] QC-07 Composição e agregação como no UML.
- [ ] QC-08 Compila sem erros com `strict` ligado.
- [ ] QC-09 Sem código de teste provisório nem `console.log` esquecido.

## 14. Avaliação [PDF §7.1]

- [ ] AV-01 Anotar as datas dos Status Reports (definidas pelo professor).
- [ ] AV-02 Status Reports: mostrar evolução da modelagem, tirar dúvidas conceituais e demonstrar os primeiros métodos de domínio funcionando.
- [ ] AV-03 Apresentação final: navegação entre workspaces, cadastro de atividades (professor e autoestudo), lembretes, conclusões, filtros e Dashboard.
- [ ] AV-04 Ensaiar a demonstração.
- [ ] AV-05 **Arguição individual**: todos respondem, por exemplo: por que esse método é abstrato na base? Onde está garantido o encapsulamento da lista de atividades? Como a tela solicita as tarefas em atraso sem violar as regras de domínio?
- [ ] AV-06 Todos explicam herança, polimorfismo sem `instanceof` e datas injetáveis.
- [ ] AV-07 Simulado de arguição entre os integrantes.

---

## 15. Decisões do grupo (preencher)

| # | Decisão | Situação no UML atual | Sugestão |
| --- | --- | --- | --- |
| 1 | Herança de `TrabalhoEmGrupo` | Herda de `ItemAcademico` e duplica atributos e métodos | Herdar de `AtividadePratica` (TG-01 pede "sem duplicar código") |
| 2 | Quem conta como "atividade" em `calcularTotalAtividades` e `calcularTaxaConclusao` | Não resolvido (lembrete não é atividade) | Método polimórfico na base com resposta padrão `false` |
| 3 | Concluir uma atividade já concluída | O PDF não diz | Lançar erro claro |
| 4 | `TrabalhoEmGrupo` conclui sozinho ao entregar todas as etapas? | O PDF diz "pendente até 100% finalizado" | Concluir automaticamente |
| 5 | "Semana" e "mês" | Não definido | Últimos 7 e 30 dias |
| 6 | `contemTexto` em `ItemAcademico` | Existe no UML | Remover: o `Workspace` busca direto em `titulo` e `descricao` |
| 7 | `null` ou `undefined` nos retornos opcionais | `Date \| null`, `string \| null` | `undefined`, como o resto do projeto |
| 8 | `Estudante` + `Dashboard` ou uma classe só | Duas classes | Manter, se o grupo souber explicar a divisão |
| 9 | Prazo no passado ao cadastrar | Não definido | Rejeitar na tela, permitir ao carregar dados |
| 10 | Busca ignora maiúsculas e acentos? Busca vazia? | Não definido | Ignorar maiúsculas; busca vazia devolve tudo |

## 16. Ordem do trabalho

| Fase | Tópicos | Marco de saída |
| --- | --- | --- |
| 1. Base | 1, 2, 3 | Repositório rodando, UML corrigido e aprovado |
| 2. Hierarquia | 4, 5, 6, 7 | Quatro classes rodando no console |
| 3. Agregado e consultas | 8, 9 | `Workspace` com filtros, ordenação e busca |
| 4. Painel e dados | 10, 11 | `Estudante` e `Dashboard` calculando; JSON carregando |
| 5. Visão | 12 | Tela completa consumindo só o Domínio |
| 6. Fechamento | 13, 14 | Verificação final, ensaio e simulado de arguição |