import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (!res.ok) {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (data) setUser(data.user);
            });
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Private Dashboard</h1>
            {user && (
                <p className="lead">Welcome, <strong>{user.email}</strong></p>
            )}
            <p>You are successfully authenticated.</p>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};
