using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using System.Xml.Linq;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly DataContext _context;

        public FeedbackController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Feedback>>> GetComments()
        {
            return Ok(await _context.Feedbacks.ToArrayAsync());
        }
        [HttpPost]
        public async Task<ActionResult<List<Feedback>>> CreateFeedack(Feedback comment)
        {
            try
            {
                if (comment == null)
                {
                    return BadRequest("Invalid comment data");
                }

                _context.Feedbacks.Add(comment);
                await _context.SaveChangesAsync();

                // Instead of returning the entire list of sessions, you can return the newly created session.
                return Ok(comment);
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

        [HttpGet("GetCommentBySession/{idSession}")]
        public IActionResult GetCommentBySession(int idSession)
        {
            var feedbacks = _context.Feedbacks.Where(r => r.SessionId == idSession).ToList();
            return Ok(feedbacks);
        }


    }
}

