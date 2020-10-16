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
let wrongLetters = [];

let wordObj = {
  str: "",
  revealed: [],
}

let the_ltr = 'test';



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

    // console.log(words[rand_pos]);
    return words[rand_pos]; 
  }


  const handleGuess = (ltr) => {
    // console.log("ltr", ltr.target.textContent);

    the_ltr = ltr.target.textContent;

    the_usedLetters.push(the_ltr);


    //has to be spread, otherwise react won't re-render 
    setUsedLetters([...the_usedLetters]);


    console.log("handleGuess called");



    if (word.str.indexOf(the_ltr) > -1){
      console.log(`${word.str} contains the letter ${the_ltr}`);
    

    }
    else{
      console.log(`${word.str} does NOT contain the letter ${the_ltr}`);
      

      wrongLetters.push(the_ltr);
      setWrongGuesses([...wrongLetters]);

    }



  };

  const handleReset = () => {
    the_usedLetters = [];//will be passed as state to Keyboard
    wrongLetters = [];



    wordObj = {
      str: "",
      revealed: [],
    }

    the_ltr = '';

    setGame({ ...game, started: true });
    setWord({str : getNewWord()});
    setUsedLetters([...the_usedLetters]);
    setWrongGuesses([...wrongLetters]);
    



  };

  console.log("App return() called");
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
