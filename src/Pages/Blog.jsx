import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FaEye, FaCalendarAlt, FaFire } from "react-icons/fa";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        views: increment(1)
      });
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[70px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const recommendedPosts = posts.filter(post => post.isRecommended);
  const popularPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
  const recentPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen font-sans font-montserrat pt-24 pb-12 transition-colors duration-300">
      <main className="max-w-[1300px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#135B3A] dark:text-green-500 mb-4 font-serif">Our Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, stories, and resources to help you navigate the journey of saying goodbye.
          </p>
        </div>

        {/* Top Section: Recommended & Popular */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Recommended (Left - 2/3 width) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaFire className="text-orange-500" /> Recommended
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedPosts.length > 0 ? recommendedPosts.slice(0, 2).map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  onClick={() => handlePostClick(post.id)}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#135B3A] dark:group-hover:text-green-400 mb-2 line-clamp-2 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>
                    <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 gap-4">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(post.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><FaEye /> {post.views || 0} views</span>
                    </div>
                  </div>
                </Link>
              )) : (
                <p className="text-gray-500 dark:text-gray-400 col-span-2">No recommended posts yet.</p>
              )}
            </div>
          </div>

          {/* Popular (Right - 1/3 width) */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Reads</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex flex-col gap-6">
                {popularPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    onClick={() => handlePostClick(post.id)}
                    className="flex gap-4 group"
                  >
                    <span className="text-4xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-[#135B3A] dark:group-hover:text-green-500 transition-colors">0{index + 1}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-[#135B3A] dark:group-hover:text-green-400 transition-colors line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
                {popularPosts.length === 0 && <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                onClick={() => handlePostClick(post.id)}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="h-56 overflow-hidden">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">No Image</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-full">Article</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#135B3A] dark:group-hover:text-green-400 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{post.description}</p>
                  <span className="text-[#135B3A] dark:text-green-400 text-sm font-semibold group-hover:underline">Read Article →</span>
                </div>
              </Link>
            ))}
            {recentPosts.length === 0 && <p className="text-gray-500 dark:text-gray-400 col-span-3 text-center py-10">No posts found.</p>}
          </div>
        </div>

      </main>
    </div>
  );
}

export default Blog;
