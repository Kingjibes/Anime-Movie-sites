import React from 'react';
    import { useAnimeSites } from '@/contexts/AnimeSiteContext';
    import AnimeCard from '@/components/AnimeCard';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { ListChecks, Loader2 } from 'lucide-react';

    const HomePage = () => {
      const { sites, loading } = useAnimeSites();

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

      return (
        <div className="flex-grow flex flex-col items-center py-8 px-4">
          <motion.h1
            initial={{ opacity:0, y: -20 }}
            animate={{ opacity:1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-2 gradient-text text-center"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Explore Anime Universes
          </motion.h1>
          <motion.p 
            initial={{ opacity:0, y: -20 }}
            animate={{ opacity:1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-12 text-center max-w-2xl"
          >
            Discover your next favorite anime destination from our curated list.
            Dive into worlds of adventure, fantasy, and unforgettable stories.
          </motion.p>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
              <p className="text-xl text-foreground">Loading Anime Sites...</p>
            </div>
          ) : sites.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg shadow-lg glassmorphism"
            >
              <ListChecks className="w-16 h-16 mx-auto mb-4 text-primary" />
              <p className="text-xl font-semibold text-foreground mb-2">No Anime Sites Yet!</p>
              <p className="text-muted-foreground mb-6">
                Looks like the list is empty. The admin can add new sites.
              </p>
              <Link to="/admin">
                <Button variant="secondary" size="lg">
                  Go to Admin Panel
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
            >
              {sites.map((site, index) => (
                <AnimeCard key={site.id} site={site} index={index} />
              ))}
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: loading ? 0.5 : (sites.length > 0 ? sites.length * 0.1 + 0.5 : 0.7) }}
            className="mt-16 text-center"
          >
            <p className="text-foreground text-lg">Want to see more? </p>
            <p className="text-muted-foreground">
              New sites are added regularly by our admin. Stay tuned!
            </p>
          </motion.div>
        </div>
      );
    };

    export default HomePage;