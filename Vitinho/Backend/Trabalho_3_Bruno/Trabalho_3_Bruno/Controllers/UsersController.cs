using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Trabalho_3_Bruno.Context;
using Trabalho_3_Bruno.DTOs;
using Trabalho_3_Bruno.Entities;

namespace Trabalho_3_Bruno.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(id));

            if (user is null) return NotFound("User not found");

            return user;
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(UserDTO user, int id)
        {
            var getUser = await GetUser(id);

            var findUser = getUser.Value;

            findUser!.Name = user.Name;
            findUser.Email = user.Email;
            findUser.Password = user.Password;

            _context.Entry(findUser).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDTO user)
        {
            var newUser = new User 
            { 
                Name = user.Name, 
                Email = user.Email, 
                Password = user.Password 
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var GetUse = await GetUser(id);

            var user = GetUse.Value;

            _context.Users.Remove(user!);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
