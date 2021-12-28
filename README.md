![npm](https://img.shields.io/npm/dw/wrangle-csv)[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ffb45ad8b6ca462a89b1328946fb1904)](https://www.codacy.com/gh/NeonSpork/wrangle-csv/dashboard?utm_source=github.com&utm_medium=referral&utm_content=NeonSpork/wrangle-csv&utm_campaign=Badge_Grade)[![Maintainability](https://api.codeclimate.com/v1/badges/06ddc8718010bf97ea1c/maintainability)](https://codeclimate.com/github/NeonSpork/wrangle-csv/maintainability)

# wrangle-csv

CSV wrangler to transform CSV into JSON object optimized for display in webapps, or JSON object of arrays optimized for interaction with a python/pandas/scikit/tensorflow backend via HTTP requests.

## Example imports:

Traditional JavaScript

```javascript
const fs = require("fs");
const wrangle = require("wrangle-csv");

const csvFile = fs.readFile("c:/path/to/your/file.csv");
const jsonData = wrangle.csvToJsonArr(csvFile);
```

Typescript

```typescript
import * as fs from "fs";
import { csvToJsonArr } from "wrangle-csv";

const csvFile = fs.readFile("c:/path/to/your/file.csv");
const jsonData = csvToJsonArr(csvFile);
```

## Methods

Assumes the following structure:
1st row = headers
1st column = label/indexing

### CSV to JSON structured as arrays

`csvToJsonArr(file, sep, newLine)`

- file: accepts string
- sep (separator): default `,`
- newLine: default `/n`
  Returns a JSON object with each row arranged as an array

### CSV to JSON object

`csvToJsonObj(file, sep, newLine)`

- file: accepts string
- sep (separator): default `,`
- newLine: default `/n`
  Returns a JSON object

## TODO

- [ ] Error handling
- [ ] Remove duplication and refactor
