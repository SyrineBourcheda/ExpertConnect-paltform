using System.ComponentModel.DataAnnotations;

namespace Server
{
    public class Session

    {

        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Objectives { get; set; } = string.Empty;
        public string Requirements { get; set; } = string.Empty;
        public string OwnerExpert { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public string ImagePath { get; set; } = string.Empty;
        
    }
}
