# Painel Oficina — Frontend

Interface web do Painel Oficina, sistema de gestão do fluxo de atendimento de
uma oficina mecânica. Permite acompanhar os veículos em atendimento por status e
gerenciar as peças e serviços de cada um.

Construído como interface mobile-first: o uso principal é pelo celular, no chão
da oficina.

**Sistema em produção:** https://oficina.keystech.dev
<br>**Backend:** https://github.com/GiulioSousa/painel-oficina-api

## Funcionalidades

- Login com sessão persistida em cookie e rota protegida por autenticação
- Painel com contadores por status: pendentes, em espera, prontos e total de ativos
- Listagem de veículos em cards, com filtro por status e alternância para exibir arquivados
- Cadastro e edição de veículo em modal, com os itens editados na mesma tela
- Lançamento, edição e remoção de peças e serviços vinculados ao veículo
- Arquivamento e desarquivamento de veículos
- Alteração de senha pelo próprio usuário
- Mensagens de erro tratadas de forma centralizada, a partir da resposta da API

## Tecnologias

- **React 19** e **TypeScript**
- **Vite** para build e ambiente de desenvolvimento
- **Tailwind CSS 4** para estilização
- **React Router 7** para roteamento e proteção de rotas
- **TanStack Query** para estado de servidor, cache e invalidação
- **Zustand** para estado de interface (filtros e modais)
- **React Hook Form** e **Zod** para formulários e validação
- **Axios** para consumo da API, com credenciais de sessão

## Demonstração

<!-- Adicione os prints aqui, ex.:
![Painel de veículos](docs/painel-veiculos.png)
-->

## Como executar

**Pré-requisito:** Node.js. A [API](https://github.com/GiulioSousa/painel-oficina-api)
precisa estar rodando.

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz apontando para a API:

```
VITE_API_URL=http://localhost:8080
```

3. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`, que é a origem já liberada no CORS
da API.

## Decisões técnicas

**Separação entre estado de servidor e estado de interface.** TanStack Query
cuida dos dados vindos da API — cache, revalidação e invalidação após mutação —
enquanto o Zustand guarda apenas estado de UI, como filtro ativo e modal aberto.
Isso evitou duplicar dados do servidor em store local e manter sincronização
manual.

**Sessão por cookie em vez de token no cliente.** O Axios é configurado com
`withCredentials: true` e o cookie de sessão é gerenciado pelo navegador. Não há
token em `localStorage`, o que remove a superfície de ataque por XSS a
credenciais.

**Edição de itens em diff, não em substituição.** Ao salvar um veículo, a tela
compara os itens originais com os editados e deriva três conjuntos — criar,
atualizar e remover — despachando apenas as chamadas necessárias. A alternativa
seria apagar e recriar todos os itens a cada salvamento.

**Interceptor de erro centralizado.** O Axios normaliza a resposta de erro da API
numa mensagem exibível antes de propagar, evitando tratamento repetido em cada
componente.

## Limitações conhecidas

- Não há testes automatizados. A validação antes da entrega foi manual.
- A paginação da API está implementada no backend, mas a interface consome
  apenas a primeira página; a filtragem por status ocorre no cliente.

## Status

Concluído e em produção. Manutenção conforme demanda do cliente.
