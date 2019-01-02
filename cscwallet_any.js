const CasinocoinAPI  = require('casinocoin-libjs').CasinocoinAPI
const api = new CasinocoinAPI()
const lookFor = process.argv.slice(2).map(function (f) { return f.toLowerCase().replace(/[^a-zA-Z0-9]/g, '') })

console.log('\x1b[36m%s\x1b[0m', 'CSC Vanity Wallet Generator')
console.log('\x1b[36m%s\x1b[0m', '   by @Vacek  ')
console.log('')

if (lookFor.length > 0) {

  console.log('Looking for CSC wallet addresses with keywords at any position in the address:')
  lookFor.forEach(function (k) {
    console.log('   - ', k)
  })


  console.log('')
  console.log('\x1b[33m%s\x1b[0m', '-- Press Control C to quit --');
  console.log('')

  for (let i = 0;;i++) {
    account = api.generateAddress();
    var generated = account.address;
    
    	if (lookFor.length > 0) {
			lookFor.forEach(function (k) {
    		output = k;
  		

    var re = new RegExp(output, 'i');
    var test1 = generated.match(re);

    if (test1) {
      var address = generated
      var n = address.lastIndexOf(test1);
      var front = address.substr(0,n);
      var end = address.substr(n+5,address.length);
      process.stdout.write("\n");
      console.log(' > Match: [ ' + front + '\x1b[32m' + test1 + '\x1b[0m' + end +' ] with secret [ ' + account.secret + ' ]')
    } else {
      if (i % 100 === 0) process.stdout.write('.')
      if (i % 1000 === 0) process.stdout.write("\r" + i + ' ')
    }
 
 })
 
  }
}

} else {
  console.log('Please enter one or more keywords after the script to search for.')
  console.log('Eg. "node ' + process.argv[1] + ' casino"')
  console.log('')
  process.exit(0)
}
