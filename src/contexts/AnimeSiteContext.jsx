import React, { createContext, useContext, useState, useEffect } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';

    const AnimeSiteContext = createContext();

    export const AnimeSiteProvider = ({ children }) => {
      const [sites, setSites] = useState([]);
      const [loading, setLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        fetchSites();
      }, []);

      const fetchSites = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('anime_sites')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching sites:', error);
            toast({ title: "Error", description: "Could not fetch anime sites.", variant: "destructive"});
            setSites([]);
          } else {
            setSites(data || []);
          }
        } catch (error) {
            console.error('Catch Error fetching sites:', error);
            toast({ title: "Error", description: "An unexpected error occurred while fetching sites.", variant: "destructive"});
            setSites([]);
        } finally {
            setLoading(false);
        }
      };

      const addSite = async (siteData) => {
        try {
          const { data, error } = await supabase
            .from('anime_sites')
            .insert([{ name: siteData.name, url: siteData.url, image_placeholder: siteData.imagePlaceholder || 'Default anime placeholder' }])
            .select()
            .single();

          if (error) {
            console.error('Error adding site:', error);
            toast({ title: "Error Adding Site", description: error.message, variant: "destructive"});
            return null;
          }
          setSites((prevSites) => [data, ...prevSites]);
          return data;
        } catch (error) {
            console.error('Catch Error adding site:', error);
            toast({ title: "Error", description: "An unexpected error occurred while adding the site.", variant: "destructive"});
            return null;
        }
      };

      const updateSite = async (id, updatedSiteData) => {
        try {
          const { data, error } = await supabase
            .from('anime_sites')
            .update({ name: updatedSiteData.name, url: updatedSiteData.url, image_placeholder: updatedSiteData.imagePlaceholder })
            .eq('id', id)
            .select()
            .single();

          if (error) {
            console.error('Error updating site:', error);
            toast({ title: "Error Updating Site", description: error.message, variant: "destructive"});
            return null;
          }
          setSites((prevSites) =>
            prevSites.map((site) => (site.id === id ? data : site))
          );
          return data;
        } catch (error) {
            console.error('Catch Error updating site:', error);
            toast({ title: "Error", description: "An unexpected error occurred while updating the site.", variant: "destructive"});
            return null;
        }
      };

      const deleteSite = async (id) => {
         try {
            const { error } = await supabase
              .from('anime_sites')
              .delete()
              .eq('id', id);

            if (error) {
              console.error('Error deleting site:', error);
              toast({ title: "Error Deleting Site", description: error.message, variant: "destructive"});
              return false;
            }
            setSites((prevSites) => prevSites.filter((site) => site.id !== id));
            return true;
        } catch (error) {
            console.error('Catch Error deleting site:', error);
            toast({ title: "Error", description: "An unexpected error occurred while deleting the site.", variant: "destructive"});
            return false;
        }
      };

      return (
        <AnimeSiteContext.Provider value={{ sites, loading, fetchSites, addSite, updateSite, deleteSite }}>
          {children}
        </AnimeSiteContext.Provider>
      );
    };

    export const useAnimeSites = () => useContext(AnimeSiteContext);