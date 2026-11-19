import { AtividadePratica } from "./AtividadePratica.js";

export interface EtapaTrabalho {
    titulo: string;
    responsavel: string;
    entregue: boolean;
}

export class TrabalhoEmGrupo extends AtividadePratica {
    private _colegasDeEquipe: string[];
    private _papelDoAluno: string;
    private _etapas: EtapaTrabalho[];

    constructor(
        titulo: string,
        descricao: string,
        workspaceId: string,
        dataLimite: Date,
        colegasDeEquipe: string[],
        papelDoAluno: string,
        id?: string,
        dataCriacao?: Date,
        dataConclusao?: Date
    ) {
        super(titulo, descricao, workspaceId, dataLimite, "PROFESSOR", id, dataCriacao, undefined, dataConclusao);
        // this._colegasDeEquipe = [...colegasDeEquipe];
        this._colegasDeEquipe = [];
        for (const colega of colegasDeEquipe) { // cria um espelho de cada item de colegasDeEquipe
            this._colegasDeEquipe.push(colega);
        }
        this._papelDoAluno = papelDoAluno;
        this._etapas = [];
    }

    get colegasDeEquipe(): string[] {
        const copiaColegasDeEquipe: string[] = [];
        for (const colega of this._colegasDeEquipe) {
            copiaColegasDeEquipe.push(colega);
        }
        return copiaColegasDeEquipe;
    }

    get papelDoAluno(): string {
        return this._papelDoAluno;
    }

    get etapas(): EtapaTrabalho[] {
        const copiaEtapaTrabalho: EtapaTrabalho[] = [];
        for (const etapa of this._etapas) {
            copiaEtapaTrabalho.push({ titulo: etapa.titulo, responsavel: etapa.responsavel, entregue: etapa.entregue });
        }
        return copiaEtapaTrabalho;
    }

    marcarComoConcluida(): void {
        if (!this.verificarConclusaoTotal()) {
            throw new Error("Todas as etapas devem estar entregues para concluir o trabalho.");
        }

        super.marcarComoConcluida();
    }
    obterCategoria(): string {
    return "Trabalho em Grupo";
}

    obterExibicaoFormatada(): string {
        const prazo = this.obterDataLimite().toLocaleDateString("pt-BR");
        const progresso = this.calcularProgresso();
        
        return `${this.titulo} - Prazo: ${prazo} - Progresso: ${progresso}%`;
}

    adicionarEtapa(etapa: EtapaTrabalho): void {
        this._etapas.push({ titulo: etapa.titulo, responsavel: etapa.responsavel, entregue: etapa.entregue });
    }

    marcarEtapaComoEntregue(tituloEtapa: string): void {
        for (const etapa of this._etapas) {
            if (etapa.titulo == tituloEtapa) {
                etapa.entregue = true;
                if (this.verificarConclusaoTotal()) {
                    this.marcarComoConcluida();
                }
                return;
            }
        }
        throw new Error("Etapa não encontrada.");
    }

    calcularProgresso(): number {
        if (this._etapas.length == 0) {
            return 0;
        }
        let entregues = 0;
        for (const etapa of this._etapas) {
            if (etapa.entregue) {
                entregues++;
            }
        }
        return (entregues / this._etapas.length) * 100;
    }

    verificarConclusaoTotal(): boolean {
        if (this._etapas.length === 0) {
            return false;
        }
        for (const etapa of this._etapas) {
            if (!etapa.entregue) {
                return false;
            }
        }
        return true;
    }
}