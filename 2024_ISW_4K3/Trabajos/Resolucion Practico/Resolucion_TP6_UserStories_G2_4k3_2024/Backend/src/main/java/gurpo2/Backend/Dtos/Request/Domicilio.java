package gurpo2.Backend.Dtos.Request;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Domicilio {

    @NotBlank(message = "La calle no puede estar vacía.")
    String calle;

    @NotNull(message = "El número no puede ser nulo.")
    Integer numero;

    @NotBlank(message = "La localidad no puede estar vacía.")
    String localidad;

    @NotBlank(message = "La provincia no puede estar vacía.")
    String provincia;

    String referencia;
}
