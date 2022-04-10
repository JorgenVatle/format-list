import Inquirer from 'inquirer';

export class Validator {
    constructor(
        protected text: string,
    ) {
    };

    public async confirmReformatting() {
        const { shouldAbort } = await Inquirer.prompt({
            name: 'shouldAbort',
            type: 'confirm',
            message: 'It looks like your clipboard already consists of a JSON array. Skip conversion?',
        });

        if (shouldAbort) {
            process.exit(0);
        }
    }

    public isAlreadyFormatted() {
        let json: any;
        try {
            json = JSON.parse(this.text);
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