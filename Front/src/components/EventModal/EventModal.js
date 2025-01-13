import React, { useState, useEffect } from 'react';
import './EventModal.css';

const EventModal = ({ salvarEvento, evento, fecharModal }) => {
  const [localEvento, setLocalEvento] = useState({ ...evento });
  const [previewImagem, setPreviewImagem] = useState(evento.imagem || '');

  useEffect(() => {
    setLocalEvento({ ...evento });
  }, [evento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalEvento((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result);
        setLocalEvento((prev) => ({ ...prev, imagem: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    salvarEvento(localEvento);
  };

  return (
    <div className="modal">
      <h2>{localEvento.id ? 'Editar Evento' : 'Adicionar Novo Evento'}</h2>
      <input
        type="text"
        name="nome"
        value={localEvento.nome || ''}
        onChange={handleChange}
        placeholder="Nome do evento"
      />
      <input
        type="date"
        name="data"
        value={localEvento.data || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="localizacao"
        value={localEvento.localizacao || ''}
        onChange={handleChange}
        placeholder="Localização"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {previewImagem && <img src={previewImagem} alt="Pré-visualização" style={{ maxWidth: '200px', marginTop: '10px' }} />}
      <button onClick={handleSave}>Salvar</button>
      <button onClick={fecharModal}>Cancelar</button>
    </div>
  );
};

export default EventModal;
