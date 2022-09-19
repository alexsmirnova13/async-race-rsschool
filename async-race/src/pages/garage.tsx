import { useEffect, useState } from 'react';
import CarTrack from '../components/CarTrack';
import CreatePanel from '../components/CreatePanel';
import PageBar from '../components/PageBar';
import Popup from '../components/Popup';
import { useAppSelector } from '../hooks/redux';

function Garage() {
  const counter = useAppSelector((state) => state.counter);
  const pages = useAppSelector((state) => state.pages);

  const { cars, winnerId, winnerTime, isLoading } = counter;

  const [showPopup, isShowPopup] = useState(false);

  const startIndex = (pages.value - 1) * pages.itemsPerPage;
  const endIndex = startIndex + pages.itemsPerPage;
  const carsToShow = cars.slice(startIndex, endIndex);

  useEffect(() => {
    if (winnerId && winnerTime) {
      isShowPopup(true);
    }
  }, [winnerId, winnerTime]);

  return (
    <>
      <CreatePanel />
      {carsToShow.map((u) => <CarTrack key={u.id} car={u} />)}
      {showPopup && winnerId && winnerTime
      && (
      <Popup
        winner={cars.filter((u) => u.id === winnerId)[0]}
        winnerTime={winnerTime}
        action={() => isShowPopup(false)}
      />
      )}
      <PageBar isDisabled={isLoading}/>
    </>
  );
}

export default Garage;
