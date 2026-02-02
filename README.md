# 🛍️ Ombela Alpha
 Sobre o Projeto

O Ombela Market é um marketplace desenvolvido como parte de um projeto universitário em Engenharia de Software. O sistema demonstra a aplicação prática de:

 *Princípios SOLID*
 *Padrões de Design (Design Patterns)*
 *Arquitetura em Camadas*
 *Boas Práticas de Código*
 *UX/UI Moderna*


 Identidade Visual

 Paleta de Cores Ombela Market

 *Lilás Principal:* `#7C5CFA` - Identidade da marca
 *Laranja CTA:* `#FF8C42` - Chamadas de ação (conversão)
 *Neon Premium:* `#FF4DFF` - Realces especiais
 *Neutros:* Para legibilidade e equilíbrio

Padrões de Design Aplicados

 *Observer Pattern*
Contextos (Context API): CartContext, AuthContext, NotificationContext
Vantagem: Componentes reagem automaticamente a mudanças de estado

 *Singleton Pattern*
Services: ProductService, AuthService, OrderService
Vantagem: Instância única garantindo consistência

Princípios SOLID Aplicados

 *S - Single Responsibility Principle (SRP)*
Cada componente tem uma responsabilidade única
Ex: `ProductCard` apenas exibe produto, não gerencia carrinho

 *O - Open/Closed Principle (OCP)*
Components abertos para extensão, fechados para modificação
Ex: Novos tipos de notificações podem ser adicionados sem alterar `NotificationToast`

 *D - Dependency Inversion Principle (DIP)*
UI depende de abstrações (Services, Contexts)
Ex: `Catalog` usa `ProductService`, não dados diretos

 Funcionalidades Implementadas

 *Autenticação*
Login simulado
Gestão de sessão via Context
Proteção de rotas (simulada)

 *Catálogo de Produtos*
Listagem completa
Filtros por categoria
Cards interativos

 *Carrinho de Compras*
Adicionar/remover produtos
Atualizar quantidades
Cálculo automático de total

 *Checkout*
Formulário de dados
Resumo de compra
Simulação de pagamento

 *Encomendas*
Histórico de pedidos
Estados: Pendente, Enviado, Entregue
Cores diferenciadas por estado

*Notificações*
Toast notifications
Feedback visual imediato
Auto-desaparece após 3s

