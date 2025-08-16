import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/walletActions'

const DUMMY_OTP = '1234';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function sendOtp() {
    const ok = /^\d{10}$/.test(phone);
    if (!ok) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setOtpSent(true);
  }

  function verify() {
    if (otp === DUMMY_OTP) {
      dispatch(login(phone));
      navigate('/app');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gray-900 text-gray-100">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white text-center">
          Welcome to Wallet
        </h1>
        <p className="text-gray-400 text-sm mt-2 text-center">
          Verify your mobile number to continue.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-400">
            Mobile Number
          </label>
          <input
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g., 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            type="tel"
          />

          {!otpSent && (
            <button
              className="w-full px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors duration-200"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-400">
                Enter OTP (Hint: 1234)
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                type="text"
              />
              <button
                className="w-full px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors duration-200"
                onClick={verify}
              >
                Verify & Continue
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-800 text-red-300 p-3 rounded-lg text-sm text-center font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
