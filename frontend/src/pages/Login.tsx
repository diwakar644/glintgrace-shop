import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login: setAdmin, isAdmin } = useAuthStore((state: any) => state);

  // DETECT MAGIC LINK IMMEDIATELY
  const isMagicLink = isSignInWithEmailLink(auth, window.location.href);

  // STATE
  // If it's a magic link, start in "Verifying" mode (don't show form)
  const [verifying, setVerifying] = useState(isMagicLink);
  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. AUTO-REDIRECT
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  // 2. HANDLE MAGIC LINK
  useEffect(() => {
    if (isMagicLink) {
      let emailForSignIn = window.localStorage.getItem('emailForSignIn');
      if (!emailForSignIn) {
        emailForSignIn = window.prompt('Please confirm your email address to finish logging in:');
      }
      
      if (emailForSignIn) {
        signInWithEmailLink(auth, emailForSignIn, window.location.href)
          .then(() => {
            window.localStorage.removeItem('emailForSignIn');
            setAdmin();
            // Redirect happens automatically via the other useEffect
          })
          .catch((err) => {
            setError(err.message);
            setVerifying(false); // Show form if it fails
          });
      } else {
        setVerifying(false); // User cancelled prompt
      }
    }
  }, []);

  // --- STANDARD HANDLERS ---
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAdmin();
    } catch (err: any) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccessMsg('');
    
    // --- CRITICAL FIX START ---
    // We force the URL to be clean (e.g., https://glintgrace.netlify.app/login)
    // This prevents broken links if 'window.location.href' has junk in it.
    const actionCodeSettings = { 
      url: window.location.origin + '/login', 
      handleCodeInApp: true 
    };
    // --- CRITICAL FIX END ---

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setSuccessMsg(`Login link sent to ${email}. Check your inbox (and spam)!`);
    } catch (err: any) {
      console.error("Firebase Error:", err); // Log error for debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccessMsg('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(`Reset link sent to ${email}.`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER: VERIFYING SCREEN ---
  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-black mb-4" />
        <h2 className="text-xl font-bold">Verifying your login...</h2>
        <p className="text-gray-500">Please wait a moment.</p>
      </div>
    );
  }

  // --- RENDER: NORMAL LOGIN FORM ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="bg-black p-6 text-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">💎 GlintGrace</h1>
          <p className="text-gray-400 text-sm mt-1">Admin & Staff Portal</p>
        </div>

        <div className="p-8">
          {!isForgot && (
            <div className="flex border-b border-gray-200 mb-6">
              <button 
                type="button" // Always specify type="button" for tabs
                className={`flex-1 pb-2 text-sm font-semibold transition ${activeTab === 'password' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`} 
                onClick={() => setActiveTab('password')}
              >
                Password Login
              </button>
              <button 
                type="button"
                className={`flex-1 pb-2 text-sm font-semibold transition ${activeTab === 'otp' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`} 
                onClick={() => setActiveTab('otp')}
              >
                Email Link (OTP)
              </button>
            </div>
          )}

          {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm flex items-center"><span className="mr-2">⚠️</span> {error}</div>}
          {successMsg && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> {successMsg}</div>}

          {isForgot ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Reset Password</h2>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input type="email" required placeholder="Enter your email" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button disabled={loading} className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition disabled:opacity-50">{loading ? 'Sending...' : 'Send Reset Link'}</button>
              <button type="button" onClick={() => setIsForgot(false)} className="w-full text-center text-sm text-gray-500 hover:text-black mt-2">Back to Login</button>
            </form>
          ) : (
            <>
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordLogin} className="space-y-5">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input type="email" required placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input type={showPassword ? "text" : "password"} required placeholder="Password" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-black">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="text-right"><button type="button" onClick={() => setIsForgot(true)} className="text-sm text-blue-600 hover:underline">Forgot Password?</button></div>
                  <button disabled={loading} className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition disabled:opacity-50 flex justify-center items-center gap-2">{loading ? 'Logging in...' : <>Login <ArrowRight className="w-4 h-4" /></>}</button>
                </form>
              )}
              {activeTab === 'otp' && (
                <form onSubmit={handleOtpLogin} className="space-y-5">
                  <p className="text-sm text-gray-500">Enter your email to receive a secure login link.</p>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input type="email" required placeholder="Email Address" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <button disabled={loading} className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition disabled:opacity-50 flex justify-center items-center gap-2">{loading ? 'Sending...' : <>Send Login Link <Mail className="w-4 h-4" /></>}</button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};