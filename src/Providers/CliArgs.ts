import { parse as Parser } from 'ts-command-line-args';

export const AvailableInputSources = ['clipboard'];

export default Parser<CliOptions>({
    source: {
        type: (value: InputSource) => {
            if (AvailableInputSources.includes(value)) {
                throw new Error('This is not a valid input source!');
            }
            return value;
        },
        alias: 's',
        typeLabel: `Input source. Can be one of the following; ${AvailableInputSources.join(', ')}`,
        defaultValue: 'clipboard',
    },
    immediate: {
        type: Boolean,
        alias: 'i',
        defaultValue: false,
        typeLabel: 'Skip the confirmation prompt - just push directly to the clipboard and hope for the best! 🙏'
    }
});

type InputSource = typeof AvailableInputSources[number];
interface CliOptions {
    immediate: boolean;
    source: InputSource;
}

