import React, { createContext, useContext, useState, useEffect } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';

    const MovieSiteContext = createContext();

    export const MovieSiteProvider = ({ children }) => {
      const [sites, setSites] = useState([]);
      const [loading, setLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        fetchMovieSites();
      }, []);

      const fetchMovieSites = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('movie_sites')
            .select('*')
            .order('name', { ascending: true });

          if (error) {
            console.error('Error fetching movie sites:', error);
            toast({ title: "Error", description: "Could not fetch movie sites.", variant: "destructive"});
            setSites([]);
          } else {
            setSites(data || []);
          }
        } catch (error) {
            console.error('Catch Error fetching movie sites:', error);
            toast({ title: "Error", description: "An unexpected error occurred while fetching movie sites.", variant: "destructive"});
            setSites([]);
        } finally {
            setLoading(false);
        }
      };
      
      // Admin functions (add, update, delete) can be added here if needed for movie sites
      // For now, it's read-only from the frontend perspective for movie sites.

      return (
        <MovieSiteContext.Provider value={{ sites, loading, fetchMovieSites }}>
          {children}
        </MovieSiteContext.Provider>
      );
    };

    export const useMovieSites = () => useContext(MovieSiteContext);