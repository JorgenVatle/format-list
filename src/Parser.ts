import Clipboardy from 'clipboardy';

export default class Parser {

    protected result: Array<string>;

    public constructor(
        protected text: string = Clipboardy.readSync()
    ) {
        this.result = text.trim().split(/(\r\n|\r|\n)+/);
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