using System;
using System.Collections.Generic;

namespace Restaurante.Api.Models
{
    public class Pedido
    {
        public string PedidoId { get; set; }
        public string NombreCliente { get; set; }
        public string TelefonoCliente { get; set; }
        public List<ItemPedido> Items { get; set; }
        public string TipoPedido { get; set; }
        public DateTime FechaHora { get; set; }
    }

    public class ItemPedido
    {
        public string NombreProducto { get; set; }
        public int Cantidad { get; set; }
    }
}