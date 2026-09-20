package com.musa.backend.service;

import com.musa.backend.dto.*;
import com.musa.backend.entity.*;
import com.musa.backend.repository.PedidoRepository;
import com.musa.backend.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    public PedidoService(PedidoRepository pedidoRepository, ProductoRepository productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
    }

    public PedidoResponse crear(CrearPedidoRequest request, Usuario usuarioAutenticado) {
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuarioAutenticado);

        pedido.setNombreCliente(request.getCliente().getNombre());
        pedido.setEmailCliente(request.getCliente().getEmail());
        pedido.setTelefonoCliente(request.getCliente().getTelefono());

        pedido.setDireccionEntrega(request.getEntrega().getDireccion());
        pedido.setMunicipioEntrega(request.getEntrega().getMunicipio());
        pedido.setMetodoEntrega(request.getEntrega().getMetodo());

        BigDecimal subtotalPedido = BigDecimal.ZERO;

        for (ItemPedidoRequest itemRequest : request.getItems()) {
            PedidoItem item = construirItem(itemRequest);
            pedido.agregarItem(item);
            subtotalPedido = subtotalPedido.add(item.getSubtotal());
        }

        // MVP (2026-09-18): sin estrategia de envío definida todavía (ver MUSA-005 §18),
        // costoEnvio queda fijo en 0 hasta que se implemente el cálculo real.
        BigDecimal costoEnvio = BigDecimal.ZERO;

        pedido.setSubtotal(subtotalPedido);
        pedido.setCostoEnvio(costoEnvio);
        pedido.setTotal(subtotalPedido.add(costoEnvio));
        pedido.setEstado(EstadoPedido.PENDIENTE_CONFIRMACION);

        // Guardamos primero para que la base de datos genere el id (autoincremental).
        // El código legible ("MUSA-<id>") solo se puede construir DESPUÉS de conocer ese id,
        // por eso hay un segundo save() actualizando únicamente el código.
        Pedido guardado = pedidoRepository.save(pedido);
        guardado.setCodigo("MUSA-" + guardado.getId());
        guardado = pedidoRepository.save(guardado);

        return new PedidoResponse(guardado);
    }

    private PedidoItem construirItem(ItemPedidoRequest itemRequest) {
        Producto producto = productoRepository.findById(itemRequest.getProductoId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "El producto con id " + itemRequest.getProductoId() + " no existe"));

        if (!producto.isActivo()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "El producto '" + producto.getNombre() + "' no está disponible");
        }

        // Regla crítica de seguridad (MUSA-006 §17): el precio SIEMPRE sale de la base de
        // datos, nunca de lo que envíe el cliente. Así evitamos que alguien manipule precios
        // editando el JSON antes de enviarlo.
        PedidoItem item = new PedidoItem();
        item.setProducto(producto);
        item.setNombreProducto(producto.getNombre());
        item.setPrecioUnitario(producto.getPrecio());
        item.setCantidad(itemRequest.getCantidad());
        item.setSubtotal(producto.getPrecio().multiply(BigDecimal.valueOf(itemRequest.getCantidad())));

        if (itemRequest.getPersonalizacion() != null) {
            item.asignarPersonalizacion(construirPersonalizacion(itemRequest.getPersonalizacion()));
        }

        return item;
    }

    private Personalizacion construirPersonalizacion(PersonalizacionRequest request) {
        Personalizacion personalizacion = new Personalizacion();
        personalizacion.setOcasion(request.getOcasion());
        personalizacion.setNombre(request.getNombre());
        personalizacion.setMensaje(request.getMensaje());
        personalizacion.setImagenUrl(request.getImagenUrl());
        personalizacion.setDisenoId(request.getDisenoId());
        personalizacion.setInstrucciones(request.getInstrucciones());
        return personalizacion;
    }

    public PedidoDetalleResponse obtenerDetalle(Long id, Usuario usuarioAutenticado, boolean esAdmin) {
        Pedido pedido = buscarPorIdOLanzarError(id);

        boolean esPropietario = pedido.getUsuario() != null
                && usuarioAutenticado != null
                && pedido.getUsuario().getId().equals(usuarioAutenticado.getId());

        if (!esAdmin && !esPropietario) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes acceso a este pedido");
        }

        return new PedidoDetalleResponse(pedido);
    }

    public List<PedidoResponse> obtenerMisPedidos(Usuario usuarioAutenticado) {
        return pedidoRepository.findByUsuarioIdOrderByFechaCreacionDesc(usuarioAutenticado.getId())
                .stream()
                .map(PedidoResponse::new)
                .toList();
    }

    public List<PedidoResponse> obtenerTodosAdmin() {
        return pedidoRepository.findAllByOrderByFechaCreacionDesc()
                .stream()
                .map(PedidoResponse::new)
                .toList();
    }

    public PedidoResponse actualizarEstado(Long id, ActualizarEstadoPedidoRequest request) {
        Pedido pedido = buscarPorIdOLanzarError(id);
        pedido.setEstado(request.getEstado());
        Pedido actualizado = pedidoRepository.save(pedido);
        return new PedidoResponse(actualizado);
    }

    private Pedido buscarPorIdOLanzarError(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Pedido con id " + id + " no encontrado"));
    }
}
