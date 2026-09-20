package com.musa.backend.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class VentasResponse {

    private long totalPedidos;
    private BigDecimal totalVendido;
    private Map<String, Long> pedidosPorEstado;
    private List<ProductoVendidoResponse> productosMasVendidos;

    public VentasResponse(
            long totalPedidos,
            BigDecimal totalVendido,
            Map<String, Long> pedidosPorEstado,
            List<ProductoVendidoResponse> productosMasVendidos
    ) {
        this.totalPedidos = totalPedidos;
        this.totalVendido = totalVendido;
        this.pedidosPorEstado = pedidosPorEstado;
        this.productosMasVendidos = productosMasVendidos;
    }

    public long getTotalPedidos() {
        return totalPedidos;
    }

    public BigDecimal getTotalVendido() {
        return totalVendido;
    }

    public Map<String, Long> getPedidosPorEstado() {
        return pedidosPorEstado;
    }

    public List<ProductoVendidoResponse> getProductosMasVendidos() {
        return productosMasVendidos;
    }
}
