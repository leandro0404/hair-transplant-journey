// Carrega e exibe a galeria de fotos
async function carregarGaleria() {
    try {
        const response = await fetch('dados.json');
        const dados = await response.json();
        
        const container = document.getElementById('galeria-container');
        
        if (!dados.galeria) {
            container.innerHTML = '<p>Nenhuma foto disponível ainda.</p>';
            return;
        }
        
        let html = '';
        
        // Ordena as datas
        const datas = Object.keys(dados.galeria).sort();
        
        for (const data of datas) {
            const periodo = dados.galeria[data];
            
            html += `
                <div class="galeria-periodo">
                    <h2>${periodo.titulo}</h2>
                    <p class="data-periodo">${formatarData(data)}</p>
            `;
            
            if (periodo.fotos && periodo.fotos.length > 0) {
                html += '<div class="galeria-grid">';
                
                for (const foto of periodo.fotos) {
                    html += `
                        <div class="galeria-item" onclick="abrirModal('${foto.arquivo}', '${foto.legenda}')">
                            <img src="${foto.arquivo}" alt="${foto.legenda}" loading="lazy">
                            <p class="foto-legenda">${foto.legenda}</p>
                        </div>
                    `;
                }
                
                html += '</div>';
            } else {
                html += '<p class="sem-fotos">Fotos ainda não adicionadas</p>';
            }
            
            html += '</div>';
        }
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Erro ao carregar galeria:', error);
        document.getElementById('galeria-container').innerHTML = 
            '<p>Erro ao carregar galeria.</p>';
    }
}

// Formata data YYYY-MM-DD para DD/MM/YYYY
function formatarData(dataStr) {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Abre modal com foto expandida
function abrirModal(src, legenda) {
    const modal = document.getElementById('modal-foto');
    const img = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');
    
    img.src = src;
    caption.textContent = legenda;
    modal.style.display = 'flex';
}

// Fecha modal
function fecharModal() {
    document.getElementById('modal-foto').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', carregarGaleria);
