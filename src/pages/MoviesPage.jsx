import React from 'react';
    import { useMovieSites } from '@/contexts/MovieSiteContext';
    import MovieCard from '@/components/MovieCard';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { ListChecks, Loader2, Film } from 'lucide-react';

    const MoviesPage = () => {
      const { sites: movieSites, loading } = useMovieSites();

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      };

      const titleVariants = {
        hidden: { opacity:0, y: -30, scale: 0.9 },
        visible: { opacity:1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
      };
      
      const textVariants = {
        hidden: { opacity:0, y: 20 },
        visible: { opacity:1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
      };


      return (
        <div className="flex-grow flex flex-col items-center py-8 px-4">
          <motion.div variants={titleVariants} initial="hidden" animate="visible" className="text-center">
            <Film className="w-16 h-16 mx-auto mb-4 text-primary animate-float" />
            <h1
              className="text-4xl md:text-5xl font-bold mb-2 gradient-text"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Free Movie Havens
            </h1>
          </motion.div>
          <motion.p 
            variants={textVariants} initial="hidden" animate="visible"
            className="text-lg text-muted-foreground mb-12 text-center max-w-2xl"
          >
            Explore a collection of websites where you can watch movies for free. Grab your popcorn!
          </motion.p>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-10">
              <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
              <p className="text-xl text-foreground">Loading Movie Sites...</p>
            </div>
          ) : movieSites.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg shadow-lg glassmorphism"
            >
              <ListChecks className="w-16 h-16 mx-auto mb-4 text-primary" />
              <p className="text-xl font-semibold text-foreground mb-2">No Movie Sites Yet!</p>
              <p className="text-muted-foreground mb-6">
                The admin can add movie sites. Check back later!
              </p>
              <Link to="/admin">
                <Button variant="secondary" size="lg" className="animate-pulse-glow">
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
              {movieSites.map((site, index) => (
                <MovieCard key={site.id} site={site} index={index} />
              ))}
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: loading ? 0.5 : (movieSites.length > 0 ? movieSites.length * 0.1 + 0.5 : 0.7) }}
            className="mt-16 text-center"
          >
            <p className="text-foreground text-lg">More cinematic adventures await!</p>
            <p className="text-muted-foreground">
              Our admin is always on the lookout for new free movie sources.
            </p>
          </motion.div>
        </div>
      );
    };

    export default MoviesPage;