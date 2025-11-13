# 🎮 DSList - Frontend

Uma aplicação web moderna de listagem de jogos desenvolvida com **Angular 20**, **TypeScript** e **Bootstrap 5**. O projeto implementa autenticação JWT e integração com uma API backend.

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Autenticação](#-autenticação)
- [API Integration](#-api-integration)
- [Componentes Principais](#-componentes-principais)
- [Testes](#-testes)
- [Scripts Disponíveis](#-scripts-disponíveis)

---

## 👀 Visão Geral

**DSList** é um frontend Angular que permite aos usuários:
- ✅ Registrar-se na plataforma
- 🔐 Fazer login com autenticação JWT
- 📚 Visualizar uma lista de jogos
- 🛡️ Acessar rotas protegidas apenas quando autenticado

A aplicação segue os padrões modernos do Angular com componentes standalone e utiliza o novo routing system.

---

## 🛠 Tecnologias

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Angular** | 20.3.0 | Framework web frontend |
| **TypeScript** | 5.9.2 | Linguagem de programação |
| **Bootstrap** | 5.3.8 | Framework CSS responsivo |
| **RxJS** | 7.8.0 | Programação reativa |
| **Angular Router** | 20.3.0 | Navegação entre rotas |
| **Jasmine/Karma** | 5.9.0 / 6.4.0 | Testes unitários |

---

## 📦 Instalação

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn
- Angular CLI v20+

### Passos

```bash
# Clone o repositório
git clone https://github.com/Matheus096/dslist-front.git

# Entre no diretório
cd dslist

# Instale as dependências
npm install

# (Opcional) Instale o Angular CLI globalmente
npm install -g @angular/cli@20
```

---

## 🚀 Como Executar

### Ambiente de Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm start

# A aplicação estará disponível em http://localhost:4200
```

### Build para Produção

```bash
# Crie uma build otimizada
npm run build

# Os arquivos gerados estarão em dist/
```

### Modo Watch (Desenvolvimento com reload automático)

```bash
npm run watch
```

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── auth/                          # Serviços e guards de autenticação
│   │   ├── auth.service.ts           # Serviço de autenticação
│   │   ├── auth.guard.ts             # Guard para proteger rotas
│   │   └── jwt.interceptor.ts        # Interceptor HTTP para JWT
│   │
│   ├── components/
│   │   ├── layouts/                  # Componentes de layout
│   │   │   ├── game-list-layout/    # Layout da lista de jogos
│   │   │   ├── home-layout/         # Layout da página home
│   │   │   ├── login-layout/        # Layout da página login
│   │   │   └── register-layout/     # Layout da página register
│   │   │
│   │   └── shared/
│   │       └── navbar/               # Navbar compartilhada
│   │
│   ├── pages/                         # Páginas da aplicação
│   │   ├── home/                     # Página inicial
│   │   ├── login/                    # Página de login
│   │   ├── register/                 # Página de registro
│   │   └── game-list/                # Página de lista de jogos
│   │
│   ├── services/
│   │   └── game.ts                   # Serviço de jogos (API)
│   │
│   ├── app.ts                        # Componente raiz
│   ├── app.routes.ts                 # Definição de rotas
│   ├── app.config.ts                 # Configuração da aplicação
│   └── app.scss                      # Estilos globais
│
├── main.ts                           # Ponto de entrada
├── styles.scss                       # Estilos globais
└── index.html                        # HTML raiz

```

---

## ✨ Funcionalidades

### 1. **Autenticação JWT**
   - Login e registro de usuários
   - Armazenamento seguro de tokens em localStorage
   - Interceptor HTTP para incluir token em requisições
   - Guard para proteger rotas autenticadas

### 2. **Gestão de Rotas**
   - ✅ `/register` - Página de registro
   - ✅ `/login` - Página de login
   - ✅ `/home` - Página inicial (protegida)
   - ✅ `/games` - Lista de jogos (protegida)

### 3. **Interface Responsiva**
   - Design mobile-first com Bootstrap 5
   - Navbar dinâmica com ícones (bootstrap-icons)
   - Componentes reutilizáveis e escaláveis

### 4. **Integração com Backend**
   - Comunicação via HTTP com API Rest
   - Tratamento de erros
   - Serviços para diferentes domínios (auth, games)

---

## 🔐 Autenticação

A autenticação é gerenciada através do `AuthService`:

```typescript
// Login
authService.login(username, password).subscribe(response => {
  authService.saveToken(response.token);
});

// Verificar se está autenticado
if (authService.isAuthenticated()) {
  // Usuário autenticado
}

// Logout
authService.logout();
```

### Auth Guard
As rotas `/home` e `/games` são protegidas pelo `AuthGuard`, que redireciona usuários não autenticados para a página de login.

### JWT Interceptor
O `JwtInterceptor` adiciona automaticamente o token às requisições:
```
Authorization: Bearer <token>
```

---

## 🌐 API Integration

### Endpoints Esperados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Fazer login |
| `POST` | `/auth/register` | Registrar novo usuário |
| `GET` | `/games` | Listar todos os jogos |

**URL Base:** `http://localhost:8080`

### Exemplo de Requisição

```typescript
// No GameService
getGames(): Observable<Game[]> {
  return this.http.get<Game[]>('/games');
}
```

---

## 🧩 Componentes Principais

### 1. **App Component** (`app.ts`)
   - Componente raiz da aplicação
   - Gerencia o roteamento via RouterOutlet

### 2. **Login Component** (`pages/login/`)
   - Formulário de login
   - Validação de credenciais
   - Redirecionamento após autenticação bem-sucedida

### 3. **Register Component** (`pages/register/`)
   - Formulário de registro
   - Criação de novas contas
   - Validação de dados

### 4. **GameList Component** (`pages/game-list/`)
   - Exibe lista de jogos do backend
   - Requer autenticação

### 5. **Navbar Component** (`components/shared/navbar/`)
   - Menu de navegação
   - Links para diferentes seções
   - Botão de logout

---

## ✅ Testes

### Executar Testes Unitários

```bash
npm test
```

Utiliza **Jasmine** como framework de testes e **Karma** como test runner.

### Cobertura de Testes

```bash
# Gerar relatório de cobertura
ng test --code-coverage
```

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **start** | `npm start` | Inicia servidor dev (localhost:4200) |
| **build** | `npm run build` | Build otimizado para produção |
| **watch** | `npm run watch` | Build em modo watch |
| **test** | `npm test` | Executa testes unitários |
| **ng** | `npm run ng` | Executa comandos do Angular CLI |

---

## 🔧 Configuração

### Arquivo `tsconfig.json`
Define as opções do compilador TypeScript.

### Arquivo `angular.json`
Configuração do projeto Angular (build, dev server, etc).

### Prettier
Configurado para formatação automática de código:
- 100 caracteres por linha
- Single quotes
- Suporte a templates Angular HTML

---

## 📚 Recursos Úteis

- [Documentação Angular](https://angular.io)
- [Bootstrap 5 Docs](https://getbootstrap.com)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 👤 Autor

**Matheus096** - [GitHub Profile](https://github.com/Matheus096)

---

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido usando Angular 20 e TypeScript**
