import './styles/global.css';
import Header from './components/header/Header.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NewTripPage from './pages/NewTripPage.jsx';
import MyTripsPage from './pages/MyTripsPage.jsx';
import TripDaysPage from './pages/TripDaysPage/TripDaysPage.jsx';
import ActivitiesDayPage from './pages/ActivitiesDayPage.jsx';
import UserRoutes from './private-routes/UserRoutes.jsx';
import TripRoutes from './private-routes/TripRoutes.jsx';
import JourneyRoutes from './private-routes/JourneyRoutes.jsx';
import TripExpensesPage from './pages/TripExpensesPage/TripExpensesPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route element={<UserRoutes />}>
                        <Route path="/my-trips" element={<MyTripsPage />} />
                        <Route path="/new-trip" element={<NewTripPage />} />
                        <Route element={<TripRoutes />}>
                            <Route path="/trip/:trip_id" element={<TripDaysPage />} />
                            <Route path="/trip/:trip_id/expenses" element={<TripExpensesPage />} />
                            <Route element={<JourneyRoutes />}>
                                <Route path="/trip/:trip_id/:journey_id" element={<ActivitiesDayPage />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
