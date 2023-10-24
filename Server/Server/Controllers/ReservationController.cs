using Server.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly DataContext _context;

        public ReservationController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> GetReservations()
        {
            return Ok(await _context.Reservations.ToArrayAsync());
        }
        [HttpPost]
        public async Task<ActionResult<List<Reservation>>> CreateReservation(Reservation reservation)
        {
            try
            {
                if (reservation == null)
                {
                    return BadRequest("Invalid reservation data");
                }

                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();

                // Instead of returning the entire list of sessions, you can return the newly created session.
                return Ok(reservation);
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
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the reservation: " + ex.Message);
            }
        }



        [HttpGet("GetReservationsByEmail/{email}")]
        public IActionResult GetReservationsByEmail(string email)
        {
            var reservations = _context.Reservations.Where(r => r.UserEmail == email).ToList();
            return Ok(reservations);
        }

        [HttpGet("GetReservationsBySession")]
        public IActionResult GetReservationsBySession(int idSession)
        {
            var reservations = _context.Reservations.Where(r => r.SessionId == idSession && r.Reserved==true).ToList();
            return Ok(reservations);
        }

        [HttpGet("GetReservationByUserAndSession")]
        public IActionResult GetReservationByUserAndSession(string userEmail, int sessionId)
        {
            var reservation = _context.Reservations
                .SingleOrDefault(r => r.UserEmail == userEmail && r.SessionId == sessionId);

            if (reservation == null)
            {
                return NotFound(); // Renvoyer une réponse 404 si la réservation n'est pas trouvée.
            }

            return Ok(reservation);
        }


        [HttpGet("GetReservationStatus")]
        public IActionResult GetReservationStatus(string userEmail,int id)
        {
            try
            {
                var status = _context.Reservations
                    .Where(r => r.UserEmail == userEmail && r.SessionId==id)
                    .Select(r => r.Status)
                    .FirstOrDefault();

                if (status != null)
                {
                    return Ok(new
                    {
                        Status=status

                    });
                }
                else
                {
                    return NotFound("Status not found for the specified user.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete("{id}/{userEmail}")]
        public IActionResult DeleteReservation(int id,string userEmail)
        {
            try
            {
                var reservation = _context.Reservations.FirstOrDefault(r => r.SessionId == id && r.UserEmail==userEmail);

                if (reservation == null)
                {
                    return NotFound();
                }

                _context.Reservations.Remove(reservation);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }



        [HttpPut("{sessionId}/{userEmail}/unreserve")]
        public IActionResult UnreserveReservation(int sessionId, string userEmail)
        {
            try
            {
                var reservation = _context.Reservations.FirstOrDefault(r => r.SessionId == sessionId && r.UserEmail == userEmail);

                if (reservation == null)
                {
                    return NotFound();
                }

                reservation.Reserved = false;

                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }

        [HttpPut("{sessionId}/{userEmail}/accept")]
        public IActionResult AcceptReservation(int sessionId, string userEmail)
        {
            try
            {
                var reservation = _context.Reservations.FirstOrDefault(r => r.SessionId == sessionId && r.UserEmail == userEmail);

                if (reservation == null)
                {
                    return NotFound();
                }

               reservation.Status="Accepted";

                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }


        [HttpPut("{sessionId}/{userEmail}/refuse")]
        public IActionResult RefuseReservation(int sessionId, string userEmail)
        {
            try
            {
                var reservation = _context.Reservations.FirstOrDefault(r => r.SessionId == sessionId && r.UserEmail == userEmail);

                if (reservation == null)
                {
                    return NotFound();
                }

                reservation.Status = "Refused";

                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Une erreur s'est produite : {ex.Message}");
            }
        }

    }
}
