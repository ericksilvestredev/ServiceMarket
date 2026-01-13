# 🚀 Roadmap de Futuras Funcionalidades - ServiceMarket

Este documento descreve as próximas etapas de evolução para transformar o **ServiceMarket** em uma plataforma de mercado completa e escalável.

## 🛠️ Próximas Implementações Técnicas

### 1. Sistema de Avaliações e Reviews
*   **Backend:** Nova entidade `Review` com nota (1-5) e comentário, associada ao `Service` e `Booking`.
*   **Frontend:** Visualização de estrelas nos cards e formulário de avaliação após a conclusão do serviço.

### 2. Notificações em Tempo Real (WebSockets)
*   **Objetivo:** Notificar o cliente instantaneamente quando o prestador confirmar ou cancelar um agendamento.
*   **Tecnologia:** Spring WebSockets (STOMP) e integrações no Frontend.

### 3. Integração de Pagamentos
*   **Objetivo:** Permitir o pagamento antecipado ou caução através da plataforma.
*   **Tecnologia:** Integração com as APIs do **Stripe** ou **Mercado Pago**.

### 4. Filtros Avançados e Busca Geográfica
*   **Filtros:** Busca por categoria, faixa de preço e avaliação mínima.
*   **Geolocalização:** Integração com Google Maps API para mostrar prestadores mais próximos do endereço do cliente.

### 5. Chat Interno
*   **Objetivo:** Permitir que cliente e prestador alinhem detalhes do serviço sem sair da plataforma.
*   **Tecnologia:** Sistema de mensageria assíncrona.

### 6. Dashboard Administrativo (Power User)
*   **Objetivo:** Um painel centralizado para o perfil `ADMIN` moderar serviços, banir usuários mal-intencionados e visualizar métricas globais da plataforma.

### 7. Perfil Detalhado do Prestador (Portfólio)
*   **Objetivo:** Uma página dedicada para cada prestador com galeria de fotos de trabalhos anteriores, biografia e lista de todos os serviços oferecidos.

### 8. PWA (Progressive Web App)
*   **Objetivo:** Transformar o frontend em um App que pode ser instalado no celular, permitindo notificações push nativas.

---
*Documento criado para guiar a evolução contínua da Engenharia do Projeto.*
