import Chalk from 'chalk';
import { CliOptions } from './CliArgs';

export default new class Logger {
    public error(message: string) {
        console.log(`\n${Chalk.bgRed(message)}`);
    }

    public suggestHelp<Example extends keyof CliOptions>(example?: SuggestExample<Example>) {
        if (example) {
            console.log(
                `\nTry the following instead:\n%s\n`,
                `$\t jippy --${example.option} ${Chalk.yellowBright(example.value)}`,
            );
        }
        console.log(`\nRun the following for more details:\n$\tjippy --help`);
    }
};

interface SuggestExample<Option extends keyof CliOptions> {
    option: Option,
    value: ExampleValue<Option>,
}

type ExampleValue<Option extends keyof CliOptions> = CliOptions[Option] extends string[]
                                                     ? CliOptions[Option][number]
                                                     : CliOptions[Option];