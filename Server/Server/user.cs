using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class user
    {
        [Key] // Définit le champ Email comme clé primaire
        [Required] // Spécifie que le champ Email doit être fourni
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Bio { get; set; }
        public string Skills { get; set; }
        public string PhoneNumber { get; set; }
        public string LinkedinProfile { get; set; }
        public string FacebookProfile { get; set; }


    }
}
