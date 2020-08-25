/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**
 * help()
 * Displays the game instructions.
 * @Return: String
 */

function help () {
  return `Welcome to Scramble. 
The game where you unscramble letters to make words.

Once you start the game, you will be given a scrambled word.
If you correctly guess the word, you will receive a point.
If you guess incorrectly you will receive a strike.
You can also pass on a word. 

To start a new game use start().
To make guess use guess('word').
To skip a word use pass().
To show these instructions again use help().`
}

// Displays the instructions when the page loads.
console.log(help())

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

/*
 - array of words
 -minimum 10 words
 */

 let words = [ 'hello', 'car' ,'bag','dog','cat','board','pig','mango','pineapple','apple' ]


/*
  -game object (Holds state of the game)

    1. status
    2. random list of words (shuffle)
    3. current word
    4. current scrambled word (shuffle)
    5. number of strikes (0)
    6. number of points
    7. maximum number of strikes  (3)
    8. number of passes used (0)
    9. maximum number of passes (3)
*/

let game = {
  status : false,
  wordlist : [],
  strickes : 0 ,
  maxNumberOfStrikes:3,
  points : 0 ,
  passes : 0 ,
  maxNumberOfPasses : 3,
  CurrentWord : undefined,
  currentGuessedword : undefined,
}

/*
  -start()
    1. Reset all the game status properties (game.properties reset)
    2. scramble array of words
    3. new current word
    4. scramble new current word (shuffle)
    5. display word to player
*/

function start() {
  game.passes=0,
  game.maxNumberOfPasses = 3,
  game.points = 0,
  game.strickes = 0,
  game.maxNumberOfStrikes=3,
  game.wordlist = shuffle(words),
  game.CurrentWord = game.wordlist[0],
  game.currentGuessedword = shuffle(game.CurrentWord)
  game.status = true
 return `Please Guesse Your Word : ${game.currentGuessedword}`
}

/*
  -guess()
    -- check game is active
    ==* (guess correct)
      --- (=== to strict compare) (input.toLowerCase())
          case should not matter (eg..."dog","DOG")
      --- ads point
      --- remove guessed word from game


    ==*  (guess incorrect)
      --- adds strick
      --- display same word again
*/
 function guess(word){
   if (game.status){
     if(word.toLowerCase() === game.CurrentWord){
       game.points++;
       game.wordlist.shift()
         if(game.wordlist.length >= 1) {
           game.CurrentWord = game.wordlist[0];
           game.currentGuessedword = shuffle(game.CurrentWord);

           return ` Congo ! You have Scored a Point.Your Score is ${game.points}. Now Guess Word : ${game.currentGuessedword}`
         } else{
           game.status = false ;
           return ` Congo ! You have finished a Game. Your Total Score ${game.points}`
         }
      }else{
         game.strickes ++ ;
          if(game.strickes > game.maxNumberOfStrikes){
            game.status = false ;
            return `Your stickes are Over .Your Score is ${game.points}. Give second chance with start()`
          }
          return`Ohh No ! Give a try ${game.currentGuessedword}.
                You Have Used ${game.strickes} strickes.`
         
        }
       } else {
            return` Please start Game`
          }
     }
   
 

/*
  -pass()
    ---check if game is active
    --- (check player has passes)
    --- (i have passes)vary
      == passes  +++/--- (change number of passes accordingly)
      ==remove word from game(object) array of words
      == new word
      == no points for passes


    --- (i dont have passes)
      -- Display massage to user
*/

function pass(){
  if(game.status){
    if(game.maxNumberOfPasses > game.passes){
      game.passes++;
      game.wordlist.shift();
      game.CurrentWord = game.wordlist[0];
      game.currentGuessedword = shuffle(game.CurrentWord)

      return`You have use Pass in Previous word.
             Number of Passes used ${game.passes}.
             Plese Guess Word : ${game.currentGuessedword}`
    }else{
      return`you Do Not have Passes left`
    }

  }else{
      return`please start the game`
  }
}
