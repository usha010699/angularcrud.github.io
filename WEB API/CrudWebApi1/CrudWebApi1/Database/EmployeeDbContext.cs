using CrudWebApi1.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudWebApi1.Database
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee>Employees { get; set; }
    }
}
