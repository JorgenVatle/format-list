import { CliOptions } from '../CliArgs';

export class Obfuscate {
    protected static regex = {
        email: /(?<emailPrefix>[\w\d.-]{2,3}).*(?<emailSuffix>[\w\d.-]{2,3})(?:\+.*)?@(?<domainPrefix>[\w\d.-]{2,3}).*(?<domainSuffix>\.[\w\d.-]{2,})/g,
    };

    constructor(
        protected obfuscates?: CliOptions['obfuscate'],
    ) {
    };

    public apply(text: string) {
        if (!this.obfuscates) {
            return text;
        }

        let result = text;

        this.obfuscates.forEach((obfuscate) => {
            switch (obfuscate) {
                case 'emails':
                    result
                        = result.replace(Obfuscate.regex.email, '$<emailPrefix>***$<emailSuffix>@$<domainPrefix>***$<domainSuffix>');
            }
        });

        return result;
    }
}