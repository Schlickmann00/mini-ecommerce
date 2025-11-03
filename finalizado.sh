#!/bin/bash

# Nome da branch
branch_name="finalizado"

# Mensagem do commit
commit_msg="Finalizado"

# Verifica se há alterações para commit
if git diff-index --quiet HEAD --; then
    echo "Nenhuma alteração detectada. Nada a commitar."
    exit 0
fi

# Cria a branch e muda para ela
git checkout -b "$branch_name"

# Adiciona todas as alterações
git add .

# Faz o commit
git commit -m "$commit_msg"

# Envia para o remoto
git push -u origin "$branch_name"

echo "Projeto todo commitado na branch '$branch_name' com sucesso!"
