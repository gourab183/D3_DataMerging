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


let headers = [];
let count = 0;
let arr = [];
let country = [];
let sum = 0.0;
let topFiveCountry = [];

if(typeof year1 !== 'number' || isNaN(year1)) {
        throw new Error('Not a number');
    }

/* Reading the csv file line by line */
lineReader.on('line', function(line) {
    //  Spliting the line and store in to an array
    let split2 = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    // condition to get index values of required keys
    if (count === 0) {
        headers = split2.slice();
        // console.log(split2);
        count = count + 1;
    }

    else {
        let obj = [];
        if(split2[3] === 'SP.DYN.LE00.IN' && (split2[4] >= year1 && split2[4] <= year2))
        {
            for(let i = 0; i < headers.length; i = i + 1)
            {
              if(i === 0 || i === 4 || i === 5)
                {
                  obj[headers[i]] = split2[i];
                }
            }
            arr.push(obj);
        }
    }
});
/* ************************ Close the readline function *******************************/
lineReader.on('close', function() {
    for(let i = 0; i < arr.length && parseInt(arr[i].Year, 10) === year1; i = i + 1)
    {
        let Object1 = {countryName: null, total: 0};
        let cc = arr[i].CountryName;
        // logger.debug(cc);
        for(let j = 0; j < arr.length; j = j + 1)
        {
            Object1.countryName = null;
            Object1.total = 0;
            if(arr[j].CountryName === cc)
            {
                // logger.debug(j);
                // logger.debug("kkkkkkkkkk");
                sum = sum + parseFloat(arr[j].Value);
                // arr2.splice(j,1);
            }
        }
        Object1.countryName = cc;
        Object1.total = sum;
        country.push(Object1);
        sum = 0;
    }
  function topFive(a, b)
    {
        if (a.total > b.total)
        {
            return -1;
        }
        if (a.total < b.total)
        {
            return 1;
        }
        return 0;
    }
    country.sort(topFive);
    logger.debug(country);
    for(let i = 0; i < 5; i = i + 1)
    {
        topFiveCountry.push(country[i]);
    }
    logger.debug(topFiveCountry);
    fs.writeFile('../outputdata/Top_5_Country.json', JSON.stringify(topFiveCountry));
    // console.log(arr);
    });
    return 'JSON written successfully';
};

// End of Reading the csv file line by line


// write into the json file when the read is finished

// End of write into the json file when the read is finished

