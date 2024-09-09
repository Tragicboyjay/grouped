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
        public async Task<IActionResult> Index()
        {
            try
            {
                var firebaseResponse = await _firebaseClient
                    .Child("BlogPosts")
                    .OnceAsync<BlogPost>();

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

                return View(blogPosts);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching blog posts from Firebase: " + ex.Message);
                return View(new List<BlogPost>()); // Return an empty list in case of error
            }
        }

        // Create (GET)
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // Create (POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(BlogPost blogPost)
        {
            if (!ModelState.IsValid)
            {
                return View(blogPost);
            }

            try
            {
                // Firebase will automatically generate a unique key (Id) for each blog post
                var postRef = await _firebaseClient
                    .Child("BlogPosts")
                    .PostAsync(blogPost); // Let Firebase generate the unique key

                // Assign the Firebase-generated key to the blog post's Id
                blogPost.Id = postRef.Key;

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error creating blog post: " + ex.Message);
                return View(blogPost);  // Return to the Create view in case of an error
            }
        }

        // GET: /Blog/Edit/id
        [HttpGet]
        public async Task<IActionResult> Edit(string id)
        {
            try
            {
                var blogPost = await _firebaseClient
                    .Child("BlogPosts")
                    .Child(id)
                    .OnceSingleAsync<BlogPost>();

                if (blogPost == null)
                {
                    return NotFound();
                }

                blogPost.Id = id; // Set the ID for use in the Edit form
                return View(blogPost);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching blog post for editing: " + ex.Message);
                return RedirectToAction(nameof(Index)); // Redirect to index if there’s an error
            }
        }

        // Edit (POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, BlogPost blogPost)
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

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error updating blog post: " + ex.Message);
                return View(blogPost);  // Return to the Edit view in case of an error
            }
        }

        // Delete (GET)
        [HttpGet]
public async Task<IActionResult> Delete(string id)
{
    if (string.IsNullOrEmpty(id))
    {
        return BadRequest("Invalid ID.");
    }

    try
    {
        var blogPost = await _firebaseClient
            .Child("BlogPosts")
            .Child(id)
            .OnceSingleAsync<BlogPost>();

        if (blogPost == null)
        {
            return NotFound();
        }

        // Pass the ID along with the blogPost object to the view
        blogPost.Id = id;  // Set the ID here if it's not already set
        return View(blogPost);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error fetching blog post for deletion: " + ex.Message);
        return RedirectToAction(nameof(Index));  // Redirect to index in case of error
    }
}


        // Delete (POST)
        [HttpPost, ActionName("DeleteConfirmed")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            try
            {
                // Log the ID to verify it is being passed correctly
                Console.WriteLine($"Deleting blog post with ID: {id}");

                if (string.IsNullOrEmpty(id))
                {
                    Console.WriteLine("ID is null or empty.");
                    return BadRequest("Invalid ID.");
                }

                var postToDelete = await _firebaseClient
                    .Child("BlogPosts")
                    .Child(id)
                    .OnceSingleAsync<BlogPost>();

                if (postToDelete == null)
                {
                    Console.WriteLine("Blog post not found.");
                    return NotFound();
                }

                // Proceed with deletion
                await _firebaseClient
                    .Child("BlogPosts")
                    .Child(id)
                    .DeleteAsync();

                Console.WriteLine("Blog post successfully deleted.");

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                // Log the error for debugging
                Console.WriteLine($"Error deleting blog post: {ex.Message}");
                return RedirectToAction(nameof(Index));  // Redirect to index in case of an error
            }
        }


    }
}
