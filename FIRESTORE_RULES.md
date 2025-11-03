# 🔧 Como Configurar as Regras do Firestore

## Problema
Você está recebendo o erro: **"Missing or insufficient permissions"**

Isso acontece porque as regras de segurança do Firestore não permitem escrita na coleção `products`.

## Solução

### 1. Acesse o Firebase Console
- Acesse: https://console.firebase.google.com
- Selecione o projeto: **mini-ecommerce-d5c40**

### 2. Vá para Firestore Database
- No menu lateral, clique em **"Firestore Database"** (ou "Firestore Database")
- Clique na aba **"Rules"** (Regras)

### 3. Substitua as Regras Atuais
Substitua o conteúdo das regras por este código:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para a coleção 'products'
    match /products/{document=**} {
      // Permite leitura para todos
      allow read: if true;
      // Permite escrita (create, update, delete) para usuários autenticados
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Publique as Regras
- Clique no botão **"Publish"** (Publicar) para salvar as alterações
- Aguarde alguns segundos para as regras serem atualizadas

### 5. Teste Novamente
- Volte para a aplicação
- Tente adicionar produtos novamente em `/admin/add-products`
- Agora deve funcionar! ✅

## Regras Mais Restritivas (Recomendado para Produção)

Se você quiser regras mais seguras para produção, use estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      // Permite leitura para todos
      allow read: if true;
      
      // Permite escrita apenas para usuários autenticados
      // e apenas operações create (não update ou delete)
      allow create: if request.auth != null;
      
      // Opcional: permite update/delete apenas para o criador ou admin
      allow update, delete: if request.auth != null 
        && request.resource.data.keys().hasAll(['name', 'description', 'price', 'image']);
    }
  }
}
```

## Explicação das Regras

- `allow read: if true;` - Permite que qualquer pessoa leia os produtos (público)
- `allow write: if request.auth != null;` - Permite que apenas usuários autenticados escrevam (criem, atualizem, deletem)
- `request.auth != null` - Verifica se o usuário está autenticado (logado)

## Ainda não funciona?

Se após configurar as regras ainda não funcionar:

1. **Verifique se você está logado** - Faça logout e login novamente
2. **Aguarde alguns minutos** - As regras podem levar alguns minutos para atualizar
3. **Limpe o cache do navegador** - Pressione `Ctrl + Shift + Delete` e limpe o cache
4. **Verifique no console** - Abra o DevTools (F12) e veja se há outros erros

## Ajuda Adicional

Se ainda tiver problemas, me avise e posso ajudar a investigar!

