# Format List
A simple command-line utility for converting a line-separated list of strings from your clipboard to a JSON array.
Compatible with Windows, MacOS and Linux.

Uses [Clipboardy](https://www.npmjs.com/package/clipboardy) behind the scenes.

## Installation
```bash
npm i -g format-list
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
format-list
```
![preview](https://gyazo.com/da80a799d5282c8901f7bea560f048f1.png)

If you'd like to convert your clipboard directly, skipping the formatting wizard, supply `--instant` or `-i`.
```bash
format-list -i
```
![preview](https://gyazo.com/a2f65d7b069af5f7b6ff9ef1e653d0ab.png)

## License
ISC