using System.ComponentModel.DataAnnotations;

namespace Server
{
    public class Reservation

    {

        [Key]
        public int Id { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public int SessionId { get; set; } =0 ;
        public string Status { get; set; }  = "In Progress";
        public bool Reserved { get; set; } = false;
       

    }
}
