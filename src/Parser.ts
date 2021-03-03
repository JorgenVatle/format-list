import Clipboardy from 'clipboardy';

export default class Parser {

    protected result: Array<string>;

    public constructor(
        protected text: string = Clipboardy.readSync()
    ) {
        this.result = text.trim().split(/(\r\n|\r|\n)+/);
    }

    public print() {
        console.log(this.result);
    }

    public save() {
        return Clipboardy.write(JSON.stringify(this.result));
    }
}