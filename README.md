# Organizador Acadêmico — Sistema de Organização de Atividades e Lembretes

Trabalho final de Programação Orientada a Objetos (TypeScript) — ADS.
Prof. Iallen Gábio.

**Integrantes:**
- José Elryan Costa Gomes
- Francisco Jonathan
- Luis Neto
- Arthur Vinicius

## Como executar

Versão do Node utilizada: **v22.20.0**

```bash
git clone https://github.com/ElryanGomes/OrganizadorAcademico.git
cd OrganizadorAcademico
npm install
npm start
```
`npm run build` pra compilar arquivos ts em js

O `npm start` compila o TypeScript e abre a aplicação no navegador.
Para testar só o Domínio no console: `npm run demo`.

## Estrutura de pastas

```
OrganizadorAcademico/
├── src/
│   ├── dominio/          # classes puras, sem DOM/localStorage
│   ├── persistencia/     # serialização e hidratação (sem DOM)
│   ├── visao/            # HTML, CSS, app.ts, localStorage
│   └── dados-iniciais.json
├── docs/
│   ├── diagrama.puml
│   └── diagrama.png
├── package.json
├── tsconfig.json         # "strict": true
└── README.md
```

## Convenções do grupo

- Branches: `feature/<nome>` (ex.: `feature/workspace`), `fix/<nome>`, `docs/<nome>`.
- Commits: `feat: ...`, `fix: ...`, `docs: ...`.
- Nada vai direto na `main`: abrir Pull Request e outro integrante revisa.