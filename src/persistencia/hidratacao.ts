
export function converterData(data: string): Date {
    const dataConvertida = new Date(data);

    if (Number.isNaN(dataConvertida.getTime())) {
        throw new Error(`Data inválida: ${data}`);
    }

    return dataConvertida;
}