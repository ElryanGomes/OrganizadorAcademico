import dadosIniciais from "../dados-iniciais.json" with { type: "json"};

import type { DadosIniciaisDTO } from "./dtos.js";

const dadosValidos = dadosIniciais satisfies DadosIniciaisDTO;