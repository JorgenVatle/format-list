import { parse as Parser } from 'ts-command-line-args';

export const AvailableInputSources = ['clipboard'];
const Package = require('../../package.json');

export default Parser<CliOptions>({
    source: {
        type: (value: InputSource) => {
            if (AvailableInputSources.includes(value)) {
                throw new Error('This is not a valid input source!');
            }
            return value;
        },
        alias: 's',
        defaultValue: 'clipboard',
        description: `Whether we should grab text from your clipboard or a file`,
        typeLabel: AvailableInputSources.join(', ')
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

