using Firebase.Database;
using Firebase.Database.Query;
using Microsoft.AspNetCore.Mvc;
using server2.Models;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace server2.Controllers
{
    public class BlogController : Controller
    {
        private readonly FirebaseClient _firebaseClient;

        public BlogController()
        {
            // Initialize Firebase client with your database URL
            _firebaseClient = new FirebaseClient("https://aspauthjames-default-rtdb.firebaseio.com");
        }

        // Index action to list all blog posts
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var firebaseResponse = await _firebaseClient
                    .Child("BlogPosts")
                    .OnceAsync<BlogPost>();

                Console.WriteLine($"Number of blog posts fetched: {firebaseResponse.Count}");

                var blogPosts = firebaseResponse
                    .Where(item => item.Object != null)  // Skip null entries
                    .Select(item => new BlogPost
                    {
                        Id = item.Key,  // Firebase key as ID
                        Title = item.Object.Title,
                        Content = item.Object.Content,
                        CreatedAt = item.Object.CreatedAt
                    })
                    .ToList();

                Console.WriteLine($"Blog posts: {Newtonsoft.Json.JsonConvert.SerializeObject(blogPosts)}");

                return Ok(blogPosts);  // Return the blog posts as JSON
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching blog posts from Firebase: " + ex.Message);
                return StatusCode(500, "Error fetching blog posts");
            }
        }

        // Create (POST) - API endpoint for React
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BlogPost blogPost)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Model state is invalid");
                return BadRequest(ModelState);
            }

            try
            {
                var postRef = await _firebaseClient
                    .Child("BlogPosts")
                    .PostAsync(blogPost);

                blogPost.Id = postRef.Key;

                Console.WriteLine($"Blog post created with ID: {blogPost.Id}");

                return Ok(blogPost);  // Return the created blog post as JSON
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error creating blog post: " + ex.Message);
                return StatusCode(500, "Error creating blog post");
            }
        }

        // Edit (PUT)
        // Edit (PUT)
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(string id, [FromBody] BlogPost blogPost)
        {
            if (id != blogPost.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _firebaseClient
                    .Child("BlogPosts")
                    .Child(id)
                    .PutAsync(blogPost);

                return Ok(blogPost);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error updating blog post: " + ex.Message);
                return StatusCode(500, "Error updating blog post");
            }
        }

        // Delete (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest("Invalid ID.");
                }

                var postToDelete = await _firebaseClient
                    .Child("BlogPosts")
                    .Child(id)
                    .OnceSingleAsync<BlogPost>();

                if (postToDelete == null)
                {
                    return NotFound();
                }

                await _firebaseClient
                    .Child("BlogPosts")
                    .Child(id)
                    .DeleteAsync();

                return Ok("Blog post deleted.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting blog post: {ex.Message}");
                return StatusCode(500, "Error deleting blog post");
            }
        }
    }
}