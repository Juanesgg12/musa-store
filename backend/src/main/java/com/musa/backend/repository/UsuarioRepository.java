package com.musa.backend.repository;

import com.musa.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);

    // JOIN FETCH: trae el Rol en la misma consulta (no de forma perezosa).
    // Es necesario porque este método se usa desde el filtro de seguridad,
    // que corre antes de que Spring MVC abra la sesión de Hibernate para la
    // petición — si el rol quedara LAZY, fallaría con LazyInitializationException.
    @Query("SELECT u FROM Usuario u JOIN FETCH u.rol WHERE u.email = :email")
    Optional<Usuario> findByEmail(@Param("email") String email);
}
