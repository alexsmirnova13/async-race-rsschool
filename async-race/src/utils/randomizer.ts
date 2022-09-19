export const getRandomCarName = () => {
  const brands = ['Tesla', 'Volkswagen', 'BMW', 'Lexus', 'Mitsubishi', 'Toyota',
    'Mazda', 'Audi', 'Opel', 'Skoda', 'KIA', 'Hyndai', 'Nissan',
    'Ford', 'Jaguar', 'Mercedes', 'Volvo', 'Honda', 'Subaru'];
  const models = ['Tiguan', 'Micra', 'Avensis', 'Solaris', 'Elantra', 'X3', 'X5', 'Galant',
    'Lancer', 'Mondeo', 'Octavia', 'Skyline', 'Juke', 'Sportage', 'Mustang', 'Ls',
    'Golf', 'Camry', 'Carnival', 'Optima', 'Yaris', 'Corolla'];
  const BrandIndex = Math.floor(Math.random() * brands.length);
  const ModelIndex = Math.floor(Math.random() * brands.length);
  return `${brands[BrandIndex]} ${models[ModelIndex]}`;
};

export const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};
