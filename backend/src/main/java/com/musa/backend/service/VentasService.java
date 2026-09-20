package com.musa.backend.service;

import com.musa.backend.dto.ProductoVendidoResponse;
import com.musa.backend.dto.VentasResponse;
import com.musa.backend.entity.EstadoPedido;
import com.musa.backend.entity.Pedido;
import com.musa.backend.entity.PedidoItem;
import com.musa.backend.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Calcula las métricas básicas de ventas (MUSA-002 RF-064, MUSA-003 UC-022).
 * Para el tamaño de datos esperado en el MVP, es más simple traer los pedidos
 * del periodo y agregarlos en memoria que escribir consultas de agregación en
 * JPQL — si el volumen de pedidos crece mucho, esto se puede optimizar luego
 * sin cambiar el contrato de la API.
 */
@Service
public class VentasService {

    private final PedidoRepository pedidoRepository;

    public VentasService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public VentasResponse obtenerVentas(LocalDate fechaDesde, LocalDate fechaHasta) {
        LocalDateTime desde = fechaDesde != null ? fechaDesde.atStartOfDay() : LocalDateTime.of(2000, 1, 1, 0, 0);
        LocalDateTime hasta = fechaHasta != null ? fechaHasta.atTime(LocalTime.MAX) : LocalDateTime.now();

        List<Pedido> pedidos = pedidoRepository.findByFechaCreacionBetween(desde, hasta);

        Map<String, Long> pedidosPorEstado = pedidos.stream()
                .collect(Collectors.groupingBy(p -> p.getEstado().name(), Collectors.counting()));

        // Un pedido cancelado nunca fue una venta real: no cuenta para el total
        // vendido ni para los productos más vendidos, aunque sí para el conteo
        // general de pedidos y el desglose por estado de arriba.
        List<Pedido> pedidosValidos = pedidos.stream()
                .filter(p -> p.getEstado() != EstadoPedido.CANCELADO)
                .toList();

        BigDecimal totalVendido = pedidosValidos.stream()
                .map(Pedido::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<ProductoVendidoResponse> productosMasVendidos = calcularProductosMasVendidos(pedidosValidos);

        return new VentasResponse(pedidos.size(), totalVendido, pedidosPorEstado, productosMasVendidos);
    }

    private List<ProductoVendidoResponse> calcularProductosMasVendidos(List<Pedido> pedidosValidos) {
        Map<Long, ProductoVendidoAcumulador> acumulado = new LinkedHashMap<>();

        for (Pedido pedido : pedidosValidos) {
            for (PedidoItem item : pedido.getItems()) {
                acumulado
                        .computeIfAbsent(item.getProducto().getId(),
                                id -> new ProductoVendidoAcumulador(id, item.getNombreProducto()))
                        .sumar(item.getCantidad());
            }
        }

        return acumulado.values().stream()
                .sorted(Comparator.comparingInt(ProductoVendidoAcumulador::getCantidad).reversed())
                .limit(5)
                .map(a -> new ProductoVendidoResponse(a.productoId, a.nombre, a.getCantidad()))
                .toList();
    }

    private static class ProductoVendidoAcumulador {
        private final Long productoId;
        private final String nombre;
        private int cantidad;

        ProductoVendidoAcumulador(Long productoId, String nombre) {
            this.productoId = productoId;
            this.nombre = nombre;
        }

        void sumar(int unidades) {
            this.cantidad += unidades;
        }

        int getCantidad() {
            return cantidad;
        }
    }
}
