package com.musa.backend.dto;

import com.musa.backend.entity.EstadoPedido;
import jakarta.validation.constraints.NotNull;

public class ActualizarEstadoPedidoRequest {

    @NotNull(message = "El estado es obligatorio")
    private EstadoPedido estado;

    public EstadoPedido getEstado() {
        return estado;
    }

    public void setEstado(EstadoPedido estado) {
        this.estado = estado;
    }
}
