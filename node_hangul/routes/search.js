var express = require('express');
var router = express.Router();
var extractJAMO = require('../util/extractJAMO');
var extractCHO = require('../util/extractCHO');
var Hangul = require('hangul-js');

/* GET home page. */

router.get('/searchJAMOCHO/:pattern', function(req, res, next) {

	global.logger.trace('%s',req.params.pattern);
	const {pattern} = req.params;
	const jamo = extractJAMO(pattern);
	const cho = extractCHO(pattern);
	global.logger.trace('%s',jamo);
    // 1. 한글비교 (한글 like 검색)
	const wordObj = global.wordsWithJAMOCHO.filter(wordWithJAMOCHO => wordWithJAMOCHO.word.includes(pattern)); 	
	// 2. 자모분리비교 ()
	const wordObjJAMO = global.wordsWithJAMOCHO.filter(wordWithJAMOCHO => wordWithJAMOCHO.jamo.startsWith(jamo)); 	
	
	let wordObjCHO = [];

	// 3. 초성비교
	const arrayFromPattern = Array.from(pattern);
	const checkHangul = arrayFromPattern.map(element => Hangul.isHangul(element));

	if(checkHangul.some(element => element)){
		global.logger.trace('이건 초성검색이 아닙니다');
		wordObjCHO = [] 
	} else {
		console.log(global.wordsWithJAMOCHO)
		wordObjCHO = global.wordsWithJAMOCHO.filter(wordWithJAMOCHO => {
			if(wordWithJAMOCHO.cho){
				return wordWithJAMOCHO.cho.startsWith(cho);
			} else {
				false;
			}
		})
	} 
	
	global.logger.trace('wordObjCHO:%j',wordObjCHO);
	
	Object.assign(wordObj, wordObjJAMO);
	Object.assign(wordObj, wordObjCHO);
	
	res.send({result:wordObj, count:wordObj.length});
	
}); 

module.exports = router;
