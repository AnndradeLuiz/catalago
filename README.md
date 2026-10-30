# Catálogo Interativo de Produtos

Aplicação Web desenvolvida como trabalho prático da disciplina de **Programação Web** (Trabalho em Grupo 1), com o objetivo de construir uma aplicação frontend para consumo de API pública com interface dinâmica, pesquisa e persistência de dados.

---

## 👥 Integrantes do Grupo (Grupo 01)

- **Davi da Silva Souza**
- **João Gabriel Vasconcelos Trindade**
- **Luiz Eduardo Eleutério de Andrade**

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído exclusivamente com tecnologias web nativas, sem dependência de bibliotecas ou frameworks externos:

- **HTML5**: Estrutura semântica (`<header>`, `<main>`, `<section>`, `<form>`).
- **CSS3**: Estilos customizados, layout responsivo com CSS Grid e Flexbox, e estilização de modal.
- **JavaScript (ES6+)**: Manipulação dinâmica do DOM, funções assíncronas com `async/await`, eventos de formulário e clique.
- **Fetch API**: Requisições HTTP (método GET) assíncronas à API pública.
- **LocalStorage**: Persistência no navegador dos produtos adicionados aos favoritos.
- **API Externa**: [DummyJSON Products API](https://dummyjson.com/products).

---

## ✨ Funcionalidades Implementadas

1. **Listagem de Produtos**:
   - Consumo de produtos via requisição HTTP assíncrona.
   - Renderização dinâmica de cartões (cards) contendo imagem, título e preço.
2. **Pesquisa por Nome**:
   - Campo de busca integrado em formulário semântico com evento `submit`.
   - Consulta dinâmica na API utilizando o endpoint `/search?q=`.
3. **Detalhes do Produto**:
   - Modal interativo para exibir informações adicionais (categoria, descrição detalhada, nota/avaliação e imagem ampliada).
   - Fechamento prático através do botão fechar (&times;), clique fora do modal ou tecla `Esc`.
4. **Gerenciamento de Favoritos**:
   - Adicionar e remover produtos da lista de favoritos com atualização instantânea na interface.
   - Criação de objetos JavaScript para representar os favoritos.
   - Persistência contínua com `localStorage` (`JSON.stringify` e `JSON.parse`), mantendo os itens mesmo ao recarregar ou fechar a página.
5. **Feedback Visual e Tratamento de Erros**:
   - Mensagem de status informativa durante o carregamento dos dados.
   - Tratamento de falhas de comunicação com o servidor e indisponibilidade de rede.
   - Mensagens claras quando nenhum produto ou favorito for encontrado.

---

## 📁 Estrutura do Projeto

```text
catalago/
├── index.html                # Estrutura HTML semântica principal
├── README.md                 # Documentação e especificações do projeto
├── src/
│   ├── js/
│   │   └── script.js         # Lógica da aplicação, consumo de API e DOM
│   └── styles/
│       └── style.css         # Estilização visual e responsividade
└── Trabalho_Grupo_01_Proposta.docx.pdf # Proposta avaliativa
```

---

## 💻 Como Executar o Projeto

Como o projeto é 100% frontend estático, não requer instalação de pacotes ou servidores de backend:

1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   ```
2. Abra a pasta do projeto no seu explorador de arquivos ou terminal.
3. Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Google Chrome, Firefox, Edge, etc.):
   - Basta dar um duplo clique sobre o arquivo `index.html`, ou
   - Utilizar uma extensão como o **Live Server** no VS Code para executá-lo em um servidor local de desenvolvimento.
