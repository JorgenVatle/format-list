import Inquirer from 'inquirer';
import { CliOptions } from './CliArgs';
import { WriteToClipboard } from './Clipboard';

export default class Parser {

    public result: Array<string>;

    public constructor(
        protected text: string,
        protected obfuscates?: CliOptions['obfuscate'],
    ) {
        this.result = new Obfuscate(obfuscates)
            .apply(text)
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


class Obfuscate {
    protected static regex = {
        email: /(?<emailPrefix>[\w\d.-]{2,3}).*(?<emailSuffix>[\w\d.-]{2,3})(?:\+.*)?@(?<domainPrefix>[\w\d.-]{2,3}).*(?<domainSuffix>\.[\w\d.-]{2,})/
    }

    constructor(
        protected obfuscates?: CliOptions['obfuscate']
    ) {};

    public apply(text: string) {
        if (!this.obfuscates) {
            return text;
        }

        let result = text;

        this.obfuscates.forEach((obfuscate) => {
            switch (obfuscate) {
                case 'emails':
                    result = result.replace(Obfuscate.regex.email, '$<emailPrefix>***$<emailSuffix>@$<domainPrefix>***$<domainSuffix>')
            }
        })
        return text;
    }
}

class Validator {
    constructor(
        protected text: string,
    ) {};

    public async confirmReformatting() {
        const { shouldAbort } = await Inquirer.prompt({
            name: 'shouldAbort',
            type: 'confirm',
            message: 'It looks like your clipboard already consists of a JSON array. Skip conversion?'
        });

        if (shouldAbort) {
            process.exit(0);
        }
    }

    public isAlreadyFormatted() {
        let json: any;
        try {
            json = JSON.parse(this.text)
        } catch (error) {
            return false;
        }

        if (!json) {
            return false;
        }

        if (!Array.isArray(json)) {
            return false;
        }

        return true;
    }
}