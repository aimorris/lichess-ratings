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

function testAppend(index, lichess, otb) {
  // If user has FIDE rating, and has bullet rating, and bullet RD is less 110, and removes outliers of difference 1000, and removed FIDE rating of below 1000
  if (otb && lichess && lichess.rd < 110 && Math.abs(otb - lichess.rating) < 1000 && otb > 1000) {
    ratings[index].push([lichess.rating, otb]);
  }
}

fs.createReadStream('users.json')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    // If user has no TOS violation
    if (!obj.tosViolation) {
      // 0
      testAppend(0, obj.perfs?.bullet, obj.profile?.fideRating);

      // 1
      testAppend(1, obj.perfs?.blitz, obj.profile?.fideRating);

      // 2
      testAppend(2, obj.perfs?.rapid, obj.profile?.fideRating);

      // 3
      testAppend(3, obj.perfs?.classical, obj.profile?.fideRating);

      // 4
      testAppend(4, obj.perfs?.bullet, obj.profile?.uscfRating);

      // 5
      testAppend(5, obj.perfs?.blitz, obj.profile?.uscfRating);

      // 6
      testAppend(6, obj.perfs?.rapid, obj.profile?.uscfRating);

      // 7
      testAppend(7, obj.perfs?.classical, obj.profile?.uscfRating);

      // 8
      testAppend(8, obj.perfs?.bullet, obj.profile?.rcfRating);

      // 9
      testAppend(8, obj.perfs?.blitz, obj.profile?.rcfRating);

      // 10
      testAppend(8, obj.perfs?.rapid, obj.profile?.rcfRating);

      // 11
      testAppend(8, obj.perfs?.classical, obj.profile?.rcfRating);

      // 12
      testAppend(8, obj.perfs?.bullet, obj.profile?.cfcRating);

      // 13
      testAppend(8, obj.perfs?.blitz, obj.profile?.cfcRating);

      // 14
      testAppend(8, obj.perfs?.rapid, obj.profile?.cfcRating);

      // 15
      testAppend(8, obj.perfs?.classical, obj.profile?.cfcRating);
    }
  })
  .on('end', function() {
    console.log(ratings);
    const jsonString = JSON.stringify(ratings);
    fs.writeFile('./ratings.json', jsonString, err => {
      console.log(err ? 'Success' : 'Error' + err);
    })
  });