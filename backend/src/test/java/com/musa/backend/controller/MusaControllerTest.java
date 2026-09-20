package com.musa.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(MusaController.class)
class MusaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void deberiaMostrarBienvenida() throws Exception {
        mockMvc.perform(get("/api/v1"))
               .andExpect(content().string("Bienvenido a Musa"));
    }
}
