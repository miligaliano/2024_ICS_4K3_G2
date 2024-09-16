package gurpo2.Backend.Services;

public class PedidoService {

    public void enviarMail(){
        String host = "smtp.gmail.com";
        String port = "587"; // O "465" para SSL
        String username = "guidedios03@gmail.com";
        String password = "buwe pxlg mwpu rlmm"; // Contraseña de aplicación generada

        EmailSender emailSender = new EmailSender(host, port, username, password);

        try {
            emailSender.sendEmail("guille_dedios03@hotmail.com", "probando", "Contenido del correo"); //mail,asunto,contenido
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
