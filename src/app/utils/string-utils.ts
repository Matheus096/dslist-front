export class StringUtils {
    static transformarEmSlug(titulo: string): string {
        if (!titulo) {
            return '';
        }
        return titulo
            .toLowerCase()
            .normalize('NFD')                                      // Remove acentos
            .replace(/[\u0300-\u036f]/g, '')  // Remove os restos dos acentos
            .replace(/[^a-z0-9 -]/g, '')      // Remove caracteres especiais
            .replace(/\s+/g, '-')             // Substitui espaços por hífens
            .replace(/-+/g, '-');             // Evita hífens duplos
    }
}

// Função para transformar o título em um formato de URL bonitinho para o usuário (slug)