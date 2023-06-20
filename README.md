# Markdown Links

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Objetivos de aprendizagem](#3-objetivos-de-aprendizagem)
* [4. Considerações gerais](#4-considerações-gerais)
* [5. Funcionalidades](#5-funcionalidades)
* [6. Instruções de uso e comandos](#6-Instruções-de-uso-e-comandos)
* [7. Testes](#7-testes)
***

## 1. Prefácio

[Markdown](https://pt.wikipedia.org/wiki/Markdown) 
O Markdown é uma linguagem de marcação amplamente usada por programadores em plataformas como GitHub, fóruns e blogs. É comum encontrar arquivos Markdown em repositórios, como o README.md. No entanto, esses arquivos podem conter links quebrados ou inválidos, comprometendo a qualidade das informações apresentadas.


## 2. Resumo do projeto

Neste projeto, criei uma ferramenta de linha de comando (CLI) e uma biblioteca personalizada em JavaScript.
Essa ferramenta analisa um arquivo markdown e retorna no terminal a lista de links presentes nele, assim como a rota do arquivo, a URL e o texto do link. É possível também validar e ver as estatísticas de cada link.


## 3. Objetivos de aprendizagem

JavaScript, 
Node.js e
HTTP.


## 4. Considerações gerais

Instalação:

O módulo poder ser instalado com o seguinte comando: 
  `npm install md-links-katia-mendes`


## 5. Funcionalidades

O Markdown Links possui as seguintes funcionalidades:

1- Listagem de links: Exibe os links encontrados nos arquivos Markdown, mostrando a URL, o texto descritivo do link e a rota do arquivo em que o link foi encontrado.

2- Validação de links: Verifica se os links encontrados nos arquivos Markdown estão funcionando corretamente. Retorna o código de resposta HTTP para cada link, indicando se o link é válido ou não. Além disso, exibe uma mensagem de confirmação (OK) para links válidos e uma mensagem de falha (FAIL) para links quebrados.

3- Estatísticas de links: Apresenta estatísticas sobre os links encontrados nos arquivos. Isso inclui o número total de links, o total de links únicos (sem repetição) e o total de links que estão quebrados (não funcionando corretamente).

Essas funcionalidades ajudam a identificar e validar os links presentes nos arquivos Markdown, proporcionando uma melhor compreensão e controle sobre a integridade dos links em um projeto.


## 6. Instruções de uso e comandos

1- Listagem de links

O comportamento padrão ao colocar apenas o caminho do arquivo é devolver apenas os links e suas devidas descrições:
 `md-links ./caminho-do-arquivo/arquivo.md`


2- Validação de links

Ao passar a opção --validate, o módulo faz uma requisição HTTP e verifica se o link funciona ou não retornando seu devido status.Para validar os links em um arquivo de interesse, utilize o comando:
 `md-links ./caminho-do-arquivo/arquivo.md --validate`


3- Estatísticas de links

Ao passar a opção --stats o output será um texto com estatísticas básicas sobre os links, informando a quantidade de links no arquivo e quantos são únicos:

 `md-links ./caminho-do-arquivo/arquivo.md --stats`

Para obter estatísticas que necessitem dos resultados da validação pode combinar --stats e --validate,
ou seja, utilize o comando abaixo:
 `md-links ./caminho-do-arquivo/arquivo.md --stats --validate`


## 7. Testes

A execução dos testes foi feito através do Jest e todos foram aprovados. 





