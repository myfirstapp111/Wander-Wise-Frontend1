import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import TripsNavigation from "@/components/trips/TripsNavigation";
import AddExpense from "@/components/trips/AddExpense";

import Loading from "@/components/common/Loading";

import {
    MapPin,
    Calendar,
    Wallet,
    Globe,
    TrendingDown,
    TrendingUp,
    CreditCard,
    IndianRupee,
    AlertTriangle,
    Users
} from "lucide-react";

import InviteCollaborators1 from "@/components/trips/InviteCollaborators1";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const TripDetailsPage = () => {
    const { id } = useParams();
    const [dependency, setDependency] = useState(0);

    const { loading, data, error } = useApi(`/trips/${id}`, {}, [dependency]);

    const totalSpent = useMemo(() => {
        if (!data?.budget?.expenses || data.budget.expenses.length === 0) return 0;
        return data.budget.expenses.reduce(
            (sum, e) => sum + Number(e.amount || 0),
            0
        );
    }, [data]);

    const totalBudget = data?.budget?.total || 0;
    const remaining = totalBudget - totalSpent;
    const percentUsed = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

    if (loading) return <Loading text="Loading trip details..." />;
    if (error) return <div>Error loading trip details.</div>;

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const overspent = remaining < 0;

    const ScrollSection = ({ children, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );

    return (
        <section className="py-8 px-4 sm:px-6 md:px-20 flex flex-col md:flex-row gap-4 bg-indigo-300">
            {/* ================= LEFT ================= */}
            <div className="w-full md:w-2/3 flex flex-col gap-4">
                <ScrollSection>
                    <Card className="w-full min-h-[80vh] bg-blue-200 shadow-xl border-none rounded-2xl">
                        <CardHeader className="space-y-3">

                            {/* Title */}
                            <div className="flex items-center gap-2 md:gap-3">
                                <MapPin className="text-blue-700 animate-bounce" />
                                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 animate-bounce">
                                    {data.title}
                                </CardTitle>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-1 md:gap-2 text-gray-700 text-xs sm:text-sm md:text-base">
                                <Calendar size={16} className="md:!h-5 md:!w-5" />
                                <span className="font-medium">
                                    {formatDate(data.startDate)} – {formatDate(data.endDate)}
                                </span>
                            </div>

                            <CardDescription className="text-gray-700 text-sm sm:text-base md:text-base">
                                {data.description}
                            </CardDescription>

                        </CardHeader>

                        <CardContent className="space-y-4 mt-4">

                            <ScrollSection delay={0.1}>
                                {/* ================= BUDGET PROGRESS ================= */}
                                <div className="bg-white p-3 sm:p-4 rounded-xl shadow space-y-1 sm:space-y-2">
                                    <div className="flex justify-between text-xs sm:text-sm font-medium">
                                        <span>Budget Usage</span>
                                        <span className={overspent ? "text-red-600" : "text-gray-700"}>
                                            {percentUsed.toFixed(1)}%
                                        </span>
                                    </div>

                                    <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ${overspent ? "bg-red-600" : "bg-green-500"}`}
                                            style={{ width: `${percentUsed}%` }}
                                        />
                                    </div>

                                    {overspent && (
                                        <div className="flex items-center gap-1 sm:gap-2 text-red-600 text-xs sm:text-sm mt-1">
                                            <AlertTriangle size={16} />
                                            You have exceeded your budget!
                                        </div>
                                    )}
                                </div>
                            </ScrollSection>

                            <ScrollSection delay={0.2}>
                                {/* ================= STATS ================= */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm md:text-base">

                                    {/* Total Budget */}
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-xl shadow flex gap-2 sm:gap-3">
                                        <Wallet className="text-green-600" />
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-500">Total Budget</p>
                                            <p className="text-lg sm:text-xl md:text-xl font-bold text-gray-800">
                                                Rs.{" "}
                                                <CountUp
                                                    end={totalBudget}
                                                    duration={2}
                                                    separator=","
                                                    enableScrollSpy
                                                    scrollSpyOnce={false}
                                                />
                                            </p>
                                        </div>
                                    </div>

                                    {/* Total Spent */}
                                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 sm:p-4 rounded-xl shadow flex gap-2 sm:gap-3">
                                        <TrendingDown className="text-red-600" />
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-500">Total Spent</p>
                                            <p className="text-lg sm:text-xl md:text-xl font-bold text-red-600">
                                                Rs.{" "}
                                                <CountUp
                                                    end={totalSpent}
                                                    duration={2.5}
                                                    separator=","
                                                    enableScrollSpy
                                                    scrollSpyOnce={false}
                                                />
                                            </p>
                                        </div>
                                    </div>

                                    {/* Remaining */}
                                    <div className={`p-3 sm:p-4 rounded-xl shadow flex gap-2 sm:gap-3 ${overspent
                                        ? "bg-gradient-to-br from-red-100 to-red-200"
                                        : "bg-gradient-to-br from-blue-50 to-blue-100"
                                        }`}>
                                        <TrendingUp className={overspent ? "text-red-600" : "text-green-600"} />
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-500">Remaining</p>
                                            <p className={`text-lg sm:text-xl md:text-xl font-bold ${overspent ? "text-red-700" : "text-green-700"}`}>
                                                Rs.{" "}
                                                <CountUp
                                                    end={remaining}
                                                    duration={3.0}
                                                    separator=","
                                                    enableScrollSpy
                                                    scrollSpyOnce={false}
                                                />
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </ScrollSection>

                            <ScrollSection delay={0.3}>
                                {/* ================= DESTINATIONS ================= */}
                                <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-xs sm:text-sm md:text-base">
                                    <div className="flex items-center gap-1 sm:gap-2 mb-2">
                                        <Globe className="text-purple-600" />
                                        <h3 className="font-semibold text-sm sm:text-base md:text-lg">Destinations</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {data.destinations?.map((place, i) => (
                                            <span
                                                key={i}
                                                className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm md:text-sm font-medium"
                                            >
                                                {place}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollSection>

                            <ScrollSection delay={0.4}>
                                {/* ================= COLLABORATORS ================= */}
                                <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-xs sm:text-sm md:text-base">
                                    <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 flex items-center gap-2">
                                        <Users size={16} className="text-green-600" /> Collaborators
                                    </h3>

                                    {data.collaborators && data.collaborators.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {data.collaborators.map((collab, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 sm:gap-3 p-2 bg-gray-50 rounded-lg border hover:shadow transition text-xs sm:text-sm md:text-base"
                                                >
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xs sm:text-sm">
                                                        {collab.name
                                                            ? collab.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")
                                                                .toUpperCase()
                                                            : collab.email[0].toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="font-medium">{collab.name || "No Name"}</p>
                                                        <p className="text-gray-500 text-xs sm:text-sm">{collab.email}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm p-3 border rounded-lg bg-gray-50">
                                            <Users size={16} /> No collaborators yet. Invite someone using the form above!
                                        </div>
                                    )}
                                </div>
                            </ScrollSection>

                            <ScrollSection delay={0.5}>
                                {/* ================= EXPENSES ================= */}
                                <div className="bg-white p-3 sm:p-4 rounded-xl shadow text-xs sm:text-sm md:text-base">
                                    <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 flex items-center gap-2">
                                        <CreditCard size={16} /> Expenses
                                    </h3>

                                    {!data.budget?.expenses || data.budget.expenses.length === 0 ? (
                                        <p className="text-gray-500 text-xs sm:text-sm">No expenses added yet.</p>
                                    ) : (
                                        <div className="space-y-2 sm:space-y-3">
                                            {data.budget.expenses.map((e, i) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-lg border hover:shadow transition text-xs sm:text-sm md:text-base"
                                                >
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        <div className="bg-red-100 p-1 sm:p-2 rounded-full">
                                                            <IndianRupee className="text-red-600" size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{e.name}</p>
                                                            <p className="text-gray-400 text-xs sm:text-sm">
                                                                {new Date(e.date).toDateString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <span className="text-red-600 font-semibold text-sm sm:text-base md:text-base">
                                                        - Rs. {e.amount}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ScrollSection>

                        </CardContent>
                    </Card>
                </ScrollSection>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="w-full md:w-1/3 flex flex-col gap-3 mt-4 md:mt-0">
                <ScrollSection>
                    <TripsNavigation trip={data} />
                </ScrollSection>
                <ScrollSection delay={0.1}>
                    <AddExpense trip={data} onAdded={() => setDependency(d => d + 1)} />
                </ScrollSection>
                <ScrollSection delay={0.2}>
                    <InviteCollaborators1 />
                </ScrollSection>
            </div>
        </section>
    );
};

export default TripDetailsPage;
