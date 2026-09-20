package com.musa.backend.controller;

import com.musa.backend.dto.VentasResponse;
import com.musa.backend.service.VentasService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin/ventas")
public class AdminVentasController {

    private final VentasService ventasService;

    public AdminVentasController(VentasService ventasService) {
        this.ventasService = ventasService;
    }

    @GetMapping
    public VentasResponse obtenerVentas(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaDesde,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaHasta
    ) {
        return ventasService.obtenerVentas(fechaDesde, fechaHasta);
    }
}
