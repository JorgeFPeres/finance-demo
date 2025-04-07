# Finance Dashboard

Um dashboard financeiro moderno construído com Next.js 15, que exibe dados em tempo real do mercado financeiro. O projeto inclui autenticação de usuário, gerenciamento de sessão e visualizações de dados dinâmicas.

## 🚀 Funcionalidades

- **Autenticação de Usuário**

  - Login e Registro de usuários
  - Gerenciamento de sessão com timeout por inatividade (5 minuto)
  - Proteção de rotas

- **Dashboard Financeiro**

  - Gráficos em tempo real de ativos financeiros
  - Atualização automática dos dados a cada 5 segundos
  - Visualização de tendências de mercado

- **Detalhes de Ativos**
  - Página detalhada para cada ativo
  - Histórico de preços
  - Informações detalhadas do ativo

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com Server-Side Rendering
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes de UI
- **React Query** - Gerenciamento de estado e cache
- **Recharts** - Biblioteca de gráficos
- **Lucide React** - Ícones
- **Sonner** - Notificações toast

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [url-do-repositório]
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

## 📱 Páginas e Rotas

- **/** - Redireciona para login ou dashboard
- **/login** - Página de login
- **/register** - Página de registro
- **/dashboard** - Dashboard principal com gráficos
- **/details/[symbol]** - Detalhes do ativo específico

## ⚙️ Configurações

### Sessão e Inatividade

- Timeout de inatividade: 5 minuto
- Verificação de atividade: teclado e cliques
- Logout automático após inatividade

### Atualização de Dados

- Gráficos atualizam a cada 5 segundos
- Dados em tempo real do mercado financeiro

## 🔒 Segurança

- Cookies com flags de segurança
- Proteção contra CSRF
- Sessões com httpOnly cookies
- Validação de rotas no middleware

## 🌐 Deploy

O projeto está configurado para deploy na Vercel

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Jorge Peres** - _Desenvolvimento Inicial_
