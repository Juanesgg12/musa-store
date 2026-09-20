package com.musa.backend.repository;

import com.musa.backend.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);

    List<Pedido> findAllByOrderByFechaCreacionDesc();

    List<Pedido> findByFechaCreacionBetween(LocalDateTime desde, LocalDateTime hasta);
}
