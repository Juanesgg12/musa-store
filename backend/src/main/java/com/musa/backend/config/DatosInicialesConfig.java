package com.musa.backend.config;

import com.musa.backend.entity.Rol;
import com.musa.backend.repository.RolRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatosInicialesConfig implements CommandLineRunner {

    private final RolRepository rolRepository;

    public DatosInicialesConfig(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Override
    public void run(String... args) {
        crearRolSiNoExiste(Rol.CLIENTE);
        crearRolSiNoExiste(Rol.ADMIN);
    }

    private void crearRolSiNoExiste(String nombre) {
        rolRepository.findByNombre(nombre)
                .orElseGet(() -> rolRepository.save(new Rol(nombre)));
    }
}
