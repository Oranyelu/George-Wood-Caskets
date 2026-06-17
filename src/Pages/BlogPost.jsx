import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { FaCalendarAlt, FaEye, FaArrowLeft } from "react-icons/fa";

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data) {
                    setPost({
                        ...data,
                        date: data.created_at
                    });
                } else {
                    setError("Post not found");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-[70px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-[70px] px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || "Post not found"}</h2>
                <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
                    <FaArrowLeft /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans font-montserrat pt-24 pb-20 transition-colors duration-300">
            <article className="max-w-[900px] mx-auto px-4 md:px-8">
                <Link to="/blog" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-[#135B3A] dark:hover:text-green-400 mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Blog
                </Link>

                <header className="mb-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-serif">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm md:text-base">
                        <span className="flex items-center gap-2">
                            <FaCalendarAlt /> {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaEye /> {post.views || 0} views
                        </span>
                    </div>
                </header>

                {post.image && (
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto max-h-[500px] object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                    {/* Simple rendering for now. In a real app, you might use a markdown renderer or HTML parser */}
                    {post.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
