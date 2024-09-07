package gurpo2.Backend.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class PedidoController {

    @GetMapping("/publicar")
    public ResponseEntity<String> publicarEnvio(){
        return ResponseEntity.ok("Pedido publicado");
    }

}
