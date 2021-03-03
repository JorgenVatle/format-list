# Jippy
A simple command-line utility for converting a line-separated list of strings from your clipboard to a JSON array.
Compatible with Windows, MacOS and Linux.

Uses [Clipboardy](https://www.npmjs.com/package/clipboardy) behind the scenes.

## Installation
```bash
npm i -g jippy
```

## Usage
1. Copy any line-separated list to your clipboard. E.g.
```text
Array index #0
Array index #1
foo
bar
```

2. Convert to a JSON array by running the following command in your terminal.
```bash
jippy
```
![Example usage](https://gyazo.com/da3035d6a6e6abc4f4fff0915ff2f05a.png)

If you'd like to convert your clipboard directly, skipping the formatting wizard, supply `--instant` or `-i`.
```bash
jippy -i
```
![Example quick-usage](https://gyazo.com/171f3c6812306e6f93dc744c03004d93.png)

## License
ISC