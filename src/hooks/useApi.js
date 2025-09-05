import { useLocaldb } from "./useLocaldb";

export function useAgendamento() {
    return useLocaldb('agendamentos')
}

export function useServicos() {
    return useLocaldb('servicos')
}

export function useContatos() {
    return useLocaldb('contatos')
}
