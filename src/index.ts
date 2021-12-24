/**
 * Returns a JSON object with each row arranged as an array
 * containing each of the column entries for that row.
 *
 * Ideal structure to pass directly into python pandas lib
 * as it is the same structure of a 'dataframe' object in pandas.
 *
 * @param {string} csv The csv file as a string.
 * @param {string} sep Default separator is ',' but another separator can be specified here
 * @param {string} newLine Default newline is '\n' but another separator can be specified here (note that `\n\r` used by windows will automatically be sanitized)
 * @returns
 */
function csvToJsonArr(csv: string, sep = ',', newLine = '\n') {
  var lines = csv.split(newLine);
  var headers: string[] = lines[0].split(sep);
  if (headers.length <= 1) {
    sep = ';'
    headers = lines[0].split(sep);
  }
  var jsonObj: any = {};
  // Create an empty Array of arrays that are of type ANY
  var columnData = new Array<unknown[]>();

  // Loop over the headers, and push an array to the column data
  // that matches the type of data (string or number)
  for (var h = 0; h < headers.length; h++) {
    // Remove Windows /r EOL char if present
    if (headers[h]) {
      headers[h] = headers[h].replace(/\r/g, '');
    }
    if (parseFloat(lines[1][0])) {
      columnData.push(new Array<number>());
    }
    else {
      columnData.push(new Array<string>());
    }
  }

  // Go over every line in the csv _except_ the header line
  // and put each variable in the correct column array
  // as the correct type, number or string
  for (var l = 1; l < lines.length; l++) {
    var currentLine = lines[l].split(sep);
    for (var h = 0; h < headers.length; h++) {
      // Remove Windows /r EOL char if present
      if (currentLine[h]) {
        currentLine[h] = currentLine[h].replace(/\r/g, '');
      }
      if (parseFloat(currentLine[h])) {
        columnData[h].push(Number(currentLine[h]));
      }
      else if (currentLine[h] === "0") {
        columnData[h].push(Number(currentLine[h]));
      }
      else {
        columnData[h].push(currentLine[h]);
      }
    }
  }
  // Place each array of data in the correct key/value
  // pair in the JSON
  for (var h = 0; h < headers.length; h++) {
    jsonObj[headers[h]] = columnData[h];
  }
  return jsonObj;
}

/**
 * Returns a JSON object arranged in a classic object
 * with each of the column entries nested as objects.
 *
 * Ideal structure to pass directly to a webapp into a table for example.
 *
 * @param {string} csv The csv file as a string.
 * @param {string} sep Default separator is ',' but another separator can be specified here
 * @param {string} newLine Default newline is '\n' but another separator can be specified here (note that `\n\r` used by windows will automatically be sanitized)
 * @returns
 */
function csvToJsonObj(csv: string, sep = ',', newLine = '\n') {
  var lines = csv.split(newLine);
  var headers: string[] = lines[0].split(sep);
  if (headers.length <= 1) {
    sep = ';'
    headers = lines[0].split(sep);
  }
  var jsonObj: unknown[] = [];

  // Remove Windows /r EOL char if present
  for (var h = 0; h < headers.length; h++) {
    if (headers[h]) {
      headers[h] = headers[h].replace(/\r/g, '');
    }
  }

  // Go over every line in the csv _except_ the header line
  // and put each variable in the correct header/value
  for (var l = 1; l < lines.length; l++) {
    var currentObj: any = {};
    var currentLine = lines[l].split(sep);
    for (var h = 0; h < headers.length; h++) {
      // Remove Windows /r EOL char if present
      if (currentLine[h]) {
        currentLine[h] = currentLine[h].replace(/\r/g, '');
      }
    }
    for (var h = 0; h < headers.length; h++) {
      currentObj[headers[h]] = currentLine[h];
    }
    jsonObj.push(currentObj);
  }
  // Place each array of data in the correct key/value
  // pair in the JSON
  return JSON.stringify(jsonObj);
}


export default { csvToJsonArr, csvToJsonObj };
