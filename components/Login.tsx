import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate against a backend.
    if (username === 'admin' && password === '0000') {
      onLogin();
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-8 border border-green-500/30 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 neon-text">تسجيل الدخول</h1>
          <p className="text-gray-400 mt-2">مرحباً بك في نظام نقاط البيع</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="اسم المستخدم"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <Input 
            label="كلمة المرور"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;