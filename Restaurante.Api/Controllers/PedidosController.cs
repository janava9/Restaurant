using Microsoft.AspNetCore.Mvc;
using System;
using Restaurante.Api.Models; // Importa el namespace para usar los modelos

[ApiController]
[Route("api/[controller]")]
public class PedidosController : ControllerBase
{
    // Endpoint para recibir un nuevo pedido
    [HttpPost("crear")]
    public IActionResult CrearPedido([FromBody] Pedido pedido)
    {
        // Validar que el objeto del pedido no sea nulo
        if (pedido == null)
        {
            return BadRequest("El objeto del pedido es nulo.");
        }

        // Aquí es donde se agregará la lógica de negocio en el futuro:
        // 1. Guardar el pedido en una base de datos.
        // 2. Calcular el costo total.
        // 3. Notificar a la interfaz de cocina.

        // Por ahora, solo simularemos la recepción e imprimiremos en la consola
        Console.WriteLine($"--- Nuevo Pedido Recibido ---");
        Console.WriteLine($"ID del Pedido: {pedido.PedidoId}");
        Console.WriteLine($"Cliente: {pedido.NombreCliente} ({pedido.TelefonoCliente})");
        Console.WriteLine($"Items:");
        foreach (var item in pedido.Items)
        {
            Console.WriteLine($"- {item.NombreProducto} x{item.Cantidad}");
        }
        Console.WriteLine("-----------------------------");

        // Devolvemos una respuesta exitosa con un mensaje
        return Ok(new { mensaje = "Pedido recibido correctamente", pedidoId = pedido.PedidoId });
    }
}