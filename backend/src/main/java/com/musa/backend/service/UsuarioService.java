package com.musa.backend.service;

import com.musa.backend.dto.CambiarRolRequest;
import com.musa.backend.dto.UsuarioResponse;
import com.musa.backend.entity.Rol;
import com.musa.backend.entity.Usuario;
import com.musa.backend.repository.RolRepository;
import com.musa.backend.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
public class UsuarioService {

    private static final Set<String> ROLES_VALIDOS = Set.of(Rol.CLIENTE, Rol.ADMIN);

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, RolRepository rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    public List<UsuarioResponse> obtenerTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }

    public UsuarioResponse cambiarRol(Long id, CambiarRolRequest request) {
        if (!ROLES_VALIDOS.contains(request.getRol())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Rol inválido. Los valores permitidos son: " + ROLES_VALIDOS);
        }

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Usuario con id " + id + " no encontrado"));

        Rol nuevoRol = rolRepository.findByNombre(request.getRol())
                .orElseThrow(() -> new IllegalStateException("El rol " + request.getRol() + " no existe en la base de datos"));

        usuario.setRol(nuevoRol);
        Usuario actualizado = usuarioRepository.save(usuario);
        return new UsuarioResponse(actualizado);
    }
}
