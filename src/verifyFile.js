//O módulo fs é importado para acessar funcionalidades de sistema de arquivos
import { readFile, stat, readdir } from 'fs/promises';
//O módulo fs/promises é importado para obter versões assíncronas das funções do fs, que retornam promessas.
import path from 'path';
//O módulo path é importado para trabalhar com caminhos de arquivos e diretórios.

const lerDiretorio = (caminhoDiretorio) => {
    //usa o método readdir do módulo fs/promises para listar os arquivos dentro do diretório. 
    return readdir(caminhoDiretorio)
        .then((files) => {
            //filtra apenas os arquivos com extensão .md
            const reading = files.filter(file => {
                return path.extname(file) === '.md';
                //o método map é usado para mapear cada arquivo em uma promessa
                // de leitura do arquivo usando a função readFile do módulo fs/promises
            }).map(file => {
                return readFile(path.resolve(caminhoDiretorio, file));
            });
            // a função retorna uma promessa que será resolvida com um array contendo o conteúdo de cada arquivo lido.
            return Promise.all(reading);
        });
}

const lerArquivo = (file) => {
    //verifica se a extensão do arquivo é .md usando o método path.extname.
    // Se não for, a função rejeita a promessa com um erro.
    const isMd = path.extname(file) === '.md';
    if (!isMd) {
        return Promise.reject(new Error('O arquivo fornecido não é .md'));
    }
    // Se for um arquivo .md, a função usa o método readFile para ler o conteúdo do arquivo e retorna uma 
    //promessa que será resolvida com um objeto contendo o nome do arquivo e o seu conteúdo convertido para uma string.
    return readFile(file)
        .then(data => {
            return { file, data: data.toString() };
        });
}

export const read = async (pathFile) => {
    const statsObj = await stat(pathFile);
    if (statsObj.isDirectory()) {
        return lerDiretorio(pathFile);
    } else {
        return lerArquivo(pathFile);
    }
}

//Este código tem como objetivo ler arquivos e diretórios, especialmente arquivos com extensão .md (Markdown)
 //e obter seus conteúdos para serem usados em outras partes do programa.
