using System;
using System.ComponentModel.DataAnnotations;

namespace server2.Models
{
    public class BlogPost
    {
        public string? Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
