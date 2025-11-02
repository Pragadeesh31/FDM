import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { toggleCart, cartCount } = useCart();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    const navLinkClasses = "font-montserrat text-gray-700 hover:text-green-600 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
    const activeNavLinkClasses = "text-green-700 font-bold";
    const displayName = currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName}` : currentUser?.username;

    return (
        <header className="bg-white shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                         <NavLink to="/" className="flex items-center space-x-2">
                            <img src="https://picsum.photos/seed/logo/60/60" alt="FDM Logo" className="h-12 w-12 rounded-full" />
                             <span className="font-bold text-xl text-gray-800 font-montserrat">FDM</span>
                        </NavLink>
                    </div>

                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Home</NavLink>
                            <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Shop</NavLink>
                            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>About</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Contact</NavLink>
                        </div>
                    </nav>

                    <div className="flex items-center space-x-2">
                        {currentUser ? (
                             <div className="relative">
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">Signed in as <span className="font-bold">{displayName}</span></div>
                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Register</Link>
                            </div>
                        )}
                       
                        <button onClick={toggleCart} className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                         <div className="md:hidden ml-2">
                             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Shop</NavLink>
                        <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                        <NavLink to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                         {!currentUser && (
                            <>
                                <NavLink to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                                <NavLink to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
                            </>
                         )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;