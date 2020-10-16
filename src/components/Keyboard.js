import React , { useState } from 'react';
import styled from "styled-components";
import letters from "../data/letters.json";
import LetterKey from "./LetterKey";


import { colors, contentWidth } from "./GlobalStyles";



const Keyboard = (props) => {


// const [usedLetters, setUsedLetters] = useState(props.usedLetters);
let onClickFunc = props.onClickFunc;


return <Wrapper>{


  letters.map((letter) =>{

      return <LetterKey 
                key={letter}
                letter={letter}
                usedLetters={props.usedLetters}
                onClickFunc={onClickFunc}
              />;
  }) 
}</Wrapper>;
  
    
  
};

const Wrapper = styled.div`
  background: ${colors.yellow};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px 12px;
  max-width: ${contentWidth};
  min-width: 320px;
`;

export default Keyboard;
