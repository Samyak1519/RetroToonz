import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/signup") {
            setIsLogin(false);
        }
    }, [location.pathname]);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-100 px-4"
        >
            <motion.div
                className="w-full max-w-md bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-semibold mb-6 text-center text-white">
                    {isLogin ? "Sign in" : "Create an account"}
                </h2>

                <form className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full border border-gray-400/40 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border border-gray-400/40 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-400/40 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        {isLogin ? "Continue" : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center justify-center my-6">
                    <div className="border-t border-gray-500 w-1/3" />
                    <span className="text-gray-400 text-sm px-2">OR</span>
                    <div className="border-t border-gray-500 w-1/3" />
                </div>

                {/* Social Login */}
                <div className="flex flex-col space-y-3">
                    <button className="flex items-center justify-center w-full border border-gray-500 rounded-lg py-3 hover:bg-white/10 transition">
                        <FaGoogle className="mr-2 text-red-500" /> Continue with Google
                    </button>
                    <button className="flex items-center justify-center w-full border border-gray-500 rounded-lg py-3 hover:bg-white/10 transition">
                        <FaFacebookF className="mr-2 text-blue-500" /> Continue with Facebook
                    </button>
                    <button className="flex items-center justify-center w-full border border-gray-500 rounded-lg py-3 hover:bg-white/10 transition">
                        <FaApple className="mr-2 text-gray-200" /> Continue with Apple
                    </button>
                </div>

                <p className="text-center text-gray-300 text-sm mt-6">
                    {isLogin ? (
                        <>
                            New here?{" "}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-indigo-400 hover:underline"
                            >
                                Create an account
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-indigo-400 hover:underline"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </p>
            </motion.div>
        </div>
    );
}
