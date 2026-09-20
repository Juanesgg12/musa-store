package com.musa.backend.dto;

public class LoginResponse {

    private String token;
    private String tipo = "Bearer";
    private UsuarioResponse usuario;

    public LoginResponse(String token, UsuarioResponse usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public String getTipo() {
        return tipo;
    }

    public UsuarioResponse getUsuario() {
        return usuario;
    }
}
