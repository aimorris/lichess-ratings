const ndjson = require('ndjson');
const fs = require('fs');

let ratings = [];

fs.createReadStream('users.json')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    if (obj.profile?.fideRating && obj.perfs?.classical && obj.perfs?.classical?.rd <= 100) {
      ratings.push([obj.perfs.classical.rating, obj.profile.fideRating])
    }
  })
  .on('end', function() {
    console.log(ratings);
    // const jsonString = JSON.stringify(ratings);
    // fs.writeFile('./ratings.json', jsonString, err => {
    //   console.log(err ? 'Success' : 'Error' + err);
    // })
  });