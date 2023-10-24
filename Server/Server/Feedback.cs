using System.ComponentModel.DataAnnotations;

namespace Server
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public string SenderEmail { get; set; } = string.Empty;
        public int SessionId { get; set; } = 0;
        public string CommentData { get; set; } = string.Empty;

    }

}
