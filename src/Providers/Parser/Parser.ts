import { WriteToClipboard } from '../Clipboard';
import { Validator } from './Validator';

export default class Parser {

    public result: Array<string>;

    public constructor(protected text: string) {
        this.result = text
            .trim()
            .split(/[\r\n]+/)
            .map((entry) => entry.trim())
            .filter((entry) => !!entry);
    }

    public async validateContent() {
        const validator = new Validator(this.text);

        if (validator.isAlreadyFormatted()) {
            await validator.confirmReformatting();
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