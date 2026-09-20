package com.musa.backend.dto;

import com.musa.backend.entity.EstadoPedido;
import com.musa.backend.entity.MetodoEntrega;
import com.musa.backend.entity.Pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoDetalleResponse {

    private Long id;
    private String codigo;
    private EstadoPedido estado;
    private String nombreCliente;
    private String emailCliente;
    private String telefonoCliente;
    private String direccionEntrega;
    private String municipioEntrega;
    private MetodoEntrega metodoEntrega;
    private BigDecimal subtotal;
    private BigDecimal costoEnvio;
    private BigDecimal total;
    private List<PedidoItemResponse> items;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;

    public PedidoDetalleResponse(Pedido pedido) {
        this.id = pedido.getId();
        this.codigo = pedido.getCodigo();
        this.estado = pedido.getEstado();
        this.nombreCliente = pedido.getNombreCliente();
        this.emailCliente = pedido.getEmailCliente();
        this.telefonoCliente = pedido.getTelefonoCliente();
        this.direccionEntrega = pedido.getDireccionEntrega();
        this.municipioEntrega = pedido.getMunicipioEntrega();
        this.metodoEntrega = pedido.getMetodoEntrega();
        this.subtotal = pedido.getSubtotal();
        this.costoEnvio = pedido.getCostoEnvio();
        this.total = pedido.getTotal();
        this.items = pedido.getItems().stream().map(PedidoItemResponse::new).toList();
        this.fechaCreacion = pedido.getFechaCreacion();
        this.fechaActualizacion = pedido.getFechaActualizacion();
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

    public String getNombreCliente() {
        return nombreCliente;
    }

    public String getEmailCliente() {
        return emailCliente;
    }

    public String getTelefonoCliente() {
        return telefonoCliente;
    }

    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    public String getMunicipioEntrega() {
        return municipioEntrega;
    }

    public MetodoEntrega getMetodoEntrega() {
        return metodoEntrega;
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

    public List<PedidoItemResponse> getItems() {
        return items;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }
}
