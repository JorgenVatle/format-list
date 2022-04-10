import Minimist from 'minimist';

type InputSource = 'clipboard' | 'file' | 'pipe';

interface CliOptions {
    immediate: boolean;
    source: InputSource;
}

export const availableSources: InputSource[] = ['clipboard'];
export const options = Minimist<CliOptions>(process.argv.splice(2), {
    boolean: ['immediate'],
    string: ['source'],
    alias: {
        i: 'immediate',
        s: 'source',
    }
});
