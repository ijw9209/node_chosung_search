const hangul = require('hangul-js');
const fs = require('fs');

const songArray = [];
const errored = [];
const WORDSEPARATOR = '^';

const getJAMO = (hangulStr) => {
    return hangul.disassemble(hangulStr).join('');	
}

const createSongObj = (data) => {
    try {
        const {wordSep, line} = data;
        const wordArray = line.split(wordSep);
        if(wordArray.length !== 4){
            errored.push(wordArray);
            return {artistName:'', songName:'', year:'', label:''};
        }
        // const artistName = wordArray[0].trim().replace(/^"/gi, '').replace(/"$/gi, '');
        // const songName = wordArray[1].trim().replace(/^"/gi, '').replace(/"$/gi, '');
        const artistName = wordArray[0].replace(/\s+/g, " ").trim().replace(/^"/gi, '').replace(/"$/gi, '').replace(/\s+$/gi, '');
        const songName = wordArray[1].replace(/\s+/g, " ").trim().replace(/^"/gi, '').replace(/"$/gi, '').replace(/\s+$/gi, '');;
        const year = wordArray[2].replace(/\s+/g, " ").trim().replace(/^"/gi, '').replace(/"$/gi, '').replace(/\s+$/gi, '');;
        const label = wordArray[3].replace(/\s+/g, " ").trim().replace(/^"/gi, '').replace(/"$/gi, '').replace(/\s+$/gi, '');;

        return {
            artistName,
            songName,
            year,
            label
        } 
    } catch (err) {
        console.error(err);
        process.exit();
    }
}

const getSplited = (str, sep) => {
    return str.split(sep).filter(element => element !== "");
}

const getMode = (str) => {
    const mode = {};
    mode.complex = getSplited(str, WORDSEPARATOR).length == 2 ? true : false;
    mode.complex = (!str.includes(WORDSEPARATOR) && getSplited(str, ' ').length == 2) ? true : mode.complex;
    // mode.or = getSplited(str, ' ').length > 2 ? true : false;    
    return mode;
}

const getKeyword = (searchMode, str) => {
    let sep = ' ';
    if(!searchMode.complex) return [];
    if(searchMode.complex && str.includes(WORDSEPARATOR)) sep = WORDSEPARATOR;
    const [first, second] = getSplited(str, sep);
    const firstUpperCased = first && first.toUpperCase().trimStart().trimEnd();
    const secondUpperCased = second && second.toUpperCase().trimStart().trimEnd();    
    return [firstUpperCased, secondUpperCased]
}

const mkRegExpr = (str) => {

    if(typeof(str) === 'string') return new RegExp(str.trimStart().trimEnd().split(' ').join('.+'));
    return null;
}

