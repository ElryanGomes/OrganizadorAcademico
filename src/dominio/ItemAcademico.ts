export abstract class ItemAcademico {
    protected readonly _id: string;
    protected readonly _titulo: string;
    protected readonly _descricao: string;
    protected readonly _dataCriacao: Date;
    protected readonly _workspaceId: string;

    constructor(titulo: string, descricao: string, workspaceId: string, id?: string, dataCriacao?: Date) {
        this.validarTitulo(titulo);
        this.validarDescricao(descricao);

        this._id = id ?? crypto.randomUUID(); // usa o da esquerda se tiver valor, se nao usa o da direita
        this._titulo = titulo.trim();
        this._descricao = descricao;
        this._dataCriacao = new Date((dataCriacao ?? new Date()).getTime()); // usa o da esquerda se tiver valor, se nao usa o da direita
        this._workspaceId = workspaceId;
    }

    get id(): string {
        return this._id;
    }
    get titulo(): string {
        return this._titulo;
    }
    get descricao(): string {
        return this._descricao;
    }
    get dataCriacao(): Date {
        return new Date(this._dataCriacao.getTime());
    }
    get workspaceId(): string {
        return this._workspaceId;
    }

    protected validarTitulo(titulo: string): void {
        if (titulo.trim().length === 0) {
            throw new Error("O título não pode ser vazio.");
        }
    }
    protected validarDescricao(descricao: string): void {
        if (descricao.length > 500) {
            throw new Error("A descrição não pode ter mais de 500 caracteres.");
        }
    }
}
