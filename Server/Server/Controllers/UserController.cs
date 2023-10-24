using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _authContext;
        public UserController(DataContext appDbContext)
        {
            _authContext = appDbContext;
        }
        [HttpPost("authenticateuser")]
        public async Task<IActionResult> Authenticate([FromBody] LoginModelUser userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _authContext.Users
                .FirstOrDefaultAsync(x => x.Email == userObj.Email && x.Password == userObj.Password);

            if (user == null)
                return NotFound(new { Message = "User not found!" });

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key-should-be-at-least-128-bits"));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Email),
        new Claim(ClaimTypes.Role, "user") // Vous pouvez ajuster le rôle ici
        // Vous pouvez également ajouter d'autres revendications selon vos besoins
    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Temps d'expiration du token
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                token = tokenString,
                message = "Login Success!",
                userEmail = user.Email // Ajoutez l'ID de l'utilisateur si nécessaire
            });
        }
       

        [HttpPost("registeruser")]
        //[Authorize]
        public async Task<IActionResult> RegisterUser([FromBody] user userObj)
        {
            if (userObj == null)
                return BadRequest();



            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {

                Message = "User registered!"
            });
        }


        [HttpGet("GetUserByEmail/{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            var user = _authContext.Users.FirstOrDefault(e => e.Email == email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var usersliste = await _authContext.Users.ToListAsync();
            return Ok(usersliste);

        }
        [HttpGet]
        [Route("Email:test")]
        [ActionName("Getuser")]
        public async Task<IActionResult> GetUser(string Email)
        {
            if (Email == null)
                return BadRequest();
            var user = await _authContext.Users
                .FirstOrDefaultAsync(x => x.Email == Email);
            if (user == null)
            {
                return NotFound("user not found");
            }
            return Ok(user);

        }
        [HttpPut]
        [Route("Email:test")]

        public async Task<IActionResult> updateUser(string Email, [FromBody] user userobj)
        {

            var userput = await _authContext.Users
                .FirstOrDefaultAsync(x => x.Email == Email);
            if (userput != null)
            {
                userput.Name = userobj.Name;
                userput.Email = userobj.Email;
                userput.Password = userobj.Password;
                userput.Bio = userobj.Bio;
                userput.Skills = userobj.Skills;   // zedetha mba3d
                userput.PhoneNumber = userobj.PhoneNumber;
                userput.LinkedinProfile = userobj.LinkedinProfile;
                userput.FacebookProfile = userobj.FacebookProfile;
                await _authContext.SaveChangesAsync();

                return Ok(userput);
            }

            return NotFound("user not foeeund");
        }





    }



    public class LoginModelUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginModelExpert
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
