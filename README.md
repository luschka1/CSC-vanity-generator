# CSC Vanity address (wallet) generator

A vanity address is a wallet address containing a few characters you like at the beginning or the end of the wallet address. Of course we can't just generate the address: the address is a derivative from a secret key. So: this tool generates several secret keys per second. The script will test the derived wallet address against one or more keywords you can supply.

## How to use this tool

1. Make sure you have **nodejs** installed on your computer:
[https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm).
(nodejs allowes you to run Javascript code on your computer from the commandline).
2. Download the source of this repository (using `git clone` or by downloading the zip)
3. Start your commandline and go to the folder containing the source of this repository
4. Install the dependency (casinocoin-libjs) by running `npm install casinocoin-libjs`
5. Fire up the tool and **append the keywords you are looking for**:
```
node cscwallet.js bob csc moon jim
```

The example command above will search for wallet addresses containing either _bob_, _csc_, _moon_ or _jim_.

![Demo of install and wallet generation](https://gtasb9v.dlvr.cloud/4.gif)

If you use Windows and you don't have NodeJS running: [here's a screencap of the steps above (1-5)](https://fxtduw7.dlvr.cloud/4.gif).

## Notes

- This script will look for your keywords at the beginning or at the end of CSC wallet addresses.
- This script will look for matches, case insensitive.
- The longer the keyword you are looking for, the longer it takes to find a match.
- If you want to be make sure the generated wallets + keys are safe, generate offline.

### Security / randomness

> Serious question. How do we know these addresses are random and not some sort of sequence?

Good question indeed. The only way to be sure is to check the code;

My code [is over here](https://github.com/luschka1/CSC-vanity-generator/blob/master/cscwallet.js) and as you can see it is invoking the method "api.generateAddress()" - and as you can see on line 1 and 2:

	const CasinocoinAPI  = require('casinocoin-libjs').CasinocoinAPI
	const api = new CasinocoinAPI()

... I use **casinocoin-libjs** to do this. [casinocoin-libjs](https://github.com/casinocoin/casinocoin-libjs) is from Casinocoin (the foundation) - this code is open source as well.

[This](https://github.com/casinocoin/casinocoin-libjs/blob/master/src/offline/generate-address.js) is how they generate a keypair. They use their own lib [casinocoin-libjs-keypairs](https://github.com/casinocoin/casinocoin-libjs-keypairs) to do this. The function is on [line 16 over here](https://github.com/casinocoin/casinocoin-libjs-keypairs/blob/master/src/index.js) and at line 18 you can see they use the **brorand** lib. to [generate the randomness](https://github.com/indutny/brorand/blob/master/index.js). This lib. uses the **crypto** object, a native NodeJS object, by invoking:

    crypto.randomBytes()

More info about this method [over here](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback).

### Feeling generous?

Tips are highly appreciated at CSC address: ` cHoDLvFcHH7dHUBaDXP8KwTL5obDdKQhez `
