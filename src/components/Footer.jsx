
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Zap } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      return (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="py-8 text-center text-muted-foreground border-t border-border/50 glassmorphism mt-auto"
        >
          <div className="container mx-auto px-4">
            <p className="text-sm">
              &copy; {currentYear} Anime Site by Hackerpro. All rights reserved.
            </p>
            <p className="text-xs mt-2 flex items-center justify-center">
              <Zap className="w-4 h-4 mr-1 text-primary" />
              <span>Powered by Hackerpro.</span>
            </p>
          </div>
        </motion.footer>
      );
    };

    export default Footer;
  