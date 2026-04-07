// Carrega dados do JSON e atualiza a página
async function carregarDados() {
    try {
        const response = await fetch('dados.json');
        const dados = await response.json();
        
        // Atualizar informações do paciente
        document.getElementById('nome-paciente').textContent = dados.paciente.nome;
        document.getElementById('info-paciente').textContent = 
            `${dados.paciente.nome} (${dados.paciente.idade} anos, nascido em ${dados.paciente.dataNascimento})`;
        
        // Atualizar datas
        document.getElementById('data-inicio').textContent = dados.tratamento.dataInicio;
        document.getElementById('data-cirurgia').textContent = dados.tratamento.dataCirurgia;
        document.getElementById('timeline-inicio').textContent = dados.tratamento.dataInicio;
        document.getElementById('timeline-cirurgia').textContent = dados.tratamento.dataCirurgia;
        
        // Calcular dias
        const hoje = new Date();
        const dataInicio = parseData(dados.tratamento.dataInicio);
        const dataCirurgia = parseData(dados.tratamento.dataCirurgia);
        
        const diasTratamento = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));
        const diasCirurgia = Math.floor((dataCirurgia - hoje) / (1000 * 60 * 60 * 24));
        
        document.getElementById('dias-tratamento').textContent = `${diasTratamento} dias`;
        document.getElementById('dias-cirurgia').textContent = diasCirurgia > 0 
            ? `${diasCirurgia} dias` 
            : 'Cirurgia realizada';
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Converte data DD/MM/YYYY para objeto Date
function parseData(dataStr) {
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(ano, mes - 1, dia);
}

// Carrega dados quando a página carregar
document.addEventListener('DOMContentLoaded', carregarDados);
