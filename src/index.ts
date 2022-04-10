import Inquirer from 'inquirer';
import CliArgs from './Providers/CliArgs';
import Parser from './Providers/Parser';

(async () => {
    const parser = new Parser();
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
