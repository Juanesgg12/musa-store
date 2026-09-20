package com.musa.backend.config;

import com.musa.backend.entity.Rol;
import com.musa.backend.entity.Usuario;
import com.musa.backend.repository.RolRepository;
import com.musa.backend.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminBootstrapConfig implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrapConfig.class);

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;

    public AdminBootstrapConfig(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder,
            @Value("${musa.admin.bootstrap-email:}") String adminEmail,
            @Value("${musa.admin.bootstrap-password:}") String adminPassword
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        if (adminEmail.isBlank() || adminPassword.isBlank()) {
            return;
        }

        if (usuarioRepository.existsByEmail(adminEmail)) {
            return;
        }

        Rol rolAdmin = rolRepository.findByNombre(Rol.ADMIN)
                .orElseThrow(() -> new IllegalStateException("El rol ADMIN no existe en la base de datos"));

        Usuario admin = new Usuario();
        admin.setNombre("Administrador");
        admin.setApellido("Musa");
        admin.setEmail(adminEmail);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setRol(rolAdmin);

        usuarioRepository.save(admin);
        log.info("Cuenta ADMIN inicial creada para {}", adminEmail);
    }
}
