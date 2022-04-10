import Inquirer from 'inquirer';
import CliArgs from './Providers/CliArgs';
import Logger from './Providers/Logger';
import Parser from './Providers/Parser';
import { ReadClipboard } from './Providers/Clipboard';

(async () => {
    let parser: Parser;

    switch (CliArgs.source) {
        case 'clipboard':
            parser = new Parser(await ReadClipboard(), CliArgs.obfuscate);
            break;
        default:
            Logger.error('Unknown or unsupported source!');
            Logger.suggestHelp();
            return process.exit(1);
    }

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
