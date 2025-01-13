import React from 'react';
import './EventCard.css'; 

const EventCard = ({ evento, onExcluir, onEditar }) => {
  return (
    <div className="event-card">
      <img src={evento.imagem} alt={evento.nome} className="event-image" />
      <h3 className="evento-titulo">{evento.nome}</h3>
      <p><strong>Data:</strong> {evento.data}</p>
      <p><strong>Localização:</strong> {evento.localizacao}</p>
      <div className="event-actions">
        <button onClick={() => onEditar(evento)}>Editar</button>
        <button onClick={() => onExcluir(evento.id)}>Excluir</button>
      </div>
    </div>
  );
};

export default EventCard;
