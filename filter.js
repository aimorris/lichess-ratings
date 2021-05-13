const ndjson = require('ndjson');
const fs = require('fs');

// 0: Bullet to FIDE
// 1: Blitz to FIDE
// 2: Rapid to FIDE
// 3: Classical to FIDE
// 4: Bullet to USCF
// 5: Blitz to USCF
// 6: Rapid to USCF
// 7: Classical to USCF
// 8: Bullet to RCF
// 9: Blitz to RCF
// 10: Rapid to RCF
// 11: Classical to RCF
// 12: Bullet to CFC
// 13: Blitz to CFC
// 14: Rapid to CFC
// 15: Classical to CFC
let ratings = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]

fs.createReadStream('users.json')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    // If user has FIDE rating, and has bullet rating, and bullet RD is less 110, and has no TOS violation, and removes outliers of difference 1000
    if (obj.profile?.fideRating && obj.perfs?.bullet && obj.perfs?.bullet?.rd < 110 && !obj.tosViolation && Math.abs(obj.profile?.fideRating - obj.perfs?.bullet?.rating) < 1000) {
      ratings[0].push([obj.perfs.bullet.rating, obj.profile.fideRating]);
    }
  })
  .on('end', function() {
    console.log(ratings);
    // const jsonString = JSON.stringify(ratings);
    // fs.writeFile('./ratings.json', jsonString, err => {
    //   console.log(err ? 'Success' : 'Error' + err);
    // })
  });