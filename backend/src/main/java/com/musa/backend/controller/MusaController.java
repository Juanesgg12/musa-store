package com.musa.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MusaController {

    @GetMapping("/api/v1")
    public String bienvenida() {
        return "Bienvenido a Musa";
    }
}