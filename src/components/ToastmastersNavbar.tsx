'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Menu, X, User, LogIn, LogOut, ChevronDown } from 'lucide-react';

export const ToastmastersNavbar = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { 
      label: 'About', 
      href: '/about',
      dropdown: [
        { label: 'Our Club', href: '/about' },
        { label: 'Members', href: '/members' },
        { label: 'Officers', href: '/officers' },
        { label: 'Meeting Schedule', href: '/meetings' },
      ]
    },
    { 
      label: 'Education', 
      href: '/education',
      dropdown: [
        { label: 'Pathways Overview', href: '/education' },
        { label: 'Speech Projects', href: '/speeches' },
        { label: 'Leadership Roles', href: '/leadership' },
        { label: 'Resources', href: '/resources' },
      ]
    },
    { 
      label: 'Events', 
      href: '/events',
      dropdown: [
        { label: 'Upcoming Meetings', href: '/meetings' },
        { label: 'Contests', href: '/contests' },
        { label: 'Special Events', href: '/events' },
      ]
    },
    { label: 'Contact', href: '/contact' },
  ];

  const DropdownMenu = ({ item, isMobile = false }: { item: any, isMobile?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!item.dropdown) {
      return (
        <Link
          href={item.href}
          className={`${isMobile ? 'block py-2' : ''} text-gray-700 hover:text-primary-700 transition-colors font-bold tracking-wider`}
          onClick={() => isMobile && setMenuOpen(false)}
        >
          {item.label.toUpperCase()}
        </Link>
      );
    }

    if (isMobile) {
      return (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-primary-700 font-bold tracking-wider"
          >
            {item.label.toUpperCase()}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="ml-4 space-y-2">
              {item.dropdown.map((subItem: any) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block py-1 text-sm text-gray-600 hover:text-primary-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-700 transition-colors font-bold tracking-wider">
          <span>{item.label.toUpperCase()}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {item.dropdown.map((subItem: any) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-700 first:rounded-t-lg last:rounded-b-lg"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span>📍 London Bridge • 🕕 1st, 3rd & 5th Tuesday 6:30pm</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-xs">
              <span>Club #00760422 • District 91</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Main header */}
        <div className="h-16 flex items-center justify-between">
          {/* Title */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-black text-gray-900 tracking-wide">
              MLP TOASTMASTERS
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <DropdownMenu key={item.label} item={item} />
            ))}
          </nav>

          {/* User menu / Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {session.user?.name?.split(' ')[0] || 'Member'}
                  </span>
                </div>
                <Link
                  href="/api/auth/signout"
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/api/auth/signin"
                className="flex items-center space-x-1 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-blue-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            {/* Mobile Auth Section */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              {session ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      {session.user?.name || 'Member'}
                    </span>
                  </div>
                  <Link
                    href="/api/auth/signout"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              ) : (
                <Link
                  href="/api/auth/signin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors w-fit"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-3">
              {navigation.map((item) => (
                <DropdownMenu key={item.label} item={item} isMobile={true} />
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};