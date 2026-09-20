package com.musa.backend.dto;

public class ProductoVendidoResponse {

    private Long productoId;
    private String nombre;
    private int cantidadVendida;

    public ProductoVendidoResponse(Long productoId, String nombre, int cantidadVendida) {
        this.productoId = productoId;
        this.nombre = nombre;
        this.cantidadVendida = cantidadVendida;
    }

    public Long getProductoId() {
        return productoId;
    }

    public String getNombre() {
        return nombre;
    }

    public int getCantidadVendida() {
        return cantidadVendida;
    }
}
