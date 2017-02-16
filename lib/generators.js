// helpers to create alphabetized word maps
const createMap = list => {
	return list.reduce((obj, item) => {
		const letter = item.substr(0, 1).toLowerCase();
		if (obj[letter] === undefined) obj[letter] = [];
		obj[letter].push(item);
		return obj;
	}, { })
}

const getCommonKeys = maps => 
	Object.keys(maps[0])
		.reduce((list, letter) => {
			for (let i = 0; i < maps.length; i++) {
				if (maps[i][letter] === undefined) 
					return list;
			}

			list.push(letter);
			return list;
		}, []);


const createSharedMap = (keys, maps) => 
	keys
		.reduce((obj, letter) => {
			obj[letter] = Object.keys(maps).reduce((sum, key) => {
				if (sum[key] === undefined) sum[key] = [];
				sum[key] = maps[key][letter];
				return sum;
			}, { });
			return obj;
		}, { });


const getRandomItem = list => list[Math.floor(Math.random() * list.length)];

// define data maps
const materials = require('./data/materials.json');
const textures = require('./data/textures.json');

const materialsMap = createMap(materials);
const texturesMap = createMap(textures)

const sharedLetters = getCommonKeys([
	materialsMap, 
	texturesMap
]);

const sharedMap = createSharedMap(sharedLetters, {
	material: materialsMap,
	texture: texturesMap
});


// basic generator
const generateFullRandom = () => ({
	material: getRandomItem(materials),
	texture: getRandomItem(textures)
})

// alliterative generator
const generateAlliterativeRandom = () => {
	const randomLetter = getRandomItem(sharedLetters);
	return {
		material: getRandomItem(sharedMap[randomLetter].material),
		texture: getRandomItem(sharedMap[randomLetter].texture)
	}
}

module.exports = {
	generateFullRandom,
	generateAlliterativeRandom
};