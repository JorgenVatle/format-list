import Chalk from 'chalk';

export default new class Logger {
    public error(message: string) {
        console.log(`\n${Chalk.bgRed(message)}`);
    }

    public suggestHelp() {
        console.log(`\nRun the following for more info:\n$\tjippy --help`);
    }
}