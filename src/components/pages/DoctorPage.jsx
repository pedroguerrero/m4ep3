import { useState, useEffect, useContext } from 'react';
import background from '../../assets/bg-2.jpg';
import { getDoctors } from '../utils/doctor';
import Row from '../components/Row';
import Loading from '../components/Loading';
import Container from '../components/Container';
import DoctorList from '../components/DoctorList';
import DoctorModal from '../components/DoctorModal';
import { DoctorsContext } from '../../store/DoctorsContext';

export default function DoctorPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { doctors, setDoctors, showModalDoctor, setShowModalDoctor } =
    useContext(DoctorsContext);

  useEffect(() => {
    if (doctors.length) {
      setIsLoading(false);
      return;
    }

    getDoctors()
      .then((data) => {
        setDoctors(data);
        setIsLoading(false);
      })
      .catch(() => alert('Error al obtener los medicos'));
  }, [doctors.length, setDoctors]);

  return (
    <>
      <DoctorModal
        title="Información del Doctor"
        showModal={showModalDoctor}
        setShowModal={setShowModalDoctor}
      />
      <main>
        <section
          className="medical-team-section"
          style={{
            padding: '200px',
            background: `url(${background}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <Container className="container text-center">
            <Row>
              <Container className="col">
                <h1>Equipo médico</h1>
                <p className="fs-4">
                  Conoce a nuestro equipo médico, un grupo de profesionales
                  altamente capacitados y dedicados a tu bienestar. Cada miembro
                  aporta experiencia, compromiso y un enfoque humano para
                  brindarte la mejor atención posible. Estamos aquí para cuidar
                  de ti en cada paso del camino hacia la recuperación.
                </p>
              </Container>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="container">
            <Row>
              <Container className="col text-center mt-5 mb-5">
                <h2>Equipo médico</h2>
              </Container>
            </Row>

            {isLoading ? (
              <Loading size="5rem" />
            ) : (
              <DoctorList doctors={doctors} />
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
