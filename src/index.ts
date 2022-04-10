import Inquirer from 'inquirer';
import CliArgs from './Providers/CliArgs';
import Logger from './Providers/Logger';
import { Obfuscate } from './Providers/Parser/Obfuscate';
import Parser from './Providers/Parser/Parser';
import { ReadClipboard } from './Providers/Clipboard';

(async () => {
    let text: string;

    switch (CliArgs.source) {
        case 'clipboard':
            text = await ReadClipboard();
            break;
        default:
            Logger.error('Unknown or unsupported source!');
            Logger.suggestHelp();
            return process.exit(1);
    }

    const obfuscate = new Obfuscate(CliArgs.obfuscate);
    const parser = new Parser(obfuscate.apply(text));
    await parser.validateContent();

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
