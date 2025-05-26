import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { ExternalLink, Tv } from 'lucide-react';

    const AnimeCard = ({ site, index }) => {
      const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateY: -30 },
        visible: {
          opacity: 1,
          y: 0,
          rotateY: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.6,
            ease: [0.42, 0, 0.58, 1] 
          },
        },
      };

      const hoverVariants = {
         rest: { scale: 1, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" },
         hover: { scale: 1.05, y: -5, boxShadow: "0px 10px 20px hsl(var(--primary)/0.4)", transition: { duration: 0.2 } }
      }

      return (
        <motion.div 
            variants={cardVariants} 
            className="h-full"
            whileHover="hover"
            initial="rest"
            animate="rest"
        >
          <motion.custom variants={hoverVariants}>
            <Card className="flex flex-col justify-between h-full overflow-hidden shadow-xl transition-all duration-300 ease-in-out glassmorphism border-primary/30 hover:border-primary">
              <CardHeader className="p-4">
                <div className="flex items-center mb-3">
                  <Tv className="w-8 h-8 mr-3 text-primary animate-float" />
                  <CardTitle className="text-xl font-semibold gradient-text">{site.name}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2 h-10">
                  {site.description || `Official website for ${site.name}. Click below to visit.`}
                </CardDescription>
              </CardHeader>
              
              <div className="p-4 flex-grow">
                <img 
                  className="w-full h-48 object-cover rounded-md mb-4 border border-border shadow-inner" 
                  alt={`Promotional image for ${site.name} anime site`}
                 src="https://images.unsplash.com/photo-1613715570915-09d904e8bda0" />
              </div>

              <CardFooter className="p-4 border-t border-border/20">
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground animate-pulse-glow"
                  onClick={() => window.open(site.url, '_blank', 'noopener,noreferrer')}
                >
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    Visit Site <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.custom>
        </motion.div>
      );
    };

    export default AnimeCard;