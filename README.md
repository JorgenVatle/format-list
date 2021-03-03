# Jippy
A simple command-line utility for converting a line-separated list of strings from your clipboard to a JSON array.
Compatible with Windows, MacOS and Linux.

Uses [Clipboardy](https://www.npmjs.com/package/clipboardy) behind the scenes.

## Installation
```bash
npm i -g jippy
```

## Usage
1. Copy any line-separated list to your clipboard.
- ![Video copying line-separated text](https://i.gyazo.com/62bea19c0ff346c22e9f7ee9e8d65813.gif)

2. Run `jippy` to read and parse your clipboard.
- ![Initial run of Jippy](https://gyazo.com/ad6cdf2222dc2a0a911079adfd133108.gif)

3. Success!
```json
["Array index #0","Array index #1","foo","bar"]
```


### Alternative usage
If you'd like to convert your clipboard directly, skipping the formatting wizard, supply `--instant` or `-i`.
```bash
jippy -i
```
![Example quick-usage](https://gyazo.com/171f3c6812306e6f93dc744c03004d93.png)

## License
This repository is licensed under the ISC license.

Copyright (c) 2021, Jørgen Vatle.