import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import About from "./components/landingComponents/About"
import LandingPage from "./pages/landingPage"
import FeaturedTrips from "./components/landingComponents/FeaturedTrips"
import Contact from "./pages/Contact"

import Register from "./pages/Register"
import Login from "./pages/Login"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import Dashboard from "./pages/Dashboard"

import useAuth from "./hooks/useAuth"

import { jwtDecode } from "jwt-decode";
import AppLayout from "./components/layouts/AppLayout"

import TripsPage from "./pages/trips/TripsPage"
import AddTripsPage from "./pages/trips/AddTripsPage"
import EditTripsPage from "./pages/trips/EditTripsPage"
import SingleTripPage from "./pages/trips/SingleTripPage"
import TripDetailsPage from "./pages/trips/TripDetailsPage"

import AcceptInvitation from "./pages/trips/AcceptInvitation"
import AcceptInvitation1 from "./pages/trips/AcceptInvitation1"
import BaggagePage from "./pages/baggage/BaggagePage"
import BaggageDetails from "./pages/baggage/BaggageDetails"
import BaggagePageOriginal from "./pages/baggage/BaggagePageOriginal"
import BaggageDetailsOriginal from "./pages/baggage/BaggageDetailsOriginal"
import ItineraryPage from "./pages/itineraries/ItineraryPage"

import ItineraryDetailsPage from "./pages/itineraries/ItineraryDetailsPage"
import AddItineraries from "./pages/itineraries/AddItineraries"
import EditItenariries from "./pages/itineraries/EditItenariries"






function App() {

  const { token, logout } = useAuth();
  const decodedToken = token ? jwtDecode(token) : null;
  console.log("Decoded Token:", decodedToken);




  const ProtectedRoute = () => {


    try {

      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken?.userId;

      if (decodedToken && decodedToken?.exp) {


        const currentTime = Date.now();
        if (decodedToken.exp < currentTime / 1000) {
          logout();
          return <Navigate to="/login1" />;

        }
      }
      if (!userId) {
        logout();
        return <Navigate to="/login1" />;
      }

      return <AppLayout />;

    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
      return <Navigate to="/login1" />;

    }




  };

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/famous" element={<FeaturedTrips />} />
        <Route path="/services" element={<Contact />} />

        <Route path="/register1" element={<Register />} />
        <Route path="/login1" element={<Login />} />



        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />


        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/add" element={<AddTripsPage />} />
          <Route path="/trips/edit/:id" element={<EditTripsPage />} />

          <Route path="/single-trip/:id" element={<SingleTripPage />} />
          <Route path="/trip-details/:id" element={<TripDetailsPage />} />

          <Route path="/trips/:id/accept-invitation" element={<AcceptInvitation />} />


          {/*<Route path="/trips/:id/accept-invitation" element={<AcceptInvitation1 />} />  */}



          <Route path="/baggage" element={<BaggagePage />} />
          <Route path="/baggage/:id" element={<BaggageDetails />} />



          {/* Original Baggage Pages for reference 
                      
          <Route path="/baggage" element={<BaggagePageOriginal />} />
          <Route path="/baggage/:id" element={<BaggageDetailsOriginal />} />

            */}


          <Route path="/itineraries" element={<ItineraryPage />} />
          <Route path="/itineraries/add/:tripId" element={<AddItineraries />} />
          <Route path="/itineraries/:id" element={<ItineraryDetailsPage />} />

          <Route path="/itineraries/:tripId/edit/:ItineraryId" element={<EditItenariries />} />


        </Route>











      </Routes>
    </BrowserRouter>


  )
}

export default App
