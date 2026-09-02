import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { LogIn, UserPlus, Key, User, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function AuthPage({ onLoginSuccess, onContinueAsGuest }) {
  const [tab, setTab] = useState('signin'); // 'signin' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orgTitle, setOrgTitle] = useState('My Workspace');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickLogin = (demoUser) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: demoUser === 'Aryan' ? 1 : 2,
        name: demoUser,
        username: demoUser.toLowerCase(),
        token: `mock-jwt-token-${Date.now()}`
      });
    }, 400);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Check credentials (mocking against backend data: aryan / 123, avni / 123)
    setTimeout(() => {
      setIsLoading(false);
      if (
        (username.toLowerCase() === 'aryan' && password === '123') ||
        (username.toLowerCase() === 'avni' && password === '123') ||
        (username && password)
      ) {
        onLoginSuccess({
          id: username.toLowerCase() === 'avni' ? 2 : 1,
          name: username.charAt(0).toUpperCase() + username.slice(1),
          username: username.toLowerCase(),
          token: `jwt-token-${Date.now()}`
        });
      } else {
        setError('Invalid username or password. (Hint: aryan / 123 or avni / 123)');
      }
    }, 600);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: Date.now(),
        name: name.trim() || username.trim(),
        username: username.trim().toLowerCase(),
        token: `jwt-token-${Date.now()}`
      }, orgTitle.trim() || 'My Workspace');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#111111] flex flex-col justify-between font-sans selection:bg-[#FF5B5B] selection:text-white">
      
      {/* Top Header */}
      <header className="border-b-2 border-black bg-white py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-white border-2 border-black rounded-md flex flex-col items-center justify-center font-black leading-none text-[#2563EB] shadow-[2px_2px_0px_#000000]">
            <div className="flex tracking-tighter text-[11px] font-black">TR</div>
            <div className="flex tracking-tighter text-[11px] font-black">EL</div>
          </div>
          <span className="font-extrabold text-xl tracking-tight font-sans text-black">
            Task<span className="text-[#FF5B5B]">Flow</span>
          </span>
        </div>

        <button
          onClick={onContinueAsGuest}
          className="text-xs font-bold text-neutral-700 hover:text-black hover:underline cursor-pointer"
        >
          Skip & Browse as Guest →
        </button>
      </header>

      {/* Center Auth Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          
          {/* Brand Announcement */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-black rounded text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000000] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5B5B]" /> Agile Project Workspace
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              {tab === 'signin' ? 'Welcome Back!' : 'Create an Account'}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-neutral-600 mt-1">
              {tab === 'signin'
                ? 'Sign in to access your organizations, boards & sprint backlogs.'
                : 'Sign up to build your team workspace and agile kanban boards.'}
            </p>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="mb-4 bg-white border-2 border-black rounded-md p-3.5 shadow-[3px_3px_0px_#000000]">
            <div className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mb-2 flex items-center justify-between">
              <span>⚡ One-Click Demo Logins</span>
              <span className="text-emerald-700 font-bold">Pass: 123</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('Aryan')}
                className="font-extrabold text-xs h-9 justify-center"
              >
                👤 Login as Aryan
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('Avni')}
                className="font-extrabold text-xs h-9 justify-center"
              >
                👩‍💻 Login as Avni
              </Button>
            </div>
          </div>

          {/* Neo-brutalist Auth Card */}
          <div className="bg-[#FAF5EE] border-[2.5px] border-black rounded-md p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
            
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-white p-1 border-2 border-black rounded mb-6 shadow-[2px_2px_0px_#000000]">
              <button
                type="button"
                onClick={() => {
                  setTab('signin');
                  setError('');
                }}
                className={`py-2 text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer ${
                  tab === 'signin'
                    ? 'bg-[#FF5B5B] text-white shadow-[1px_1px_0px_#000000]'
                    : 'text-black hover:bg-[#FAF5EE]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('signup');
                  setError('');
                }}
                className={`py-2 text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer ${
                  tab === 'signup'
                    ? 'bg-[#FF5B5B] text-white shadow-[1px_1px_0px_#000000]'
                    : 'text-black hover:bg-[#FAF5EE]'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-2.5 bg-rose-100 border-2 border-rose-600 rounded text-xs font-bold text-rose-800 animate-in fade-in">
                ⚠️ {error}
              </div>
            )}

            {/* Sign In Form */}
            {tab === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Username
                  </label>
                  <Input
                    required
                    placeholder="e.g. aryan or avni"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-black uppercase tracking-wider text-black">
                      Password
                    </label>
                    <span className="text-[11px] font-bold text-neutral-500">Demo: 123</span>
                  </div>
                  <Input
                    type="password"
                    required
                    placeholder="Enter password (e.g. 123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="w-full h-11 text-sm font-black shadow-[3px_3px_0px_#000000]"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In to Workspace'}
                  </Button>
                </div>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Full Name
                  </label>
                  <Input
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Username
                  </label>
                  <Input
                    required
                    placeholder="e.g. aryan_dev"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
                    Primary Workspace / Organisation Title
                  </label>
                  <Input
                    required
                    placeholder="e.g. Dev Studio, Core Engineering"
                    value={orgTitle}
                    onChange={(e) => setOrgTitle(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="w-full h-11 text-sm font-black shadow-[3px_3px_0px_#000000]"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account & Workspace'}
                  </Button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="border-t-2 border-black bg-white py-4 text-center text-xs font-bold text-neutral-600">
        TaskFlow Neo-Brutalist Agile Workspace • JWT Auth Enabled
      </footer>

    </div>
  );
}
