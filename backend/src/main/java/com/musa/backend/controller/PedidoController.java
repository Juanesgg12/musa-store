package com.musa.backend.controller;

import com.musa.backend.dto.ActualizarEstadoPedidoRequest;
import com.musa.backend.dto.CrearPedidoRequest;
import com.musa.backend.dto.PedidoDetalleResponse;
import com.musa.backend.dto.PedidoResponse;
import com.musa.backend.entity.Rol;
import com.musa.backend.entity.Usuario;
import com.musa.backend.security.UsuarioPrincipal;
import com.musa.backend.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PedidoResponse crear(
            @Valid @RequestBody CrearPedidoRequest request,
            @AuthenticationPrincipal UsuarioPrincipal principal
    ) {
        Usuario usuarioAutenticado = principal != null ? principal.getUsuario() : null;
        return pedidoService.crear(request, usuarioAutenticado);
    }

    @GetMapping("/mis-pedidos")
    public List<PedidoResponse> obtenerMisPedidos(@AuthenticationPrincipal UsuarioPrincipal principal) {
        return pedidoService.obtenerMisPedidos(principal.getUsuario());
    }

    @GetMapping("/{id}")
    public PedidoDetalleResponse obtenerPorId(
            @PathVariable Long id,
            @AuthenticationPrincipal UsuarioPrincipal principal
    ) {
        boolean esAdmin = principal.getUsuario().getRol().getNombre().equals(Rol.ADMIN);
        return pedidoService.obtenerDetalle(id, principal.getUsuario(), esAdmin);
    }

    @PutMapping("/{id}/estado")
    public PedidoResponse actualizarEstado(@PathVariable Long id, @Valid @RequestBody ActualizarEstadoPedidoRequest request) {
        return pedidoService.actualizarEstado(id, request);
    }
}
