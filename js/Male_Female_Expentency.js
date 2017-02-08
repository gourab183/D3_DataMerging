module.exports = (y1, y2) =>
{
const log4js = require('log4js');
const logger = log4js.getLogger();
let fs = require('fs');
let re = require('readline');
let lineReader = re.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv')
});

// checking the input parameters
if(typeof y1 !== 'number' || isNaN(y1)) {
        throw new Error('Not a number');
}
/* insializing variables*/

let count = 0;
let output1 = [];
let sum = 0.0;
let sum1 = 0.0;
let year = y1;

// assign the asian country to array
let asiancountry = ['Afghanistan', 'Bahrain', 'Bangladesh', 'Bhutan',
'Myanmar', 'Cambodia', 'China', 'India',
'Indonesia', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan',
'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Nepal',
'Oman', 'Pakistan', 'Philippines', 'Qatar', 'Saudi Arabia',
'Singapore', 'Sri Lanka', 'Syrian Arab Republic', 'Tajikistan',
'Thailand', 'Timor-Leste', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'];

// let asiancountry = new Array('India','Pakistan');
// Reading the csv file line by line
lineReader.on('line', function(line) {
    let split2 = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let Object1 = {};

   // condition to get index values of required keys
    if (count === 0) {
        count = count + 1;
}

   // To get the details of the csv file
    else {
        // To get the female life expectancy
        if (year < parseInt(split2[4], 10) && (split2[3] === 'SP.DYN.LE00.FE.IN' ||
        split2[3] === 'SP.DYN.LE00.MA.IN') && parseInt(split2[4], 10) <= y2) {
            Object1 = {
                Year: year,
                LifeExpectancyAtBirthFemale: sum / asiancountry.length,
                LifeExpectancyAtBirthMale: sum1 / asiancountry.length
            };
            logger.debug(Object1);
            output1.push(Object1);
            sum = 0;
            sum1 = 0;
            year = year + 1;
        }
        for (let i = 0; i < asiancountry.length; i = i + 1) {
            if (split2[0] === asiancountry[i] && split2[3] === 'SP.DYN.LE00.FE.IN' && parseInt(split2[4], 10) <= y2) {
                sum = sum + parseFloat(split2[5]);
            }
        }
        // To get the male life expectancy
        for (let i = 0; i < asiancountry.length; i = i + 1) {
            if (split2[0] === asiancountry[i] && split2[3] === 'SP.DYN.LE00.MA.IN' && parseInt(split2[4], 10) <= y2) {
                sum1 = sum1 + parseFloat(split2[5]);
            }
        }

       // To push the values into object
    }
    // End of the details of the csv file
});

// write into the json file when the read is finished
lineReader.on('close', function() {
if(year === y2)
        {
            let Object1 = {
                Year: year,
                LifeExpectancyAtBirthFemale: sum / asiancountry.length,
                LifeExpectancyAtBirthMale: sum1 / asiancountry.length
            };
            output1.push(Object1);
        }
    fs.writeFile('../outputdata/Male_Female_Expentency.json', JSON.stringify(output1));
    logger.debug('Male_Female_Expentency.json was created');
});
return 'JSON written successfully';
};
// End of write into the json file when the read is finished
