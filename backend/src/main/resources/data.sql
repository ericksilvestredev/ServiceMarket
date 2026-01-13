-- Dados Iniciais (Seeds)
-- Usando NoOpPasswordEncoder (texto plano)

-- 1. Inserir Usuários
INSERT INTO users (id, email, password, full_name, profile) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'admin@servicemarket.com', 'admin123', 'Sistema Admin', 'ADMIN'),
('550e8400-e29b-41d4-a716-446655440001', 'carlos@provider.com', 'provider123', 'Carlos Silva Elétrica', 'PROVIDER'),
('550e8400-e29b-41d4-a716-446655440002', 'ana@client.com', 'client123', 'Ana Oliveira', 'CLIENT')
ON CONFLICT (email) DO NOTHING;

-- 2. Inserir Serviços
INSERT INTO services (id, name, description, price, provider_id) VALUES 
('660e8400-e29b-41d4-a716-446655440000', 'Instalação de Chuveiro', 'Instalação completa com teste de carga.', 150.00, '550e8400-e29b-41d4-a716-446655440001'),
('660e8400-e29b-41d4-a716-446655440001', 'Revisão Elétrica Preventiva', 'Checkup completo da fiação e disjuntores.', 250.00, '550e8400-e29b-41d4-a716-446655440001')
ON CONFLICT DO NOTHING;
