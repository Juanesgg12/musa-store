package com.musa.backend.service;

import com.musa.backend.dto.CategoriaRequest;
import com.musa.backend.dto.CategoriaResponse;
import com.musa.backend.entity.Categoria;
import com.musa.backend.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<CategoriaResponse> obtenerTodas() {
        return categoriaRepository.findAll()
                .stream()
                .map(CategoriaResponse::new)
                .toList();
    }

    public CategoriaResponse obtenerPorId(Long id) {
        Categoria categoria = buscarPorIdOLanzarError(id);
        return new CategoriaResponse(categoria);
    }

    public CategoriaResponse crear(CategoriaRequest request) {
        Categoria categoria = new Categoria();
        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
        categoria.setImagen(request.getImagen());

        Categoria guardada = categoriaRepository.save(categoria);
        return new CategoriaResponse(guardada);
    }

    public CategoriaResponse actualizar(Long id, CategoriaRequest request) {
        Categoria categoria = buscarPorIdOLanzarError(id);

        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
        categoria.setImagen(request.getImagen());

        Categoria actualizada = categoriaRepository.save(categoria);
        return new CategoriaResponse(actualizada);
    }

    public void eliminar(Long id) {
        Categoria categoria = buscarPorIdOLanzarError(id);
        categoria.setActivo(false);
        categoriaRepository.save(categoria);
    }

    private Categoria buscarPorIdOLanzarError(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Categoría con id " + id + " no encontrada"));
    }
}
