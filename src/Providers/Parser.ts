import Inquirer from 'inquirer';
import { WriteToClipboard } from './Clipboard';

export default class Parser {

    public result: Array<string>;

    public constructor(
        protected text: string,
    ) {
        this.result = this.text.trim()
                          .split(/[\r\n]+/)
                          .map((entry) => entry.trim())
                          .filter((entry) => !!entry);
    }

    public async validateTextContent() {
        let content: boolean;
        try {
            content = JSON.parse(this.text || '');
        } catch (e) {
            return;
        }

        if (!Array.isArray(content)) {
            return;
        }

        console.log(content);

        const { shouldAbort } = await Inquirer.prompt({
            name: 'shouldAbort',
            type: 'confirm',
            message: 'It looks like your clipboard already consists of a JSON array. Skip conversion?'
        });

        if (shouldAbort) {
            process.exit(0);
        }
    }

    public print(header?: string) {
        if (header) {
            console.log(`\n${header}`);
        }

        console.log(this.result);

        if (header) {
            console.log();
        }
    }

    public async save() {
        await WriteToClipboard(JSON.stringify(this.result));
        this.print('Copied the following JSON array to your clipboard:');
    }
}