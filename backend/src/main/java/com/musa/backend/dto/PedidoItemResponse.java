package com.musa.backend.dto;

import com.musa.backend.entity.PedidoItem;

import java.math.BigDecimal;

public class PedidoItemResponse {

    private Long id;
    private Long productoId;
    private String nombreProducto;
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subtotal;
    private PersonalizacionResponse personalizacion;

    public PedidoItemResponse(PedidoItem item) {
        this.id = item.getId();
        this.productoId = item.getProducto().getId();
        this.nombreProducto = item.getNombreProducto();
        this.precioUnitario = item.getPrecioUnitario();
        this.cantidad = item.getCantidad();
        this.subtotal = item.getSubtotal();
        this.personalizacion = item.getPersonalizacion() != null
                ? new PersonalizacionResponse(item.getPersonalizacion())
                : null;
    }

    public Long getId() {
        return id;
    }

    public Long getProductoId() {
        return productoId;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public PersonalizacionResponse getPersonalizacion() {
        return personalizacion;
    }
}
