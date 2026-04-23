import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const NavUser: React.FC = () => {
    const { user, logout } = useAuthStore();

    return (
        <div className="nav-user">
            {user ? (
                <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <button onClick={logout} className="logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <div className="guest-info">
                    <span>Please log in</span>
                </div>
            )}
        </div>
    );
};

export default NavUser;