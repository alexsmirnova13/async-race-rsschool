import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CarSVG } from '../assets/car-svgrepo-com.svg';
import { useAppSelector } from '../hooks/redux';
import { IWinner } from '../interfaces/Car';
import PageBarWinners from './PageBarWinners';

const Wrapper = styled.div`
margin: 20px 0 20px 40px;
border-spacing: 0 10px;
font-family: cursive;
font-weight: bold;
font-size: 25px;
h1{
font-size: 25px;
}
th {
padding: 10px 20px;
background: SeaGreen;
color: black;
border-right: 2px solid; 
font-size: 0.9em;
font-size: 25px;
}
th:first-child {
text-align: left;
}
th:last-child {
border-right: none;
}
td {
vertical-align: middle;
padding: 10px;
font-size: 14px;
text-align: center;
border-top: 2px solid #56433D;
border-bottom: 2px solid #56433D;
border-right: 2px solid #56433D;
font-size: 25px;
}
td:first-child {
border-left: 2px solid #56433D;
border-right: none;
}
td:nth-child(2){
text-align: left;
}
`;

interface IWinnerTableProps {
  winners: IWinner[]
}

function WinnerTable(props:IWinnerTableProps) {
  const { winners } = props;

  const [sortBy, setSortBy] = useState('wins asc');

  const pagesW = useAppSelector((state) => state.pagesW);

  const { valueWinner, winnerPerPage } = pagesW;

  const startW = (valueWinner - 1) * winnerPerPage;
  const endW = startW + winnerPerPage;

  const sortByFn = (a:IWinner, b:IWinner):number => {
    if (sortBy === 'wins asc') {
      return b.wins - a.wins;
    }
    if (sortBy === 'wins desc') {
      return a.wins - b.wins;
    }
    if (sortBy === 'time asc') {
      return a.time - b.time;
    }
    if (sortBy === 'time desc') {
      return b.time - a.time;
    }
    return 0;
  };

  const handleWinsClick = () => {
    if (sortBy === 'wins asc') {
      setSortBy('wins desc');
    } else {
      setSortBy('wins asc');
    }
  };

  const handleTimeClick = () => {
    if (sortBy === 'time asc') {
      setSortBy('time desc');
    } else {
      setSortBy('time asc');
    }
  };

  return (
    <Wrapper>
      <h1>{`Количество победителей: ${winners.length}`}</h1>
      <table>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th onClick={handleWinsClick}>Wins</th>
          <th onClick={handleTimeClick}>Best time</th>
        </tr>

        {winners.sort(sortByFn).map((u, i) => (
          <tr key={u.id}>
            <td>{i + 1}</td>
            <td><CarSVG fill={u.color} stroke="green" height="100px" width="100px" /></td>
            <td>{u.name}</td>
            <td>{u.wins}</td>
            <td>{u.time}</td>
          </tr>
        )).slice(startW, endW)}

      </table>
      <PageBarWinners />
    </Wrapper>
  );
}

export default WinnerTable;
