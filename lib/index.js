const { 
	generateFullRandom,
	generateAlliterativeRandom
 } = require('./generators')


// print some randoms
let i = 0;
while (i++ < 10) {
	const { material, texture } = generateAlliterativeRandom();
	console.log(`${texture} ${material}`);
}