import Inquirer from 'inquirer';
import CliArgs, { AvailableInputSources } from './Providers/CliArgs';
import Parser from './Providers/Parser';

(async () => {
    const source = CliArgs.source || 'clipboard';

    if (!AvailableInputSources.includes(source)) {
        console.error(`'%s' is not an allowed input source. Please enter one of the following as the '-s' argument: %s`, CliArgs.source, AvailableInputSources);
    }

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
