import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const LoginSignupPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { login, signup } = useAuth();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle between login and signup modes
  const switchMode = () => {
    setFormData({ name: "", email: "", password: "" }); // Clear the form on switch
    setIsLoginMode(!isLoginMode);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      await login({ email: formData.email, password: formData.password });
    } else {
      await signup(formData); // Send name, email, and password for signup
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">
          {isLoginMode ? "Login" : "Sign Up"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
             <div>
             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
               Username
             </label>
             <input
               type="text"
               name="username"
               id="username"
               value={formData.username}
               onChange={handleChange}
               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               placeholder="Username"
             />
           </div>
           </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded focus:outline-none focus:ring-2 ${
              isLoginMode
                ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
            }`}
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={switchMode}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLoginMode ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;
