export interface User {
    id?: number; // Opcional: nulo no cadastro, preenchido na resposta
    username: string;
    password?: string; // Opcional: preenchido ao enviar, nulo ao receber
}