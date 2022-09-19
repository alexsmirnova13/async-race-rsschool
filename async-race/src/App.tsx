import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getCars, getWinners } from './redux/slices/counter';
import Garage from './pages/garage';
import WinnerTable from './components/WinnerTable';
import { IWinner } from './interfaces/Car';

const Wrapper = styled.div`
button{
    background-color:SeaGreen;
    border-radius: 5px;
    margin: 5px;
    font-size: 25px;
    
}
button:hover{
  cursor: pointer;
}
`;
const GarageWrapper = styled.div<{ isGarage:boolean }>`
  opacity: ${(props) => (props.isGarage ? 1 : 0)};
  display: ${(props) => (props.isGarage ? 'block' : 'none')}
`;

const TableWrapper = styled.div<{ isTable:boolean }>`
  opacity: ${(props) => (props.isTable ? 1 : 0)};
  display: ${(props) => (props.isTable ? 'block' : 'none')}
`;

function App() {
  const dispatch = useAppDispatch();

  const counter = useAppSelector((state) => state.counter);
  const { cars, winners, end } = counter;

  const [showComp, setShowComp] = useState('garage');

  useEffect(() => {
    dispatch(getCars());
  }, []);

  useEffect(() => {
    if (showComp === 'table') {
      dispatch(getWinners());
    }
  }, [showComp, end]);

  const carsC = new Map(cars.map((u) => [u.id, u]));

  const winnersToTable:IWinner[] = [];

  winners.forEach((u) => {
    try {
      const winnerToPush = {
        ...u,
        name: carsC.get(u.id).name,
        color: carsC.get(u.id).color,
      };
      winnersToTable.push(winnerToPush);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <BrowserRouter>
      <Header>
        <Wrapper>
          <button type="button" onClick={() => setShowComp('garage')}>Garage</button>
          <button type="button" onClick={() => setShowComp('table')}>Winners</button>
        </Wrapper>
      </Header>
      <GarageWrapper isGarage={showComp === 'garage'}>
        <Garage />
      </GarageWrapper>
      <TableWrapper isTable={showComp === 'table'}>
        <WinnerTable winners={winnersToTable} />
      </TableWrapper>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
