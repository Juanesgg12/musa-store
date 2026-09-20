package com.musa.backend.controller;

import com.musa.backend.dto.CambiarRolRequest;
import com.musa.backend.dto.UsuarioResponse;
import com.musa.backend.security.UsuarioPrincipal;
import com.musa.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/me")
    public UsuarioResponse obtenerPerfilActual(@AuthenticationPrincipal UsuarioPrincipal principal) {
        return new UsuarioResponse(principal.getUsuario());
    }

    @GetMapping
    public List<UsuarioResponse> obtenerTodos() {
        return usuarioService.obtenerTodos();
    }

    @PutMapping("/{id}/rol")
    public UsuarioResponse cambiarRol(@PathVariable Long id, @Valid @RequestBody CambiarRolRequest request) {
        return usuarioService.cambiarRol(id, request);
    }
}
