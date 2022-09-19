import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CarSVG } from '../assets/car-svgrepo-com.svg';
import useAnimationFrame from '../hooks/animation';
import { useAppDispatch } from '../hooks/redux';
import ICar from '../interfaces/Car';
import {
  carFinished, deleteCar, launchCar, resetCars, setCarToUpdate,
} from '../redux/slices/counter';

const Wrapper = styled.div`
.car-track__track{
    display: flex;
    flex-direction: row;
    border-bottom: solid;
    width: 90vw;
    justify-content: space-between;
    .flag{
        width: 70px;
        height: 70px;
        padding-top: 20px;
    }
}
img{
    width: 100px;
    height: 100px;
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
.car-track__btns-and-name{
    display: flex;
    flex-direction: row;

}
.car-track__btns-and-car{
    display: flex;
    flex-direction: row;
    width:100%;
}
.car-track__track-btns{
    display: flex;
    flex-direction: column;
}
.svg-div-wrapper {
  position: relative;
  min-width: 400px;
  width:100%;
  flex-grow: 1;
}
.svg-div {
  position:absolute;
}
`;

interface ICarTrackProps {
  car: ICar
}

function CarTrack(props:ICarTrackProps) {
  const { car } = props;
  const dispatch = useAppDispatch();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { velocity, distance, status } = car;

  useEffect(
    () => {
      if (!shouldAnimate && status === 'started') {
        setShouldAnimate(true);
      } else {
        setShouldAnimate(false);
      }
    },
    [status],
  );

  const carRef = useRef(null);

  const nextAnimationFrameHandler = (progress:any) => {
    if (!carRef.current) {
      return
    }
    const carFromRef = carRef.current;
    if (car) {
      if (progress < 1) {
        carFromRef.style.left = `${100 * progress}%`;
      } else {
        setShouldAnimate(false);
        carFromRef.style.left = '100%';
        dispatch(carFinished(car.id));
      }
    }
  };

  useAnimationFrame({
    nextAnimationFrameHandler,
    shouldAnimate,
    duration: distance / velocity,
  });

  const handleSelectClick = () => {
    const carId = car.id;
    dispatch(setCarToUpdate(carId));
  };

  const handleDeleteClick = () => {
    const cardId = car.id;
    dispatch(deleteCar(cardId));
  };

  const handleLaunchClick = () => {
    dispatch(launchCar(car.id));
  };

  const handleResetClick = () => {
    dispatch(resetCars([car.id]));
  };

  if (car.status === 'stopped'&&carRef.current) {
    carRef.current.style.left = 0;
  }
  
  return (
    <Wrapper>
      <div className="car-track__btns-and-name">
        <button type="button" onClick={handleSelectClick}>Select</button>
        <button type="button" onClick={handleDeleteClick}>Remove</button>
        <p>{car.name}</p>
      </div>
      <div className="car-track__track">
        <div className="car-track__btns-and-car">
          <div className="car-track__track-btns">
            <button type="button" onClick={handleLaunchClick} disabled={car.status&&car.status!=='stopped'}>Launch</button>
            <button type="button" onClick={handleResetClick} disabled={!car.status||car.status==='stopped'}>Reset</button>
          </div>
          <div className="svg-div-wrapper">
            <div ref={carRef} className="svg-div">
              <CarSVG fill={car.color} stroke="green" height="100px" width="100px" />
            </div>
          </div>
          <img className="flag" src="https://cdn-icons-png.flaticon.com/512/985/985802.png" alt="flag" />
        </div>
      </div>

    </Wrapper>
  );
}

export default CarTrack;
