import fetch from 'node-fetch';

// Função para calcular as estatísticas dos links
export const statsFunction = (arrayLinks) => {
    return new Promise((resolve) => {
        const hrefList = []; // Lista para armazenar os hrefs dos links
        let broken = 0; // Contador de links quebrados

        // Percorre todos os links no array
        arrayLinks.forEach((element) => {
            hrefList.push(element.href); // Adiciona o href na lista
            if (element.ok === false) {
                broken++; // Se o link estiver quebrado (ok = false), incrementa o contador de links quebrados
            }
        });

        const uniqueLinks = new Set(hrefList); // Cria um conjunto para armazenar os hrefs únicos

        const objStats = {
            total: hrefList.length, // Total de links encontrados
            unique: uniqueLinks.size, // Quantidade de links únicos
            broken: broken, // Quantidade de links quebrados
        };

        resolve(objStats); // Retorna o objeto com as estatísticas
    });
};

// Função para filtrar os links de um arquivo
export const filterLinks = (path) => {
    return new Promise((resolve, reject) => {
        const textFile = path.data; // Conteúdo do arquivo
        const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; // Expressão regular para encontrar os links

        const links = textFile.match(regex); // Encontra todos os links no conteúdo do arquivo

        if (links !== null) {
            const arrayLinks = links.map((item) => {
                // Para cada link encontrado, realiza as seguintes operações:

                const valoresSeparados = item.split(']('); // Separa o texto do link
                const texto = valoresSeparados[0].replace('[', ''); // Remove os colchetes do texto
                const href = valoresSeparados[1].replace(')', ''); // Remove os parênteses do href

                const linksObj = {
                    href,
                    texto,
                    file: path.file, // Arquivo em que o link foi encontrado
                };

                return linksObj; // Retorna o objeto do link
            });

            resolve(arrayLinks); // Retorna o array com todos os links encontrados no arquivo
        } else {
            reject(new Error(path.file)); // Rejeita a promessa com um erro informando que nenhum link foi encontrado no arquivo
        }
    });
};

// Função para validar os links fazendo solicitações HTTP
export const validateFunction = (arrayLinks) => {
    return Promise.all(
        arrayLinks.map((element) => {
            // Para cada link no array, realiza as seguintes operações:

            return fetch(element.href) // Faz uma solicitação HTTP para o link
                .then((objlink) => {
                    const objLinkFetch = {
                        ...element,
                        status: objlink.status, // Status da resposta HTTP
                        ok: objlink.ok, // Indicador se a resposta foi bem-sucedida (true) ou não (false)
                    };
                    return objLinkFetch; // Retorna o objeto com as informações do link e a resposta da solicitação HTTP
                })
                .catch((erro) => ({
                    ...element,
                    status: new Error(erro), // Caso ocorra um erro na solicitação HTTP, cria um novo objeto Error com a mensagem de
                    ok: false,
                }));
        })
    );
};