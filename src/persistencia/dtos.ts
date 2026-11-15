
export interface ItemChecklistDTO {
    descricao: string;
    feita: boolean;
}

export interface EtapaTrabalhoDTO {
    titulo: string;
    responsavel: string;
    entregue: boolean;
}

export interface ItemAcademicoBaseDTO {
    id: string;
    titulo: string;
    descricao: string;
    dataCriacao: string;
    workspaceId: string;
}

export interface AtividadePraticaDTO extends ItemAcademicoBaseDTO {
    tipo: 'ATIVIDADE_PRATICA';
    dataLimite: string;
    concluida: boolean;
    dataConclusao?: string;
    origem: 'PROFESSOR' | 'AUTOESTUDO';
    checklist: ItemChecklistDTO[];
    linkEntrega?: string;
}
    
export interface TrabalhoEmGrupoDTO extends ItemAcademicoBaseDTO{
    tipo: 'TRABALHO_EM_GRUPO';
    dataLimite: string;
    concluida: boolean;
    dataConclusao?: string;
    colegasDeEquipe: string[];
    papelDoAluno: string;
    etapas: EtapaTrabalhoDTO[];
}

export interface LembreteDTO extends ItemAcademicoBaseDTO {
    tipo: 'LEMBRETE';
    dataAviso?: string;
    fixado: boolean;
    etiqueta: string;
    arquivado: boolean;
}

export type ItemAcademicoDTO =
    | AtividadePraticaDTO
    | TrabalhoEmGrupoDTO
    | LembreteDTO;


export interface WorkspaceDTO {
    codigo: string;
    nome: string;
    professor: string;
    salaOuLink?: string;
    horario?: string;
    itens: ItemAcademicoDTO[];
}

export interface EstudanteDTO {
    nome: string;
    workspaces: WorkspaceDTO[];
}

export type DadosIniciaisDTO = EstudanteDTO;