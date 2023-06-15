import mdLinks from './src/md-links.js';
import { statsFunction } from './src/verifyLinks.js';
import process from 'process';

//Importa o módulo process, que fornece informações e funcionalidades relacionadas ao processo em execução.
import chalk from 'chalk';

//Atribui à variável args os argumentos de linha de comando passados quando o script é executado.
const args = process.argv;
//Atribui à variável filePath o terceiro argumento passado na linha de comando, que é esperado ser o caminho para um arquivo.
const filePath = args[2];
// Verifica se o filePath não está vazio ou não foi fornecido.
if (!filePath) {
    //Imprime uma mensagem de erro no console indicando que o caminho para um arquivo não foi fornecido.
    console.error('./src/pasta/exemplo.md');
    //Encerra o processo com um código de saída igual a 1, indicando um erro.
    process.exit(1);
}
//Cria um objeto chamado options contendo duas propriedades: validate e stats.
const options = {
    validate: args.includes('--validate'),
    stats: args.includes('--stats')
};

const showStats = (arrayLinks) => {

    statsFunction(arrayLinks)
        .then(objStats => {
            console.log('Total: ', objStats.total);
            console.log('Unique: ', objStats.unique);

            if (process.argv[4] === '--validate') {
                console.log('Broken: ', objStats.broken);
            }
        })
}

const showValidate = (arrayLinks) => {
    arrayLinks.forEach(objlink => {
        let ok;
        let icon;
        if (objlink.ok) {
            ok = chalk.green('OK');
            icon = chalk.green('\u2714');
        }
        else {
            ok = chalk.red('FAIL');
            icon = chalk.red('\u2717');
        }
        console.log(icon, chalk.grey(objlink.file), chalk.white(objlink.href), ok, chalk.white(objlink.status), chalk.grey(objlink.text))
    })
}

const showLinksFile = (arrayLinks) => {
    arrayLinks.forEach(element => {
        console.log(chalk.green('\u2714'), chalk.grey(element.file), chalk.green(element.href), chalk.grey(element.text));
    });
}

mdLinks(process.argv[2], options)
    .then(result => {
        if (options.stats) {
            showStats(result);
        }
        else if (options.validate) {
            showValidate(result);
        }
        else if (!options.validate) {
            showLinksFile(result);
        } else {
            console.log(`Comando inválido.`);
        }
    })
    .catch(erro => {
        if (erro.code === 'ENOENT') {
            console.log(`${chalk.red('\u2717')} Não existe tal arquivo ou diretório`);
        }
        console.log(erro.message)
    })


