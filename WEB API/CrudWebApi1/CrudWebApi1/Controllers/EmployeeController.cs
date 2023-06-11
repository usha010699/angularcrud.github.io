using CrudWebApi1.Database;
using CrudWebApi1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudWebApi1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private readonly EmployeeDbContext EmployeeDbContext;
        public EmployeeController(EmployeeDbContext employeeDbContext)
        {
            EmployeeDbContext = employeeDbContext;
        }

        [HttpGet]
        
        public async Task<IActionResult> GetEmployee()
        {

           var Employee= await EmployeeDbContext.Employees.ToListAsync();
            return Ok(Employee);
        }

        [HttpPost]

        public async Task<IActionResult> CreateEmployee([FromBody] Employee emp)
        {
            emp.Id = new Guid();
            await EmployeeDbContext.Employees.AddAsync(emp);
            await EmployeeDbContext.SaveChangesAsync();
            return Ok(emp);
        }

        [HttpPut]
        [Route("{id:guid}")]

        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, [FromBody] Employee emp)
        {
            var employee = await EmployeeDbContext.Employees.FirstOrDefaultAsync(a => a.Id == id);
            if (employee != null)
            {
                employee.Name = emp.Name;
                employee.MobileNo = emp.MobileNo;
                employee.EmailID = emp.EmailID;
                await EmployeeDbContext.SaveChangesAsync();
                return Ok(emp);
            }
            else
            {
                return NotFound("Employee not found");
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await EmployeeDbContext.Employees.FirstOrDefaultAsync(a => a.Id == id);
            if (employee != null)
            {
                EmployeeDbContext.Employees.Remove(employee);
                await EmployeeDbContext.SaveChangesAsync();
                return Ok(employee);
            }
            else
            {
                return NotFound("Employee not found");
            }
        }


    }
}
