import { Routes, Route } from 'react-router-dom';
import Garage from './garage';

const useRoutes = () => (
  <Routes>
    <Route path="/" element={<Garage />} />
    <Route path="*" element={<Garage />} />
  </Routes>
);

export default useRoutes;
