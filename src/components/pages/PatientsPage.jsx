import React, { useState, useEffect, useContext, createRef } from 'react';
import background from '../../assets/bg.jpg';
import Row from '../components/Row';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { getDoctors } from '../utils/doctor';
import Container from '../components/Container';
import { DoctorsContext } from '../../store/DoctorsContext';
import AppointmentForm from '../components/AppointmentForm';

export default function PatientsPage() {
  const [patient, setPatient] = useState({
    name: '',
    date: '',
    doctor: '',
    doctorId: 2,
    price: 0,
  });
  const [patients, setPatients] = useState([]);
  const { doctors, setDoctors } = useContext(DoctorsContext);
  const [showModal, setShowModal] = useState(false);
  const setPatientAttribute = (attribute, value) => {
    setPatient((patient) => ({
      ...patient,
      [attribute]: value,
    }));
  };

  useEffect(() => {
    if (doctors.length) {
      return;
    }

    getDoctors()
      .then((doctors) => {
        setDoctors(doctors);
      })
      .catch(() => alert('Error al obtener los medicos'));
  }, [doctors.length, setDoctors]);

  return (
    <React.Fragment>
      <Modal
        title="Agendar Paciente"
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <AppointmentForm
          setPatientAttribute={setPatientAttribute}
          patient={patient}
          doctors={doctors}
          onSubmit={(event) => {
            event.preventDefault();

            if (
              patient.name.trim() === '' ||
              patient.date.trim() === '' ||
              patient.doctor.trim() === '' ||
              patient.price === 0
            ) {
              alert('Todos los campos son requeridos');
              return;
            }

            setPatients((patients) => [...patients, patient]);

            setShowModal(false);
          }}
        />
      </Modal>

      <main>
        <section
          className="patients-section"
          style={{
            padding: '200px',
            background: `url(${background}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <Container className="container text-center">
            <Row>
              <Container className="col">
                <h1>Agendamiento de Pacientes</h1>
                <p className="fs-4">Generar agendamiento de pacientes</p>
              </Container>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="container mt-5">
            <Row>
              <Container className="col-md-12 text-end">
                <Button
                  className="btn btn-primary col-auto"
                  onClick={() => {
                    setPatient({
                      name: '',
                      date: '',
                      doctorId: 0,
                      doctor: '',
                      price: 0,
                    });
                    setShowModal(true);
                  }}
                >
                  Agendar Paciente
                </Button>
              </Container>
            </Row>
          </Container>
        </section>

        <section>
          <Container className="container mt-5">
            <Row>
              <Container className="col-md-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Doctor</th>
                      <th scope="col">Valor Consulta</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patients.map(({ name, date, doctor, price }, index) => (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>{date.split('-').reverse().join('-')}</td>
                        <td>{doctor}</td>
                        <td>{price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Container>
            </Row>
          </Container>
        </section>
      </main>
    </React.Fragment>
  );
}
