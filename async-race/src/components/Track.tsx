import ICar from '../interfaces/Car';

interface TrackProps {
  car: ICar
}

function Track(props: TrackProps) {
  const { car } = props;

  return (
    <div style={{ color: car.color }}>
      <span>{car.id}</span>
      <span>{car.name}</span>
      <span>{car.color}</span>
    </div>
  );
}

export default Track;
