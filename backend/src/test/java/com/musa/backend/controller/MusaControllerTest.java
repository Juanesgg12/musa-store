package com.musa.backend.controller;

import com.musa.backend.security.JwtService;
import com.musa.backend.security.UsuarioDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(MusaController.class)
class MusaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    // El filtro JWT (parte de la configuración de seguridad) necesita estos beans
    // para poder construirse, aunque este test no ejercite autenticación.
    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private UsuarioDetailsService usuarioDetailsService;

    @Test
    void deberiaMostrarBienvenida() throws Exception {
        mockMvc.perform(get("/api/v1"))
               .andExpect(content().string("Bienvenido a Musa"));
    }
}
