package Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Model.Evento;
import Service.EventoService;

@RestController
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping("/listar/{adminId}")
    public List<Evento> listarEventos(@PathVariable Long adminId) {
        return eventoService.listarEventosPorAdmin(adminId);
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Evento> cadastrarEvento(@RequestParam String nome, @RequestParam String data, @RequestParam String localizacao, @RequestParam String imagemUrl, @RequestParam Long adminId) {
        Evento evento = eventoService.cadastrarEvento(nome, data, localizacao, imagemUrl, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(evento);
    }

    @PutMapping("/atualizar/{eventoId}")
    public ResponseEntity<Evento> atualizarEvento(@PathVariable Long eventoId, @RequestParam String data, @RequestParam String localizacao) {
        Evento evento = eventoService.atualizarEvento(eventoId, data, localizacao);
        return ResponseEntity.ok(evento);
    }

    @DeleteMapping("/excluir/{eventoId}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long eventoId) {
        eventoService.excluirEvento(eventoId);
        return ResponseEntity.noContent().build();
    }
}

