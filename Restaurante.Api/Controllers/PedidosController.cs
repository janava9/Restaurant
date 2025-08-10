using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks; // Necesario para Task
using Restaurante.Api.Models;
using Restaurante.Api.Data;
using Microsoft.EntityFrameworkCore; // Importa el namespace del contexto

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    private readonly RestauranteContext _context;

    public PedidosController(RestauranteContext context)
    {
        _context = context;
    }
    // Endpoint para recibir un nuevo pedido
    // Restaurante.Api/Controllers/PedidosController.cs (modificación)

    [HttpPost("crear")]
    public async Task<IActionResult> CrearPedido([FromBody] Pedido pedido)
    {
        if (pedido == null)
        {
            return BadRequest("El objeto del pedido es nulo.");
        }

        try
        {
            // Agregamos el pedido al contexto
            _context.Pedidos.Add(pedido);

            // Guardamos los cambios de forma asíncrona en la base de datos
            await _context.SaveChangesAsync();

            // Devolvemos una respuesta exitosa
            return Ok(new { mensaje = "Pedido recibido y guardado correctamente", pedidoId = pedido.PedidoId });
        }
        catch (Exception ex)
        {
            // En caso de error, devolvemos una respuesta 500
            return StatusCode(500, $"Ocurrió un error al guardar el pedido: {ex.Message}");
        }
    }

    // Restaurante.Api/Controllers/PedidosController.cs

    [HttpGet("pedidos")]
    public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
    {
        // Con la inyección de dependencias, el contexto ya está listo para usarse.
        return await _context.Pedidos
            .Include(p => p.Items) // Esto es crucial para traer los items del pedido.
            .ToListAsync();
    }

    [HttpGet("pedido/{id}")]
    public async Task<ActionResult<Pedido>> GetPedido(string id)
    {
        var pedido = await _context.Pedidos
            .Include(p => p.Items) // Incluimos los items del pedido
            .FirstOrDefaultAsync(p => p.PedidoId == id);

        if (pedido == null)
        {
            return NotFound();
        }

        return pedido;
    }

    [HttpPut("actualizar/{id}")]
    public async Task<IActionResult> ActualizarPedido(string id, [FromBody] Pedido pedido)
    {
        if (pedido == null || pedido.PedidoId != id)
        {
            return BadRequest("El objeto del pedido es nulo o el ID no coincide.");
        }

        var existingPedido = await _context.Pedidos.FindAsync(id);
        if (existingPedido == null)
        {
            return NotFound();
        }

        // Actualizamos los campos necesarios
        existingPedido.NombreCliente = pedido.NombreCliente;
        existingPedido.TelefonoCliente = pedido.TelefonoCliente;
        existingPedido.Estado = pedido.Estado;
        existingPedido.Items = pedido.Items; // Asignamos los items del nuevo pedido

        try
        {
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Pedido actualizado correctamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ocurrió un error al actualizar el pedido: {ex.Message}");
        }
    }

    [HttpPut("actualizar-estado/{id}")]
    public async Task<IActionResult> ActualizarEstadoPedido(string id, [FromBody] string nuevoEstado)
    {
        if (string.IsNullOrEmpty(nuevoEstado))
        {
            return BadRequest("El nuevo estado no puede ser nulo o vacío.");
        }

        var pedido = await _context.Pedidos.FindAsync(id);
        if (pedido == null)
        {
            return NotFound();
        }

        pedido.Estado = nuevoEstado;

        try
        {
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Estado del pedido actualizado correctamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ocurrió un error al actualizar el estado del pedido: {ex.Message}");
        }
    } 

}