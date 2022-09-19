import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { decrementW, incrementW } from '../redux/slices/pages';

const Wrapper = styled.div`
display: flex;
flex-direction: row;
margin: 20px 0 20px 40px;
button{
    background-color:SeaGreen;
    border-radius: 5px;
    margin: 5px;
    font-size: 25px;
    
}
button:hover{
  cursor: pointer;
}
p{
    font-size: 25px;
}
`;
function PageBarWinners() {
  const pagesW = useAppSelector((state) => state.pagesW);
  const carsState = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const handlePrevClick = () => {
    const minPage = 1;
    if (pagesW.valueWinner <= minPage) {
      return;
    }
    dispatch(decrementW());
  };

  const handleNextClick = () => {
    const maxPage = Math.ceil(carsState.winners.length / pagesW.winnerPerPage);
    if (pagesW.valueWinner >= maxPage) {
      return;
    }
    dispatch(incrementW());
  };

  return (
    <Wrapper>
      <p>
        Page
        {' '}
        {pagesW.valueWinner}
      </p>
      <button type="button" onClick={handlePrevClick}>prev</button>
      <button type="button" onClick={handleNextClick}>next</button>
    </Wrapper>
  );
}

export default PageBarWinners;
