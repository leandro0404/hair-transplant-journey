#!/usr/bin/env python3
import os
import shutil
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS
from collections import defaultdict
import hashlib

# Caminho das imagens
ORIGEM = "imagens/implante capilar-3-001/implante capilar"
DESTINO_BASE = "imagens"

def extrair_data_exif(caminho_img):
    """Extrai data da foto dos metadados EXIF"""
    try:
        img = Image.open(caminho_img)
        exif = img._getexif()
        if exif:
            for tag_id, valor in exif.items():
                tag = TAGS.get(tag_id, tag_id)
                if tag == "DateTime":
                    return datetime.strptime(valor, "%Y:%m:%d %H:%M:%S")
    except:
        pass
    
    # Fallback: usar nome do arquivo (IMG_20260413_164929509.jpg)
    nome = os.path.basename(caminho_img)
    if nome.startswith("IMG_"):
        try:
            data_str = nome.split("_")[1]  # 20260413
            return datetime.strptime(data_str, "%Y%m%d")
        except:
            pass
    
    return None

def calcular_hash(caminho_img):
    """Calcula hash MD5 da imagem para detectar duplicatas"""
    with open(caminho_img, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

def analisar_fotos():
    """Analisa todas as fotos e organiza por data"""
    fotos_por_data = defaultdict(list)
    hashes = {}
    duplicatas = []
    
    # Listar todas as fotos
    fotos = [f for f in os.listdir(ORIGEM) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    
    print(f"📸 Encontradas {len(fotos)} fotos\n")
    
    for foto in fotos:
        caminho = os.path.join(ORIGEM, foto)
        
        # Verificar duplicatas
        hash_img = calcular_hash(caminho)
        if hash_img in hashes:
            duplicatas.append((foto, hashes[hash_img]))
            continue
        hashes[hash_img] = foto
        
        # Extrair data
        data = extrair_data_exif(caminho)
        if data:
            data_str = data.strftime("%Y-%m-%d")
            fotos_por_data[data_str].append({
                'arquivo': foto,
                'caminho': caminho,
                'data': data,
                'tamanho': os.path.getsize(caminho)
            })
    
    # Ordenar fotos dentro de cada data
    for data in fotos_por_data:
        fotos_por_data[data].sort(key=lambda x: x['data'])
    
    return dict(sorted(fotos_por_data.items())), duplicatas

def sugerir_organizacao(fotos_por_data):
    """Sugere como organizar as fotos"""
    print("📅 FOTOS POR DATA:\n")
    
    for data, fotos in fotos_por_data.items():
        print(f"📆 {data} ({len(fotos)} fotos)")
        
        # Mostrar primeiras 3 fotos como exemplo
        for i, foto in enumerate(fotos[:3]):
            hora = foto['data'].strftime("%H:%M:%S")
            tamanho_mb = foto['tamanho'] / (1024 * 1024)
            print(f"   {i+1}. {foto['arquivo'][:40]}... ({hora}, {tamanho_mb:.1f}MB)")
        
        if len(fotos) > 3:
            print(f"   ... e mais {len(fotos) - 3} fotos")
        print()

def copiar_fotos_organizadas(fotos_por_data, limite_por_data=4):
    """Copia as melhores fotos para estrutura organizada"""
    print(f"\n📁 Organizando fotos (máximo {limite_por_data} por data)...\n")
    
    for data, fotos in fotos_por_data.items():
        # Criar pasta da data
        pasta_data = os.path.join(DESTINO_BASE, data)
        os.makedirs(pasta_data, exist_ok=True)
        
        # Selecionar melhores fotos (maiores = melhor qualidade)
        fotos_selecionadas = sorted(fotos, key=lambda x: x['tamanho'], reverse=True)[:limite_por_data]
        
        for i, foto in enumerate(fotos_selecionadas, 1):
            # Novo nome: frontal, topo, lateral-direita, lateral-esquerda
            angulos = ['frontal', 'topo', 'lateral-direita', 'lateral-esquerda']
            novo_nome = f"{angulos[i-1] if i <= len(angulos) else f'foto-{i}'}.jpg"
            
            destino = os.path.join(pasta_data, novo_nome)
            shutil.copy2(foto['caminho'], destino)
            print(f"✅ {data}/{novo_nome}")

if __name__ == "__main__":
    print("🔍 Analisando fotos...\n")
    
    fotos_por_data, duplicatas = analisar_fotos()
    
    if duplicatas:
        print(f"⚠️  Encontradas {len(duplicatas)} duplicatas (serão ignoradas)\n")
    
    sugerir_organizacao(fotos_por_data)
    
    resposta = input("Deseja copiar as fotos organizadas? (s/n): ")
    if resposta.lower() == 's':
        copiar_fotos_organizadas(fotos_por_data)
        print("\n✨ Fotos organizadas com sucesso!")
    else:
        print("\n❌ Operação cancelada")
