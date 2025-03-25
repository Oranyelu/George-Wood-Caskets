import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Button } from "@mui/material";


function Updates() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetching blog posts sorted by date
    const fetchPosts = async () => {
      try {
        const response = await fetch("/src/assets/blogPosts.json"); // Adjust path if necessary
        const data = await response.json();
        
        // Sort posts by date (newest first)
        const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setPosts(sortedPosts.slice(0, 4)); // Get the most recent 4 posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="mt-10 px-4 md:px-10 lg:px-20">
      <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-lg overflow-hidden shadow-lg">
            <Link to={`/blog/${post.id}`}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover cursor-pointer"
              />
            </Link>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <Link
                to={`/blog/${post.id}`}
                className="text-primary hover:underline"
              >
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/blog">
          <Button variant="outline">View More Articles</Button>
        </Link>
      </div>
    </section>
  );
}

export default Updates;
