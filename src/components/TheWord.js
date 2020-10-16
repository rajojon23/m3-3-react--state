import React , { useState } from 'react';
import styled from "styled-components";

let wordObj = {
	str: "",
	revealed: [],
}

let filled = false;

const TheWord = (props) => {
	wordObj = props.wordObj;


	const [revealed, setRevealed] = useState(wordObj);
	let word = props.word;
	let letter = props.letter;

	// console.log("received the word",word.str );
	// console.log("received the letter",letter );

	wordObj.str = word.str; 


	if(!filled){
		for (let i = 0; i < word.str.length; i++) {
			// console.log("adding into wordobj");
			wordObj.revealed.push("");
		}
	}

	filled = true;





	// console.log("theWordObj", wordObj);
	// console.log("revealed is", revealed);





	let lines = '';
	// let lines = [];

    if (word.str.indexOf(letter) > -1){
    

        for(var i=0; i<word.str.length;i++) {
            if (word.str[i] === letter){
              wordObj.revealed[i] = letter;
            }
        }

    }
    else{
      // console.log(`${word.str} does NOT contain the letter ${letter}`);
    }
// 
//     console.log("revealed", wordObj.revealed);
// 
// 	
// 	console.log("lauching loop");



	for (let i = 0; i < wordObj.str.length; i++) {
		// console.log('revealed.revealed[i]', wordObj.revealed[i]);
		//has to make sure that wordObj.revealed[i] is an existing value
		if(wordObj.revealed[i] !== "" && wordObj.revealed[i] !== undefined){
			lines = lines.concat(wordObj.revealed[i], " ");
			// console.log("revealed char is not empty");

			// setRevealed({ revealed : wordObj.revealed });
		}
		else{
			lines = lines.concat(' _ ');//short line underneath the displayed letter, longer line does not show well
			// console.log("revealed char is empty");
		}
	} 


	// console.log("lines", lines);


	return (
 		<Wrapper>{

 			lines
 		}</Wrapper>
 	);
};

const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "none")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

export default TheWord;
