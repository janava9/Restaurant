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
}