package gurpo2.Backend.Dtos.Request;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DatosRequest {

    @NotBlank
    String tipoCarga;
    @Valid
    Fechas fechas;
    @Valid
    Domicilio domicilioEntrega;
    @Valid
    Domicilio domicilioRetiro;
}
