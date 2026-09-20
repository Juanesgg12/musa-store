package com.musa.backend.dto;

import com.musa.backend.entity.Personalizacion;

public class PersonalizacionResponse {

    private String ocasion;
    private String nombre;
    private String mensaje;
    private String imagenUrl;
    private Long disenoId;
    private String instrucciones;

    public PersonalizacionResponse(Personalizacion personalizacion) {
        this.ocasion = personalizacion.getOcasion();
        this.nombre = personalizacion.getNombre();
        this.mensaje = personalizacion.getMensaje();
        this.imagenUrl = personalizacion.getImagenUrl();
        this.disenoId = personalizacion.getDisenoId();
        this.instrucciones = personalizacion.getInstrucciones();
    }

    public String getOcasion() {
        return ocasion;
    }

    public String getNombre() {
        return nombre;
    }

    public String getMensaje() {
        return mensaje;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public Long getDisenoId() {
        return disenoId;
    }

    public String getInstrucciones() {
        return instrucciones;
    }
}
