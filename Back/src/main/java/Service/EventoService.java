package Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Model.Admin;
import Model.Evento;
import Repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public List<Evento> listarEventosPorAdmin(Long adminId) {
        return eventoRepository.findByAdminId(adminId);
    }

    public Evento cadastrarEvento(String nome, String data, String localizacao, String imagemUrl, Long adminId) {
        Evento evento = new Evento();
        evento.setNome(nome);
        evento.setData(data);
        evento.setLocalizacao(localizacao);
        evento.setImagemUrl(imagemUrl);

        Admin admin = new Admin();
        evento.setAdmin(admin);

        return eventoRepository.save(evento);
    }

    public Evento atualizarEvento(Long eventoId, String data, String localizacao) {
        Evento evento = eventoRepository.findById(eventoId)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        evento.setData(data);
        evento.setLocalizacao(localizacao);

        return eventoRepository.save(evento);
    }

    public void excluirEvento(Long eventoId) {
        eventoRepository.deleteById(eventoId);
    }
}

