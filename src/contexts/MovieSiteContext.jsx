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
            toast({ title: "Error", description: "Could not fetch movie sites. " + error.message, variant: "destructive"});
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
      
      const addSite = async (siteData) => {
        try {
          const { data, error } = await supabase
            .from('movie_sites')
            .insert([siteData])
            .select()
            .single();

          if (error) {
            console.error('Error adding movie site:', error);
            toast({ title: "Error Adding Site", description: error.message, variant: "destructive"});
            return null;
          }
          setSites((prevSites) => [...prevSites, data].sort((a, b) => a.name.localeCompare(b.name)));
          return data;
        } catch (error) {
            console.error('Catch Error adding movie site:', error);
            toast({ title: "Error", description: "An unexpected error occurred while adding the site.", variant: "destructive"});
            return null;
        }
      };

      const updateSite = async (id, updatedData) => {
        try {
          const { data, error } = await supabase
            .from('movie_sites')
            .update(updatedData)
            .eq('id', id)
            .select()
            .single();

          if (error) {
            console.error('Error updating movie site:', error);
            toast({ title: "Error Updating Site", description: error.message, variant: "destructive"});
            return null;
          }
          setSites((prevSites) =>
            prevSites.map((site) => (site.id === id ? data : site)).sort((a, b) => a.name.localeCompare(b.name))
          );
          return data;
        } catch (error) {
            console.error('Catch Error updating movie site:', error);
            toast({ title: "Error", description: "An unexpected error occurred while updating the site.", variant: "destructive"});
            return null;
        }
      };

      const deleteSite = async (id) => {
        try {
          const { error } = await supabase
            .from('movie_sites')
            .delete()
            .eq('id', id);

          if (error) {
            console.error('Error deleting movie site:', error);
            toast({ title: "Error Deleting Site", description: error.message, variant: "destructive"});
            return false;
          }
          setSites((prevSites) => prevSites.filter((site) => site.id !== id));
          return true;
        } catch (error) {
            console.error('Catch Error deleting movie site:', error);
            toast({ title: "Error", description: "An unexpected error occurred while deleting the site.", variant: "destructive"});
            return false;
        }
      };

      return (
        <MovieSiteContext.Provider value={{ sites, loading, fetchMovieSites, addSite, updateSite, deleteSite }}>
          {children}
        </MovieSiteContext.Provider>
      );
    };

    export const useMovieSites = () => useContext(MovieSiteContext);