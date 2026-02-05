import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import { motion } from "framer-motion";

import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {



    const { login, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login Data:", formData);
        alert("Logged in successfully! (mock)");

        setFormData({
            email: "",
            password: "",
        });
    };

    const variants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1.2,
                ease: "easeInOut",
            }}
            className="min-h-screen flex items-center justify-center bg-gray-600 px-4">

            <motion.div
                key="step1"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                    duration: 0.6
                }}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                {/* Header */}
                <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Login to continue your journey with WanderWise
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <CustomButton text="Login" type="submit" />
                </form>

                {/* Footer */}
                <div className="text-center mt-6 space-y-2">
                    <p className="text-gray-600">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-purple-600 hover:underline">
                            Register
                        </a>
                    </p>
                    <p>
                        <a
                            href="/forgot-password"
                            className="text-sm text-purple-500 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </p>
                </div>

            </motion.div>
        </motion.section>
    );
};

export default LoginPage;
