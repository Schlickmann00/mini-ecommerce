
````markdown
# MiniEcommerce

MiniEcommerce é um projeto acadêmico desenvolvido com Angular que simula um sistema de e-commerce. Ele inclui funcionalidades básicas como catálogo de produtos, carrinho de compras, checkout e, opcionalmente, autenticação de usuários via Firebase.

O objetivo é demonstrar conceitos de desenvolvimento web com Angular, manipulação de dados, integração com backend e boas práticas de organização de código.

---

## Tecnologias utilizadas

- **Angular 20.3.2** – Framework principal para desenvolvimento frontend.
- **TypeScript** – Linguagem principal para lógica e tipagem.
- **HTML / CSS / SCSS** – Estrutura e estilo das páginas.
- **Firebase** (opcional) – Para autenticação e persistência de dados.
- Outras dependências conforme listadas no `package.json`.

---

## Funcionalidades principais

- Exibição de produtos em catálogo.
- Visualização de detalhes de cada produto.
- Adição e remoção de itens do carrinho.
- Simulação de checkout.
- Autenticação de usuários (opcional, via Firebase).
- Painel administrativo básico (dependendo da implementação).

---

## Instalação e execução local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Schlickmann00/mini-ecommerce.git
   cd mini-ecommerce
````

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   ng serve
   ```

4. **Acesse a aplicação**
   Abra o navegador e vá para: `http://localhost:4200/`.
   A aplicação irá recarregar automaticamente sempre que você modificar algum arquivo fonte.

5. **Build para produção** (opcional)

   ```bash
   ng build
   ```

   O build de produção será gerado na pasta `dist/`, otimizado para desempenho.

---

## Estrutura do projeto

```
/public
/src
  /app          # Componentes, serviços, módulos
  /assets       # Imagens, ícones e arquivos estáticos
  /environments # Configurações de ambiente
.gitignore
package.json
angular.json
tsconfig.json
firebase.json
```

---

## Comandos úteis do Angular CLI

* **Gerar novo componente**

  ```bash
  ng generate component component-name
  ```
* **Gerar outros schematics**

  ```bash
  ng generate --help
  ```
* **Executar testes unitários**

  ```bash
  ng test
  ```
* **Executar testes end-to-end**

  ```bash
  ng e2e
  ```

Para mais detalhes, consulte [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

## Contribuição

Contribuições são bem-vindas!

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature ou correção:

   ```bash
   git checkout -b feature/nova-feature
   ```
3. Faça commits claros das alterações realizadas.
4. Abra um Pull Request descrevendo suas mudanças.

---

## Autor

* Schlickmann00
```
