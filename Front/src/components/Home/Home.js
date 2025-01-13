import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../EventCard/EventCard';
import EventModal from '../EventModal/EventModal';
import './Home.css';

const Home = () => {
  const [eventos, setEventos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [eventoAtual, setEventoAtual] = useState(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const eventosSalvos = JSON.parse(localStorage.getItem('eventos')) || [];
    setEventos(eventosSalvos);
  }, [navigate]);

  const handleAdicionarEvento = () => {
    setEventoAtual({ nome: '', data: '', localizacao: '', imagem: '' });
    setModalAberto(true);
  };

  const handleEditarEvento = (evento) => {
    setEventoAtual(evento);
    setModalAberto(true);
  };

  const handleSalvarEvento = (evento) => {
    if (!evento.nome || !evento.data || !evento.localizacao || !evento.imagem) {
      setErro('Preencha todos os campos do evento.');
      return;
    }

    const eventosAtualizados = evento.id
      ? eventos.map((ev) => (ev.id === evento.id ? { ...ev, ...evento } : ev))
      : [...eventos, { ...evento, id: Date.now() }];

    setEventos(eventosAtualizados);
    localStorage.setItem('eventos', JSON.stringify(eventosAtualizados));
    setModalAberto(false);
    setErro('');
  };

  const handleExcluir = (id) => {
    const eventosAtualizados = eventos.filter((evento) => evento.id !== id);
    setEventos(eventosAtualizados);
    localStorage.setItem('eventos', JSON.stringify(eventosAtualizados));
  };

  return (
    <div className="home-container">
      <h2 className="title">Eventos</h2>
      <button className="adicionar-evento" onClick={handleAdicionarEvento}>
        Adicionar Evento
      </button>
      {erro && <p className="error">{erro}</p>}
      <div className="eventos">
        {eventos.map((evento) => (
          <EventCard
            key={evento.id}
            evento={evento}
            onExcluir={handleExcluir}
            onEditar={handleEditarEvento}
          />
        ))}
      </div>
      {modalAberto && (
        <EventModal
          evento={eventoAtual}
          salvarEvento={handleSalvarEvento}
          fecharModal={() => setModalAberto(false)}
        />
      )}
    </div>
  );
};

export default Home;
