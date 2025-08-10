using Microsoft.EntityFrameworkCore;
using Restaurante.Api.Models; // Importamos los modelos

namespace Restaurante.Api.Data
{
    public class RestauranteContext : DbContext
    {
        public RestauranteContext(DbContextOptions<RestauranteContext> options)
            : base(options)
        {
        }

        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItemsPedido { get; set; } 
    }
}