// define data 
const materials = require('./data/materials.json');
const textures = require('./data/textures.json');

const createLetterMap = list => {
	return list.reduce((obj, item) => {
		const letter = item.substr(0, 1).toLowerCase();
		if (obj[letter] === undefined) obj[letter] = [];
		obj[letter].push(item);
		return obj;
	}, { })
}

const materialsMap = createLetterMap(materials);
const texturesMap = createLetterMap(textures);

const sharedLetters = 
	Object.keys(texturesMap)
		.reduce((list, letter) => {
			if (texturesMap[letter] && materialsMap[letter]) {
				list.push(letter);
			}
			return list;
		}, []);

const sharedMap = 
	sharedLetters
		.reduce((obj, letter) => {
			obj[letter] = {
				textures: texturesMap[letter],
				materials: materialsMap[letter],
			}
			return obj;
		}, { });


const getRandomItem = list => list[Math.floor(Math.random() * list.length)];

// basic generator
const generateFullRandom = () => ({
	material: getRandomItem(materials),
	texture: getRandomItem(textures)
})


// alliterative generator
const generateAlliterativeRandom = () => {
	const randomLetter = getRandomItem(sharedLetters);

	return {
		material: getRandomItem(sharedMap[randomLetter].materials),
		texture: getRandomItem(sharedMap[randomLetter].textures)
	}
}

module.exports = {
	generateFullRandom,
	generateAlliterativeRandom
};