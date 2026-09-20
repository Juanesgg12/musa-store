package com.musa.backend.dto;

import com.musa.backend.entity.EstadoPedido;
import com.musa.backend.entity.Pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PedidoResponse {

    private Long id;
    private String codigo;
    private EstadoPedido estado;
    private BigDecimal subtotal;
    private BigDecimal costoEnvio;
    private BigDecimal total;
    private LocalDateTime fechaCreacion;

    public PedidoResponse(Pedido pedido) {
        this.id = pedido.getId();
        this.codigo = pedido.getCodigo();
        this.estado = pedido.getEstado();
        this.subtotal = pedido.getSubtotal();
        this.costoEnvio = pedido.getCostoEnvio();
        this.total = pedido.getTotal();
        this.fechaCreacion = pedido.getFechaCreacion();
    }

    public Long getId() {
        return id;
    }

    public String getCodigo() {
        return codigo;
    }

    public EstadoPedido getEstado() {
        return estado;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public BigDecimal getCostoEnvio() {
        return costoEnvio;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
}
