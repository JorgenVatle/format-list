import Clipboardy from 'clipboardy';

export default class Parser {

    protected result: Array<string>;

    public constructor(
        protected text: string,
    ) {
        try {
            this.text = Clipboardy.readSync();
            console.log(this.text)
        } catch (e) {
            console.error('Could not read from clipboard! Are you sure the content of your clipboard is a UTF-8 encoded string?')
            process.exit(1);
        }
        this.result = this.text.trim().split(/(\r\n|\r|\n)+/);
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
        await Clipboardy.write(JSON.stringify(this.result));
        this.print('Copied the following to your clipboard:');
    }
}