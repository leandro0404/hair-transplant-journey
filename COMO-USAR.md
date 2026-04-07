# 🔧 Como Usar Este Template

Este site é um template reutilizável para documentar tratamentos capilares. Todos os dados pessoais são carregados do arquivo `dados.json`.

## 📝 Personalizando para Outro Paciente

Para usar este template para outra pessoa, basta editar o arquivo **`dados.json`**:

### Estrutura do dados.json

```json
{
  "paciente": {
    "nome": "Nome Completo",
    "dataNascimento": "DD/MM/AAAA",
    "idade": 00
  },
  "tratamento": {
    "dataInicio": "DD/MM/AAAA",
    "dataCirurgia": "DD/MM/AAAA",
    "medicamentos": [
      {
        "nome": "Nome do Medicamento",
        "dosagem": "0.0mg",
        "frequencia": "1x ao dia",
        "horario": "HH:MM",
        "tipo": "Tipo do medicamento"
      }
    ]
  },
  "cirurgia": {
    "data": "DD/MM/AAAA",
    "tecnica": "FUE/FUT/DHI",
    "numeroEnxertos": 0000,
    "areaDoadora": "Descrição",
    "areaReceptora": "Descrição",
    "clinica": "Nome da clínica",
    "medico": "Nome do médico"
  }
}
```

## 🎯 Dados Atuais

**Paciente:** Leandro Silveira  
**Data de Nascimento:** 04/04/1987  
**Idade:** 39 anos

**Tratamento:**
- Início: 11/03/2026
- Cirurgia: 04/05/2026

**Medicamentos:**
- Dutasterida 0.5mg - 1x ao dia às 08:00
- Minoxidil Oral 2.5mg - 1x ao dia às 08:00

## 🚀 Como Funciona

1. O site carrega automaticamente os dados do `dados.json`
2. Calcula automaticamente os dias de tratamento e dias até a cirurgia
3. Renderiza todas as informações dinamicamente
4. Para mudar os dados, basta editar o JSON - não precisa mexer no HTML!

## 📁 Arquivos Importantes

- **dados.json** - Todos os dados do paciente (EDITE AQUI!)
- **index.html** - Página inicial
- **meu-tratamento.html** - Página de detalhes do tratamento
- **script.js** - Lógica para index.html
- **tratamento.js** - Lógica para meu-tratamento.html

## 🔄 Atualizando Dados

Sempre que quiser atualizar informações:
1. Edite o `dados.json`
2. Salve o arquivo
3. Recarregue a página no navegador

Não precisa mexer em nenhum código HTML ou JavaScript!
