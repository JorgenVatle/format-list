import Chalk from 'chalk';
import Clipboardy from 'clipboardy';
import Inquirer from 'inquirer';
import CliArgs from './Providers/CliArgs';
import Logger from './Providers/Logger';
import Parser from './Providers/Parser';

(async () => {
    let parser: Parser;

    switch (CliArgs.source) {
        case 'clipboard':
            parser = new Parser(Clipboardy.readSync());
            break;
        default:
            Logger.error('Unknown or unsupported source!');
            Logger.suggestHelp();
            return process.exit(1);
    }

    await parser.validateTextContent();

    if (CliArgs.immediate) {
        await parser.save();
        return;
    }

    parser.print();

    const prompt = await Inquirer.prompt({
        name: 'shouldCopy',
        type: 'confirm',
        message: `Detected ${parser.result.length} entries. Copy the above JSON to your clipboard?`
    });

    if (prompt.shouldCopy) {
        await parser.save();
    }
})();
