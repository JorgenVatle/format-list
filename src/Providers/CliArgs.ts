import { parse as Parser } from 'ts-command-line-args';
import Chalk from 'chalk';

const AvailableInputSources = ['clipboard'];
const Package = require('../../package.json');

export default Parser<CliOptions>({
    source: {
        type: (value: InputSource) => {
            if (!AvailableInputSources.includes(value)) {
                console.error(
                    `\n${Chalk.bgRed(`Oops, ${Chalk.underline(value)} not a supported input source!`)}\n\nTry the following instead:\n%s\n\nOr for more help:\n%s`,
                    `$\t jippy --source ${Chalk.yellowBright(AvailableInputSources[0])}`,
                    `$\t jippy --help`,
                );
                process.exit(22);
            }

            return value;
        },
        alias: 's',
        defaultValue: 'clipboard',
        description: `Whether we should grab text from your clipboard or a file`,
        typeLabel: Chalk.yellowBright(AvailableInputSources.join(', '))
    },
    immediate: {
        type: Boolean,
        alias: 'i',
        defaultValue: false,
        description: 'Skip the confirmation prompt - just push directly to the clipboard and hope for the best! 🙏'
    },
    help: {
        type: Boolean,
        description: 'Display this prompt - listing all available options.'
    }
}, {
    helpArg: 'help',
    headerContentSections: [
        {
            header: Package.name,
            content: Package.description,
        }
    ]
});

type InputSource = typeof AvailableInputSources[number];
interface CliOptions {
    immediate: boolean;
    source: InputSource;
    help: boolean;
}

