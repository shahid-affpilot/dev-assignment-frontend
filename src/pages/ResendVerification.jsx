import React, { useState, useEffect } from 'react'

const ResendVerification = () => {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
  
    const sendVerificationEmail = async () => {
        setLoading(true)
        try {
            const email = localStorage.getItem('email')
            if (!email) {
                setStatus('error')
                setMessage('No one is logged in. Please try logging in again.')
                return
            }

            const response = await fetch('http://localhost:8080/api/v1/auth/resend-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is the correct way to include credentials
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            setStatus(data.status)
            setMessage(data.message)
        } catch (error) {
            console.error('Error:', error)
            setStatus('error')
            setMessage('Failed to send verification email. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        sendVerificationEmail()
    }, [])

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
            </h2>
            <div className="mt-4 text-center">
            <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto">
                <svg 
                className="w-8 h-8 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" 
                />
                </svg>
            </div>
            </div>
        </div>
        
        <div className="text-center">
            <p className="text-gray-600 text-lg">
            A verification link has been sent to your email address.
            </p>
            <p className="mt-2 text-gray-500">
            Please check your inbox and click the verification link to complete your registration.
            </p>
        </div>

        <div className="mt-6">
            <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={sendVerificationEmail}
            disabled={loading}
            >
            {loading ? 'Sending...' : 'Resend Verification Email'}
            </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
            <p>
            Didn't receive the email? Check your spam folder or click the button above to resend.
            </p>
        </div>
        </div>
    </div>
    )
}

export default ResendVerification