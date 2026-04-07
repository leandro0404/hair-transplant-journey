# 📸 Organização de Fotos

## Estrutura de Pastas

As fotos devem ser organizadas por data no formato `YYYY-MM-DD`:

```
imagens/
├── 2026-03-11/          # Início do tratamento
│   ├── frontal.jpg
│   ├── topo.jpg
│   ├── lateral-direita.jpg
│   └── lateral-esquerda.jpg
├── 2026-04-11/          # 1 mês de tratamento
├── 2026-05-04/          # Dia da cirurgia
├── 2026-05-11/          # 1 semana pós-op
├── 2026-06-04/          # 1 mês pós-op
├── 2026-08-04/          # 3 meses pós-op
├── 2026-11-04/          # 6 meses pós-op
└── 2027-05-04/          # 12 meses - resultado final
```

## Como Adicionar Fotos

1. Crie a pasta com a data no formato `YYYY-MM-DD`
2. Adicione as fotos na pasta
3. Edite o `dados.json` na seção `galeria`:

```json
"2026-03-11": {
  "titulo": "Início do Tratamento - Fotos Iniciais",
  "fotos": [
    {
      "arquivo": "imagens/2026-03-11/frontal.jpg",
      "legenda": "Vista frontal"
    },
    {
      "arquivo": "imagens/2026-03-11/topo.jpg",
      "legenda": "Vista do topo"
    }
  ]
}
```

## Dicas para Fotos

- Use sempre o mesmo ângulo e iluminação
- Tire fotos de: frontal, topo, laterais, posterior
- Mantenha a mesma distância da câmera
- Use luz natural quando possível
- Tire fotos com o cabelo seco
- Mantenha o mesmo comprimento de cabelo para comparação

## Privacidade

Por padrão, as fotos **não são versionadas no Git**. Se quiser versionar, remova a linha `# imagens/` do arquivo `.gitignore`.
