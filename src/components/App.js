import React , { useState } from 'react';
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import words from "../data/words.json";
import LetterKey from "./LetterKey";
import ReactDOM from 'react-dom';

import { colors, contentWidth } from "./GlobalStyles";

let initialGameState = { started: false, over: false, win: false };
let the_usedLetters = [];//will be passed as state to Keyboard
let wrongLetters = [];//will be passed as state to DeadLetters

let wordObj = {
  str: "",
  revealed: [],
}

let the_ltr = '';



const App = () => {

  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "" });
  const [usedLetters, setUsedLetters] = useState(the_usedLetters);
  const [wrongGuesses, setWrongGuesses] = useState(wrongLetters);
  





  const handleStart = () => {
    setGame({ ...game, started: !game.started });

    if(word.str == ""){
      setWord({str : getNewWord()});

      wordObj.str = word.str; 



    }

  };



  const getNewWord = () => {
    let rand_pos = Math.floor(Math.random() * words.length);
    return words[rand_pos]; 
  }


  const handleGuess = (ltr) => {

    the_ltr = ltr.target.textContent;

    the_usedLetters.push(the_ltr);


    //has to be spread, otherwise react won't re-render 
    setUsedLetters([...the_usedLetters]);


    if (word.str.indexOf(the_ltr) > -1){
      // console.log(`${word.str} contains the letter ${the_ltr}`);

        for(var i=0; i<word.str.length;i++) {
            if (word.str[i] === the_ltr){
              wordObj.revealed[i] = the_ltr;
            }
        }    

    }
    else{
      // console.log(`${word.str} does NOT contain the letter ${the_ltr}`);

      wrongLetters.push(the_ltr);
      setWrongGuesses([...wrongLetters]);

    }


    //GAME HAS ENDED, guessed wrong 10 times
    if(wrongLetters.length == 10 ){

      if(wordObj.revealed.includes("") ){
        // "USER HAS LOST");
        handleEndGame("lose");
      }
      else{
        // ("USER HAS WON");
        handleEndGame("win");
      }

    }
    else{//GAME HAS ENDED, but uer still has guesses left
      if(!wordObj.revealed.includes("") ){
        //user has won if he found the word (wordObj.revealed doesn't have empty strings as items)
        handleEndGame("win");
      }
    }
    


  };

  const handleReset = () => {
    the_usedLetters = [];
    wrongLetters = [];



    wordObj = {
      str: "",
      revealed: [],
    }

    the_ltr = '';

    setGame({ ...game, started: true });//make sure that game started is true

    let new_word = getNewWord();//no choice to put the new word in a variable, the 'word' variable updates this way, otherwise it's one render 'behind'

    setWord({str : new_word});

    console.log("the wod got on reset is", new_word);

    for (let i = 0; i < new_word.length; i++) {
      wordObj.revealed.push("");//refill the revealed array with empty strings, important become its length is needed
    }
    setUsedLetters([...the_usedLetters]);
    setWrongGuesses([...wrongLetters]);
    



  };



  const handleEndGame = (win) => {


    setGame({ ...game, over: true, win: win });
    // alert(`Game Over! You ${win ? "win" : "lose"}`);
    alert(`Game Over! You ${win}`);




  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button  onClickFunc={handleStart} game={game} setGame={setGame}>START</Button>
        <Button   onClickFunc={handleReset} game={game} setGame={setGame}>RESET</Button>
      </Nav>
      {game.started && (
          <>
            <Container>
              <Deadman />
              <RightColumn>
                <DeadLetters wrongGuesses={wrongGuesses} />
                <TheWord word={word} letter={the_ltr} wordObj={wordObj}/>
              </RightColumn>
            </Container>
            <Keyboard onClickFunc={handleGuess} usedLetters={usedLetters}/>
          </>
      )}
    </Wrapper>
  );
};






const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
