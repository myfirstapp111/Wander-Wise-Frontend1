import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "../components/common/CustomButton";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterPage = () => {
    const { login, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log("Register Data:", formData);
        alert("Registered successfully! (mock)");

        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
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
            className="min-h-screen flex items-center justify-center bg-gray-600 px-4"
        >

            <motion.div
                key="step1"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >

                {/* Header */}
                <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
                    Create Account
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Join WanderWise and start exploring the universe
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

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

                    <div>
                        <label className="block text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <CustomButton text="Register" type="submit" />
                </form>

                {/* Footer */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-purple-600 hover:underline">
                        Login
                    </a>
                </p>
            </motion.div>
        </motion.section>
    );
};

export default RegisterPage;
