import { ItemAcademico } from "./ItemAcademico.js";
export interface ItemChecklist {
    descricao: string;
    feita: boolean;
}


export class AtividadePratica extends ItemAcademico {
    private _dataLimite: Date;
    private _concluida: boolean;
    private _dataConclusao?: Date;
    private _origem: "PROFESSOR" | "AUTOESTUDO";
    private _checklist: ItemChecklist[];
    private _linkEntrega?: string | undefined;

    constructor(
        titulo: string,
        descricao: string,
        workspaceId: string,
        dataLimite: Date,
        origem: "PROFESSOR" | "AUTOESTUDO",
        id?: string,
        dataCriacao?: Date,
        linkEntrega?: string,
        dataConclusao?: Date
    ) {
        super(titulo, descricao, workspaceId, id, dataCriacao);
        if (isNaN(dataLimite.getTime())) {
            throw new Error("A data limite é inválida.");
        }

        this._dataLimite = new Date(dataLimite.getTime());
        this._origem = origem;
        this._linkEntrega = linkEntrega;
        this._checklist = [];

        if (dataConclusao) {
            this._concluida = true;
            this._dataConclusao = new Date(dataConclusao.getTime());
        } else {
            this._concluida = false;
        }
    }

    obterCategoria(): string {
        return "Atividade Prática";
    }

    estaPendente(): boolean {
        return !this._concluida;
    }

    obterExibicaoFormatada(): string {
        const prazo = this._dataLimite.toLocaleDateString("pt-BR");
        return `${this.titulo} - Prazo: ${prazo}`;
    }

    estaConcluido(): boolean {
        return this._concluida;
    }

    estaAtrasado(hoje: Date = new Date()): boolean {
        return !this._concluida && hoje > this._dataLimite;
    }

    obterDataLimite(): Date {
        return new Date(this._dataLimite.getTime());
    }

    obterOrigem(): "PROFESSOR" | "AUTOESTUDO" {
        return this._origem;
    }

    marcarComoConcluida(): void {
        if (this._concluida) {
            return;
        }
        this._concluida = true;
        this._dataConclusao = new Date();
    }

    verificarSeAtrasada(): boolean {
        return this.estaAtrasado();
    }

    calcularDiasRestantes(): number {
        const umDia = 1000 * 60 * 60 * 24;
        const diferenca = this._dataLimite.getTime() - new Date().getTime();
        return Math.ceil(diferenca / umDia);
    }

    adicionarItemChecklist(item: ItemChecklist): void {
        this._checklist.push({ descricao: item.descricao, feita: item.feita });
    }

    marcarItemChecklist(item: ItemChecklist): void {
        for (const itemDaLista of this._checklist) {
            if (itemDaLista.descricao === item.descricao) {
                itemDaLista.feita = true;
                return;
            }
        }
        throw new Error("Item não encontrado no checklist.");
    }

}
