package gurpo2.Backend.Dtos.Request;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fechas {


    @NotNull(message = "La fecha de entrega no puede ser nula.")
    Date fechaEntrega;

    @NotNull(message = "La fecha de retiro no puede ser nula.")
    Date fechaRetiro;

}
