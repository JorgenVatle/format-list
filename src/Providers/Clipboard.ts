import Clipboardy from 'clipboardy';

export function ReadClipboard(): Promise<string> {
    return Clipboardy.read().catch((error) => {
        console.error(
            'Could not read from clipboard! Are you sure the content of your clipboard is a UTF-8 encoded string?'
        );
        console.error(error.message)
        process.exit(1);
    });
}

export async function WriteToClipboard(content: string): Promise<void> {
    await Clipboardy.write(content).catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
}