package com.musa.backend.dto;

import com.musa.backend.entity.Producto;

import java.math.BigDecimal;

public class ProductoResponse {

    private Long id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private Integer stock;
    private boolean personalizable;
    private boolean activo;
    private CategoriaResponse categoria;

    public ProductoResponse(Producto producto) {
        this.id = producto.getId();
        this.nombre = producto.getNombre();
        this.descripcion = producto.getDescripcion();
        this.precio = producto.getPrecio();
        this.stock = producto.getStock();
        this.personalizable = producto.isPersonalizable();
        this.activo = producto.isActivo();
        this.categoria = new CategoriaResponse(producto.getCategoria());
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public Integer getStock() {
        return stock;
    }

    public boolean isPersonalizable() {
        return personalizable;
    }

    public boolean isActivo() {
        return activo;
    }

    public CategoriaResponse getCategoria() {
        return categoria;
    }
}
