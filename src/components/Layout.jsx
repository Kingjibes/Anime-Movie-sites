
    import React from 'react';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';

    const Layout = ({ children }) => {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-slate-900 to-background">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      );
    };

    export default Layout;
  