const msgHandlers = {
    'clear' : (subType = null, messageKey, data = null) => {
        songArray = [];
        process.send({
            type: 'reply-clear',
            clientId: process.pid,
            messageKey, 
            success: true, 
        })
    },
    'index' : (subType = null, messageKey, data) => {
        try {
            const songObject = createSongObj(data);
            songObject.jamoArtist = getJAMO(songObject.artistName);
            songObject.jamoSong = getJAMO(songObject.songName);
            songArray.push(songObject);
            process.send({
                type: 'reply-index',
                clientId: process.pid,
                messageKey, 
                success: true, 

            });
            if(songArray.length % 10000 === 0){
                console.log(`pid[${process.pid}] processed[${songArray.length}]`);
                //console.log(process.pid, errored.length)
            }

        } catch (err) {
            console.error(err);
            process.exit();
        }
    },
    'search' : (subType, messageKey, data) => {
        // default max result 100,000,000 
        const {pattern, patternJAMO, limit=100000000} = data;
        // make case insensitive and remove ending space
        const upperCased = patternJAMO.toUpperCase().trimEnd();
        // determine search mode
        const searchMode = getMode(upperCased);
        // console.log(searchMode)

        let firstRegExpr,secondRegExpr;

        if(searchMode.complex){
            // const artists = upperCased.split(' ');
            // const regPattern = `/${artists.join('.+')}/`;
            const [firstUpperCased, secondUpperCased] = getKeyword(searchMode, upperCased);
            firstRegExpr = mkRegExpr(firstUpperCased);
            secondRegExpr = mkRegExpr(secondUpperCased);     
        }  
        
        const hatRemovedUpperCased = upperCased.endsWith('^') ? upperCased.replace(/\^$/,'') : upperCased;
        const keywordExpr = mkRegExpr(hatRemovedUpperCased);
        
        let result;
        switch(subType.key){
            case 'artistNsong' :
                if(!searchMode.complex) {
                    result = [];
                    break;
                }
                result = songArray.filter(song => {
                    if(!secondRegExpr) return false;
                    // return song.jamoArtist.toUpperCase().includes(firstUpperCased) && song.jamoSong.toUpperCase().includes(secondUpperCased);
                    return song.jamoArtist.toUpperCase().search(firstRegExpr) != -1 && song.jamoSong.toUpperCase().search(secondRegExpr) != -1;
                });
                break;
            case 'songNartist' :
                if(!searchMode.complex) {
                    result = [];
                    break;
                }
                result = songArray.filter(song => {
                    if(!secondRegExpr) return false;
                    // return song.jamoArtist.toUpperCase().includes(secondUpperCased) && song.jamoSong.toUpperCase().includes(firstUpperCased);
                    return song.jamoArtist.toUpperCase().search(secondRegExpr) != -1 && song.jamoSong.toUpperCase().search(firstRegExpr) != -1;
                })
                break;
            case 'artist' :
                // result = songArray.filter(song => song.artistName.includes(pattern));
                result = songArray.filter(song => song.jamoArtist.toUpperCase().startsWith(hatRemovedUpperCased));
                break;
            case 'artistJAMO' :
                // result = songArray.filter(song => song.jamoArtist.toUpperCase().includes(upperCased));
                result = songArray.filter(song => song.jamoArtist.toUpperCase().search(keywordExpr) != -1);
                break;
            case 'song' :
                result = songArray.filter(song => song.jamoSong.toUpperCase().startsWith(hatRemovedUpperCased))
                // result = songArray.filter(song => song.songName.includes(pattern));
                break;
            case 'songJAMO' :
                // result = songArray.filter(song => song.jamoSong.toUpperCase().includes(upperCased))
                result = songArray.filter(song => song.jamoSong.toUpperCase().search(keywordExpr) != -1);
                break;

        }
        
        // // 1. 한글비교 (한글 like 검색)
        // const matchedArtistArray = songArray.filter(song => song.artistName.includes(pattern))
        // const matchedSongArray = songArray.filter(song => song.songName.includes(pattern))
        // // 2. 자모분리비교 ()
        // const matchedArtistArrayJAMO = songArray.filter(song => song.jamoArtist.startsWith(jamo))
        // const matchedSongArrayJAMO = songArray.filter(song => song.jamoSong.startsWith(jamo))

        // // to order data, make results as array of array
        // const result = [
        //     [...matchedArtistArray],
        //     [...matchedArtistArrayJAMO],
        //     [...matchedSongArray],
        //     [...matchedSongArrayJAMO]
        // ]

        limit && result.splice(limit);
        result.map(obj => obj.weight = subType.weight)

        process.send({
            type: 'reply-search',
            clientId: process.pid,
            messageKey,
            subType,
            success:true,
            result,
        })
    }
}

let totalMessage = 0;

// 
process.on('message', (message) => {
    try {
        totalMessage ++;
        const {type, subType, messageKey, data} = message;
        msgHandlers[type](subType, messageKey, data);
    } catch (err) {
        console.error(err);
        process.exit();
    }
})


// main

// notify worker process started to master server
process.send({
    type: 'notify-start',
    clientId: process.pid,
})

process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
      process.stderr.fd,
      `Caught exception: ${err}\n` +
      `Exception origin: ${origin}`
    );
});
  