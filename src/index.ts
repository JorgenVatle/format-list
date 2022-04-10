import Minimist from 'minimist';
import Inquirer, { Question, QuestionCollection } from 'inquirer';
import Parser from './Providers/Parser';

type InputSource = 'clipboard' | 'file' | 'pipe';

interface CliOptions {
    immediate: boolean;
    source: InputSource;
}

const availableSources: InputSource[] = ['clipboard'];
const options = Minimist<CliOptions>(process.argv.splice(2), {
    boolean: ['immediate'],
    string: ['source'],
    alias: {
        i: 'immediate',
        s: 'source',
    }
});

(async () => {
    const source = options.source || 'clipboard';

    if (!availableSources.includes(source)) {
        console.error(`'%s' is not an allowed input source. Please enter one of the following as the '-s' argument: %s`, options.source, availableSources);
    }

    const parser = new Parser();
    await parser.validateTextContent();

    if (options.immediate) {
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
