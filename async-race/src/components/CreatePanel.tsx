import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  createCar, generateCars, resetCars, startRace, updateCar,
} from '../redux/slices/counter';

const Wrapper = styled.div`
.create-panel__input-btn{
    display: flex;
    flex-direction: row;
}
input {
border: 3px solid SeaGreen;
border-radius: 5px;
margin: 5px;
height: 35px;
font-size: 20px;
font-family: cursive;
}
button{
    background-color:SeaGreen;
    border-radius: 5px;
    margin: 5px;
    font-size: 25px;
    
}
button:hover{
  cursor: pointer;
}
.create-panel__color-input{
    width: 70px;
    height: 35px;
}

.create-panel__color-input:hover{
  cursor: pointer;
}
`;
function CreatePanel() {
  const dispatch = useAppDispatch();
  const nameRef = useRef(null);
  const nameUpdateRef = useRef(null);
  const colorRef = useRef(null);
  const colorUpdateRef = useRef(null);
  const myState = useAppSelector((state) => state.counter);
  const pages = useAppSelector((state) => state.pages);
  const [updateNameValue, setUpdateNameValue] = useState('');
  const [updateColorValue, setUpdateColorValue] = useState('');
  const [isRaceDisabled, setIsRaceDisabled] = useState(false)

  const handleCreateClick = () => {
    if (nameRef.current.value.length > 0) {
      const name = String(nameRef.current.value);
      const color = String(colorRef.current.value);
      dispatch(createCar({ name, color }));
      nameRef.current.value = '';
    }
  };

  const handleUpdateClick = () => {
    const updatedCar = {
      name: updateNameValue,
      color: updateColorValue,
      id: myState.carToUpdate,
    };
    dispatch(updateCar(updatedCar));
  };

  const handleUpdateColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateColorValue(e.target.value);
  };

  const handleUpdateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateNameValue(e.target.value);
  };

  const handleRace = () => {
    if (myState.winnerId) {
      return;
    }
    const startIndex = (pages.value - 1) * pages.itemsPerPage;
    const endIndex = startIndex + pages.itemsPerPage;
    const carsToLaunch = myState.cars.slice(startIndex, endIndex).map((u) => u.id);
    setIsRaceDisabled(true)
    dispatch(startRace(carsToLaunch));
  };

  const handleResetClick = () => {
    const startIndex = (pages.value - 1) * pages.itemsPerPage;
    const endIndex = startIndex + pages.itemsPerPage;
    const carsToReset = myState.cars.slice(startIndex, endIndex).map((u) => u.id);
    setIsRaceDisabled(false);
    dispatch(resetCars(carsToReset));
  };

  const handleGenerateClick = () => {
    dispatch(generateCars());
  };

  useEffect(() => {
    const carToUpdate = myState.cars.filter((u) => u.id === myState.carToUpdate)[0];
    if (carToUpdate) {
      setUpdateNameValue(carToUpdate.name);
      setUpdateColorValue(carToUpdate.color);
    }
  }, [myState.carToUpdate]);
  return (
    <Wrapper>
      <div className="create-panel__input-btn">
        <input type="text" placeholder="Введите марку машины" ref={nameRef} />
        <input className="create-panel__color-input" type="color" ref={colorRef} />
        <button type="button" onClick={handleCreateClick}>Create</button>
      </div>
      <div>
        <input placeholder="Введите марку машины" onChange={handleUpdateNameChange} value={updateNameValue} ref={nameUpdateRef} />
        <input className="create-panel__color-input" onChange={handleUpdateColorChange} type="color" value={updateColorValue} ref={colorUpdateRef} />
        <button type="button" onClick={handleUpdateClick}>Update</button>
      </div>
      <div>
        <button type="button" onClick={handleRace} disabled={isRaceDisabled}>Race</button>
        <button type="button" onClick={handleResetClick}>Reset</button>
        <button type="button" onClick={handleGenerateClick}>Generate Cars</button>
      </div>
      <h1>
        Количество машин
        {' '}
        {myState.cars.length}
      </h1>
    </Wrapper>
  );
}

export default CreatePanel;
