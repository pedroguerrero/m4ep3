import axios from 'axios';
import docImg from '../../assets/doc-1.png';

export const getDoctors = async () => {
  const specialties = ['Pediatría', 'Cardiología', 'Cirugía', 'Traumatología'];
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return data.map(({ id, name }) => ({
    id,
    name,
    specialty: specialties[Math.floor(Math.random() * specialties.length)],
    img: docImg,
    experience: Math.floor(Math.random() * 10) + 1,
    description:
      'Some quick example text to build on the card title and make up the bulk of the cards content.',
  }));
};
