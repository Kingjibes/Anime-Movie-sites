import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { LogIn, ShieldAlert } from 'lucide-react';

    const ADMIN_EMAIL = "richvybs92@gmail.com";

    const AdminLoginForm = ({ onLoginSuccess }) => {
      const [email, setEmail] = useState('');
      const { toast } = useToast();

      const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL) {
          localStorage.setItem('animeAdminEmail', email);
          onLoginSuccess();
          toast({ title: "Login Successful", description: "Welcome, Admin!", className: "bg-green-600 text-white" });
          setEmail('');
        } else {
          toast({ title: "Login Failed", description: "Invalid email address.", variant: "destructive" });
        }
      };

      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-grow flex flex-col items-center justify-center p-8 glassmorphism rounded-lg shadow-2xl border border-primary/30 max-w-md mx-auto"
        >
          <ShieldAlert className="w-20 h-20 text-primary mb-6 animate-pulse" />
          <h1 className="text-3xl font-bold mb-4 gradient-text">Admin Access Required</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Please log in with your admin credentials to manage site listings.
          </p>
          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div>
              <Label htmlFor="email-login" className="text-foreground">Admin Email</Label>
              <Input
                id="email-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-admin-email@example.com"
                required
                className="mt-1 bg-background/70 border-primary/50 focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-3 hover:shadow-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300">
              <LogIn className="w-5 h-5 mr-2" /> Log In
            </Button>
          </form>
        </motion.div>
      );
    };

    export default AdminLoginForm;