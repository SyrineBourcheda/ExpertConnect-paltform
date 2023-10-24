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
    public class ExpertUserController : ControllerBase
    {
        private readonly DataContext _authContext;
        public ExpertUserController(DataContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("authenticateexpert")]
        public async Task<IActionResult> AuthenticateExpert([FromBody] LoginModelExpert expertObj)
        {
            if (expertObj == null)
                return BadRequest();

            var expert = await _authContext.ExpertUsers
                .FirstOrDefaultAsync(x => x.Email == expertObj.Email && x.Password == expertObj.Password);

            if (expert == null)
                return NotFound(new { Message = "Expert not found!" });

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key-should-be-at-least-128-bits"));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, expert.Email),
        new Claim(ClaimTypes.Role, "expert") // Vous pouvez ajuster le rôle ici
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
                expertEmail = expert.Email // Ajoutez l'ID de l'expert si nécessaire
            });
        }

        [HttpPost("register")]
        //[Authorize]
        public async Task<IActionResult> RegisterUser([FromBody] ExpertUser userObj)
        {
            if (userObj == null)
                return BadRequest();

           
            
            await _authContext.ExpertUsers.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                
                Message = "User registered!"
            });
        }

    [HttpGet("GetExpertByEmail/{email}")]
        public IActionResult GetExpertByEmail(string email)
        {
            var expert = _authContext.ExpertUsers.FirstOrDefault(e => e.Email == email);

            if (expert == null)
            {
                return NotFound();
            }

            return Ok(expert);
        }




        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var usersliste = await _authContext.ExpertUsers.ToListAsync();
            return Ok(usersliste);

        }
        [HttpGet]
        [Route("Email:test1")]
        [ActionName("Getuser")]
        public async Task<IActionResult> GetUser(string Email)
        {
            if (Email == null)
                return BadRequest();
            var user = await _authContext.ExpertUsers
                .FirstOrDefaultAsync(x => x.Email == Email);
            if (user == null)
            {
                return NotFound("expert user not found");
            }
            return Ok(user);

        }
        [HttpPut]
        [Route("Email:test1")]

        public async Task<IActionResult> updateExprtUser(string Email, [FromBody] ExpertUser userobj)
        {

            var userput = await _authContext.ExpertUsers
                .FirstOrDefaultAsync(x => x.Email == Email);
            if (userput != null)
            {
                userput.Name = userobj.Name;
                userput.Email = userobj.Email;
                userput.Password = userobj.Password;
                userput.Bio = userobj.Bio;
                userput.CompanyName = userobj.CompanyName;   // zedetha mba3d
                userput.PhoneNumber = userobj.PhoneNumber;
                userput.LinkedinProfile = userobj.LinkedinProfile;
                userput.FacebookProfile = userobj.FacebookProfile;
                await _authContext.SaveChangesAsync();

                return Ok(userput);
            }

            return NotFound("user not foeeund");
        }



    }
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }


}
