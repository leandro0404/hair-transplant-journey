// Carrega dados do JSON e atualiza a página de tratamento
async function carregarDados() {
    try {
        const response = await fetch('dados.json');
        const dados = await response.json();
        
        // Atualizar informações do paciente
        document.getElementById('nome-paciente').textContent = 
            `${dados.paciente.nome} (${dados.paciente.idade} anos)`;
        
        // Atualizar datas
        document.getElementById('data-inicio').textContent = dados.tratamento.dataInicio;
        document.getElementById('data-cirurgia').textContent = dados.tratamento.dataCirurgia;
        document.getElementById('cirurgia-data').textContent = dados.cirurgia.data;
        
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
        
        // Renderizar medicamentos
        const medicamentosContainer = document.getElementById('medicamentos-container');
        medicamentosContainer.innerHTML = dados.tratamento.medicamentos.map(med => `
            <div class="info-box">
                <h3>${med.nome}</h3>
                <p><strong>Dosagem:</strong> ${med.dosagem}</p>
                <p><strong>Frequência:</strong> ${med.frequencia}</p>
                <p><strong>Horário:</strong> ${med.horario}</p>
                <p><strong>Tipo:</strong> ${med.tipo}</p>
            </div>
        `).join('');
        
        // Renderizar detalhes da cirurgia
        const cirurgiaDetalhes = document.getElementById('cirurgia-detalhes');
        cirurgiaDetalhes.innerHTML = `
            <li>Técnica: ${dados.cirurgia.tecnica}</li>
            <li>Número de enxertos: ${dados.cirurgia.numeroEnxertos || 'A definir'}</li>
            <li>Área doadora: ${dados.cirurgia.areaDoadora}</li>
            <li>Área receptora: ${dados.cirurgia.areaReceptora}</li>
            <li>Clínica: ${dados.cirurgia.clinica || 'A definir'}</li>
            <li>Médico: ${dados.cirurgia.medico || 'A definir'}</li>
        `;
        
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
