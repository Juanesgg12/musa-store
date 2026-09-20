package com.musa.backend.service;

import com.musa.backend.dto.ProductoRequest;
import com.musa.backend.dto.ProductoResponse;
import com.musa.backend.entity.Categoria;
import com.musa.backend.entity.Producto;
import com.musa.backend.repository.CategoriaRepository;
import com.musa.backend.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<ProductoResponse> obtenerTodos() {
        return productoRepository.findAll()
                .stream()
                .map(ProductoResponse::new)
                .toList();
    }

    public ProductoResponse obtenerPorId(Long id) {
        return new ProductoResponse(buscarPorIdOLanzarError(id));
    }

    public ProductoResponse crear(ProductoRequest request) {
        Categoria categoria = buscarCategoriaOLanzarError(request.getCategoriaId());

        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setPersonalizable(request.isPersonalizable());
        producto.setCategoria(categoria);

        Producto guardado = productoRepository.save(producto);
        return new ProductoResponse(guardado);
    }

    public ProductoResponse actualizar(Long id, ProductoRequest request) {
        Producto producto = buscarPorIdOLanzarError(id);
        Categoria categoria = buscarCategoriaOLanzarError(request.getCategoriaId());

        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setPersonalizable(request.isPersonalizable());
        producto.setCategoria(categoria);

        Producto actualizado = productoRepository.save(producto);
        return new ProductoResponse(actualizado);
    }

    public void eliminar(Long id) {
        Producto producto = buscarPorIdOLanzarError(id);
        producto.setActivo(false);
        productoRepository.save(producto);
    }

    private Producto buscarPorIdOLanzarError(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Producto con id " + id + " no encontrado"));
    }

    private Categoria buscarCategoriaOLanzarError(Long categoriaId) {
        return categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "La categoría con id " + categoriaId + " no existe"));
    }
}
