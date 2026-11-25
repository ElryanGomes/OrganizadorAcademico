import { ItemAcademico } from "./ItemAcademico.js";

export class Workspace {
    private readonly _codigo: string;
    private readonly _nome: string;
    private readonly _professor: string;
    private readonly _salaOuLink: string | undefined;
    private readonly _horario: string | undefined;
    private readonly _itens: ItemAcademico[];

    constructor(codigo: string, nome: string, professor: string, salaOuLink?: string, horario?: string) {
        this._codigo = codigo;
        this._nome = nome;
        this._professor = professor;
        this._salaOuLink = salaOuLink;
        this._horario = horario;
        this._itens = [];
    }

    get codigo(): string {
        return this._codigo;
    }
    get nome(): string {
        return this._nome;
    }
    get professor(): string {
        return this._professor;
    }
    get salaOuLink(): string | undefined {
        return this._salaOuLink;
    }
    get horario(): string | undefined {
        return this._horario;
    }

    private validarTextoObrigatorio(valor: string, campo: string): void {
        throw new Error("Não implementado: validarTextoObrigatorio");
    }

    adicionarItem(item: ItemAcademico): void {
        throw new Error("Não implementado: adicionarItem");
    }

    buscarItemPorId(id: string): ItemAcademico | undefined {
        throw new Error("Não implementado: buscarItemPorId");
    }

    removerItem(id: string): void {
        throw new Error("Não implementado: removerItem");
    }

    listarItens(): ItemAcademico[] {
        throw new Error("Não implementado: listarItens");
    }

    listarPendentes(): ItemAcademico[] {
        throw new Error("Não implementado: listarPendentes");
    }

    listarConcluidos(): ItemAcademico[] {
        throw new Error("Não implementado: listarConcluidos");
    }

    listarAtrasados(hoje: Date = new Date()): ItemAcademico[] {
        throw new Error("Não implementado: listarAtrasados");
    }

    calcularTotalAtividades(): number {
        throw new Error("Não implementado: calcularTotalAtividades");
    }

    calcularTaxaConclusao(): number {
        throw new Error("Não implementado: calcularTaxaConclusao");
    }

    buscarPorTexto(texto: string): ItemAcademico[] {
        throw new Error("Não implementado: buscarPorTexto");
    }

    filtrarLembretesFixados(): ItemAcademico[] {
        throw new Error("Não implementado: filtrarLembretesFixados");
    }

    ordenarPorPrazo(): ItemAcademico[] {
        throw new Error("Não implementado: ordenarPorPrazo");
    }

    ordenarPorDataCriacao(): ItemAcademico[] {
        throw new Error("Não implementado: ordenarPorDataCriacao");
    }

    ordenarPorOrigem(): ItemAcademico[] {
        throw new Error("Não implementado: ordenarPorOrigem");
    }
}
