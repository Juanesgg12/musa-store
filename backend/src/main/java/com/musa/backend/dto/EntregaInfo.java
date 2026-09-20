package com.musa.backend.dto;

import com.musa.backend.entity.MetodoEntrega;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EntregaInfo {

    @NotBlank(message = "El municipio de entrega es obligatorio")
    private String municipio;

    @NotBlank(message = "La dirección de entrega es obligatoria")
    private String direccion;

    @NotNull(message = "El método de entrega es obligatorio")
    private MetodoEntrega metodo;

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public MetodoEntrega getMetodo() {
        return metodo;
    }

    public void setMetodo(MetodoEntrega metodo) {
        this.metodo = metodo;
    }
}
