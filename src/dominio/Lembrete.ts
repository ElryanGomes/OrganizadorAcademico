import { ItemAcademico } from "./ItemAcademico.js";

export class Lembrete extends ItemAcademico {
    private _dataAviso: Date | undefined;
    private _fixado: boolean;
    private _etiqueta: string;
    private _arquivado: boolean;

    constructor(
        titulo: string,
        descricao: string,
        workspaceId: string,
        etiqueta: string,
        dataAviso?: Date,
        id?: string,
        dataCriacao?: Date,
        fixado: boolean = false,
        arquivado: boolean = false
    ) {
        super(titulo, descricao, workspaceId, id, dataCriacao);
        this._etiqueta = etiqueta;
        this._fixado = fixado;
        this._arquivado = arquivado;

        if (dataAviso) {
            this._dataAviso = new Date(dataAviso.getTime());
        } else {
            this._dataAviso = undefined;
        }
    }

    get etiqueta(): string {
        return this._etiqueta;
    }

    get dataAviso(): Date | undefined {
        if (this._dataAviso === undefined) {
            return undefined;
        }
        return new Date(this._dataAviso.getTime());
    }

    get arquivado(): boolean {
        return this._arquivado;
    }

    alternarFixacao(): void {
        this._fixado = !this._fixado;
    }

    arquivar(): void {
        this._arquivado = true;
    }

    desarquivar(): void {
        this._arquivado = false;
    }

    obterCategoria(): string {
        return "Lembrete";
    }

    estaPendente(): boolean {
        if (this._arquivado || this._dataAviso === undefined) {
            return false;
        }
        return this._dataAviso > new Date();
    }

    estaFixado(): boolean {
        return this._fixado;
    }

    obterExibicaoFormatada(): string {
        if (this._dataAviso === undefined) {
            return `[${this._etiqueta}] ${this.titulo}`;
        }
        const data = this._dataAviso.toLocaleDateString("pt-BR");
        return `[${this._etiqueta}] ${this.titulo} - Aviso: ${data}`;
    }
}