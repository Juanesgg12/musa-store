package com.musa.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CrearPedidoRequest {

    @NotNull(message = "Los datos del cliente son obligatorios")
    @Valid
    private ClienteInfo cliente;

    @NotNull(message = "Los datos de entrega son obligatorios")
    @Valid
    private EntregaInfo entrega;

    @NotEmpty(message = "El pedido debe tener al menos un producto")
    @Valid
    private List<ItemPedidoRequest> items;

    public ClienteInfo getCliente() {
        return cliente;
    }

    public void setCliente(ClienteInfo cliente) {
        this.cliente = cliente;
    }

    public EntregaInfo getEntrega() {
        return entrega;
    }

    public void setEntrega(EntregaInfo entrega) {
        this.entrega = entrega;
    }

    public List<ItemPedidoRequest> getItems() {
        return items;
    }

    public void setItems(List<ItemPedidoRequest> items) {
        this.items = items;
    }
}
