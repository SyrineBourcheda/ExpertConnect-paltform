using Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly DataContext _context;

        public SessionController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Session>>> GetSessions()
        {
            return Ok(await  _context.Sessions.ToArrayAsync());
        }
        [HttpPost]
        public async Task<ActionResult<List<Session>>> CreateSession(Session session)
        {
            try
            {
                if (session == null)
                {
                    return BadRequest("Invalid session data");
                }

                _context.Sessions.Add(session);
                await _context.SaveChangesAsync();

                // Instead of returning the entire list of sessions, you can return the newly created session.
                return Ok(session);
            }
            catch (DbUpdateException ex)
            {
                // If a database update exception occurs (e.g., duplicate key, constraint violation),
                // return a specific error message or status code.
                return Conflict("Session creation failed: " + ex.Message);
            }
            catch (Exception ex)
            {
                // For other types of exceptions, return a generic 500 error with the exception message.
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the session: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSessionById(int id)
        {
            var session = await _context.Sessions.FindAsync(id);

            if (session == null)
            {
                return NotFound();
            }

            return session;
        }

        [HttpGet("GetSessionsByEmail/{email}")]
        public IActionResult GetReservationsByEmail(string email)
        {
            var sessions = _context.Sessions.Where(s => s.OwnerExpert == email).ToList();
            return Ok(sessions);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSessions(int id)
        {
            try
            {
                var session = _context.Sessions.FirstOrDefault(s => s.Id == id);

                if (session == null)
                {
                    return NotFound();
                }

                _context.Sessions.Remove(session);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateSession(int id, [FromBody] Session updatedSession)
        {
            var existingSession = await _context.Sessions.FindAsync(id);

            if (existingSession == null)
            {
                return NotFound();
            }

           existingSession.Title = updatedSession.Title;
            existingSession.Requirements = updatedSession.Requirements;
            existingSession.Objectives = updatedSession.Objectives;
            existingSession.Duration = updatedSession.Duration;
            existingSession.Date = updatedSession.Date;
            existingSession.ImagePath = updatedSession.ImagePath;

            try
            {            
                await _context.SaveChangesAsync();
                return NoContent(); // Succès sans contenu
            }
            catch (Exception ex)
            {
                // Gérez les erreurs et retournez une réponse d'erreur appropriée
                return StatusCode(500, "Une erreur s'est produite lors de la mise à jour de la session.");
            }
        }





    }

}
