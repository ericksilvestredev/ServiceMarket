# ServiceMarket 🚀

O **ServiceMarket** é um marketplace de serviços profissionais (encanadores, eletricistas, etc.) desenvolvido para demonstrar habilidades fullstack com uma arquitetura moderna e design premium.

## 🛠️ Stack Tecnológica

- **Frontend:** React + Vite + Tailwind CSS + Framer Motion + Lucide Icons
- **Backend:** Java 17 + Spring Boot 3 + Spring Security (JWT)
- **Banco de Dados:** PostgreSQL via Docker
- **Comunicação:** Axios com Interceptors

## 📁 Estrutura Organizada

```text
ServiceMarket/
├── backend/                # API REST Spring Boot
│   ├── src/main/java/      # Modelos, Repositórios, DTOs, Services e Controllers
│   ├── src/main/security/  # Configuração de Segurança Stateless (JWT)
│   └── src/main/resources/ # application.properties e data.sql (Seeds)
├── frontend/               # Single Page Application (SPA)
│   ├── src/components/     # Navbar, Hero, Services, Footer
│   ├── src/pages/          # Home, Login, Dashboard do Prestador
│   ├── src/context/        # AuthContext (Gestão de Login)
│   ├── src/api.js          # Configuração Axios (Porta 8081)
│   └── src/index.css       # Design System (Tailwind v4)
├── docker-compose.yml      # Infraestrutura do PostgreSQL
├── .gitignore              # Regras globais de exclusão
└── README.md               # Documentação principal
```

## ✨ Principais Funcionalidades

- [x] **Segurança:** Autenticação via JWT com Roles (ADMIN, CLIENT, PROVIDER).
- [x] **Dashboard do Prestador:** Gestão de status de agendamentos (Confirmar/Cancelar).
- [x] **Gestão de Agendamentos:** Clientes podem solicitar e acompanhar serviços.
- [x] **Regras de Negócio:** Validação de conflito de horário e proteção de rotas (@PreAuthorize).
- [x] **Testes de Qualidade:** Testes unitários para lógica crítica de agendamento.
- [x] **Design Premium:** Glassmorphism, animações suaves e interface responsiva.

## 🚀 Como Executar o Projeto

### 1. Banco de Dados (Docker)
Na raiz do projeto, suba o container do PostgreSQL:
```bash
docker-compose up -d
```

### 2. Backend (Spring Boot)
Navegue até a pasta `backend` e inicie o servidor (Porta **8081**):
```bash
./mvnw spring-boot:run
```

### 3. Frontend (React)
Navegue até a pasta `frontend`, instale as dependências e inicie o dev server:
```bash
npm install
npm run dev
```

---

### 🔑 Credenciais de Teste
- **Perfil Prestador:** `carlos@provider.com` / `provider123`
- **Perfil Cliente:** `ana@client.com` / `client123`

---
*Organizado e modularizado conforme as melhores práticas de Engenharia de Software.*
