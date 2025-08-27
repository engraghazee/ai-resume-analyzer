import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

// Loader function for handling GET requests to /auth
export function loader() {
  return null;
}

// Meta information for the Auth route
export const meta = () => {
  [
    { title: "Auth" },
    { name: "description", content: "Authentication Page" },
  ]
}

// Auth component handles authentication logic and redirects
const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  // Extract 'next' query parameter from URL
  const next = location.search.split('next=')[1]
  const navigate = useNavigate();
  // Redirect user after authentication
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next)
    }
  }, [auth.isAuthenticated, next])
  // Render authentication UI
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className='gradient-border shadow-lg'>
        <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
          <div className='flex flex-col gap-2 text-center items-center'>
            <h1>Welcome</h1>
            <h2>Log In To Continou Your Job Journey</h2>
          </div>
          <div>
            {/* Show loading state or authentication buttons */}
            {isLoading ?
              (
                <button className='auth-button animate-pulse'>Signing you in....</button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button className='auth-button' onClick={auth.signOut}>Sign Out</button>
                  ) : (
                    <button className='auth-button' onClick={auth.signIn}>Sign In</button>
                  )}
                </>
              )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Auth