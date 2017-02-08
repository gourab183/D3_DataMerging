/* csv to json for Top 5 Countries based on total birth expectency catagory */

/* creating a interface to read the file*/
module.exports = (year1, year2) =>
{
const log4js = require('log4js');
const logger = log4js.getLogger();

let fs = require('fs');
let re = require('readline');
let lineReader = re.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv')
});

/* insializing variables*/


let count = 0;
let b = 0;
let d = 0;
let arr = [];
let row = 0;

// checking the input parameter
if (typeof year1 !== 'number' && typeof year2 !== 'number' || isNaN(year1) && isNaN(year2))
{
        throw new Error('Not a number');
    }

// Reading the csv file line by line
lineReader.on('line', function(line) {
    // Spliting the line and store in to an array
    let split2 = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    // condition to get index values of required keys
    if (count === 0)
    {
        count = count + 1;
    }
    else if((split2[3] === 'SP.DYN.CBRT.IN' || split2[3] === 'SP.DYN.CDRT.IN') &&
            split2[0] === 'India' &&
            (parseInt(split2[4], 10) >= year1 && parseInt(split2[4], 10) <= year2))
        {
            logger.debug('gggg');
            row = row + 1;
            if(split2[3] === 'SP.DYN.CBRT.IN')
            {
                b = split2[5];
            }
            else
            {
                d = split2[5];
            }
            if(row % 2 === 0)
            {
                let Obj = {year: split2[4], Birthratecrude: b, Deathratecrude: d};
                arr.push(Obj);
            }
        }
    // End of the details of the csv file
});
lineReader.on('close', function() {
    fs.writeFile('../outputdata/birth_vs_death.json', JSON.stringify(arr));
    // console.log(arr);
    });
    return 'JSON written successfully';
};
// write into the json file when the read is finished


