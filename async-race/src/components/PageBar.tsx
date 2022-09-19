import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { decrement, increment } from '../redux/slices/pages';

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

interface IPageBarProps {
  isDisabled: boolean
}

function PageBar(props:IPageBarProps) {
  const pages = useAppSelector((state) => state.pages);
  const carsState = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const handlePrevClick = () => {
    const minPage = 1;
    if (pages.value <= minPage) {
      return;
    }
    dispatch(decrement());
  };

  const handleNextClick = () => {
    const maxPage = Math.ceil(carsState.cars.length / pages.itemsPerPage);
    if (pages.value >= maxPage) {
      return;
    }
    dispatch(increment());
  };

  return (
    <Wrapper>
      <p>
        Page
        {' '}
        {pages.value}
      </p>
      <button type="button" onClick={handlePrevClick} disabled={props.isDisabled}>prev</button>
      <button type="button" onClick={handleNextClick} disabled={props.isDisabled}>next</button>
    </Wrapper>
  );
}

export default PageBar;
