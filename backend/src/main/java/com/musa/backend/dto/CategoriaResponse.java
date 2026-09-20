package com.musa.backend.dto;

import com.musa.backend.entity.Categoria;

public class CategoriaResponse {

    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private boolean activo;

    public CategoriaResponse(Categoria categoria) {
        this.id = categoria.getId();
        this.nombre = categoria.getNombre();
        this.descripcion = categoria.getDescripcion();
        this.imagen = categoria.getImagen();
        this.activo = categoria.isActivo();
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

    public String getImagen() {
        return imagen;
    }

    public boolean isActivo() {
        return activo;
    }
}
