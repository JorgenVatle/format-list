import Clipboardy from 'clipboardy';

export default function ReadClipboard(): Promise<string> {
    return Clipboardy.read().catch((error) => {
        console.error(
            'Could not read from clipboard! Are you sure the content of your clipboard is a UTF-8 encoded string?'
        );
        console.error(error.message)
        process.exit(1);
    });
}