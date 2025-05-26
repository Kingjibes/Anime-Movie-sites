import React, { useState, useEffect } from 'react';
    import { useAnimeSites } from '@/contexts/AnimeSiteContext';
    import { useMovieSites } from '@/contexts/MovieSiteContext';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { PlusCircle, LogOut, Tv, Film } from 'lucide-react';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import AdminLoginForm from '@/components/admin/AdminLoginForm';
    import SiteFormDialog from '@/components/admin/SiteFormDialog';
    import SiteList from '@/components/admin/SiteList';

    const ADMIN_EMAIL = "richvybs92@gmail.com";

    const AdminPage = () => {
      const animeContext = useAnimeSites();
      const movieContext = useMovieSites();
      const { toast } = useToast();

      const [isAdmin, setIsAdmin] = useState(false);
      const [currentSite, setCurrentSite] = useState(null);
      const [isFormOpen, setIsFormOpen] = useState(false);
      const [formLoading, setFormLoading] = useState(false);
      const [activeTab, setActiveTab] = useState("anime");

      useEffect(() => {
        const loggedInAdmin = localStorage.getItem('animeAdminEmail');
        if (loggedInAdmin === ADMIN_EMAIL) {
          setIsAdmin(true);
        }
      }, []);

      const handleLoginSuccess = () => {
        setIsAdmin(true);
      };

      const handleLogout = () => {
        localStorage.removeItem('animeAdminEmail');
        setIsAdmin(false);
        toast({ title: "Logged Out", description: "You have been logged out successfully." });
      };

      const openForm = (site = null) => {
        setCurrentSite(site);
        setIsFormOpen(true);
      };

      const closeForm = () => {
        if (!formLoading) {
          setIsFormOpen(false);
          setCurrentSite(null);
        }
      };

      const handleSubmitSite = async (formData) => {
        setFormLoading(true);
        let success = false;
        const context = activeTab === "anime" ? animeContext : movieContext;
        const siteTypeLabel = activeTab === "anime" ? "Anime Site" : "Movie Site";

        if (currentSite) {
          const result = await context.updateSite(currentSite.id, formData);
          if (result) {
            toast({ title: `${siteTypeLabel} Updated`, description: `${formData.name} has been updated.`, className: "bg-blue-600 text-white" });
            success = true;
          }
        } else {
          const result = await context.addSite(formData);
          if (result) {
            toast({ title: `${siteTypeLabel} Added`, description: `${formData.name} has been added.`, className: "bg-green-600 text-white" });
            success = true;
          }
        }
        setFormLoading(false);
        if (success) {
          closeForm();
        }
      };

      const handleDeleteSite = async (siteId) => {
        setFormLoading(true); 
        const context = activeTab === "anime" ? animeContext : movieContext;
        const success = await context.deleteSite(siteId);
        setFormLoading(false);
        return success; 
      };

      if (!isAdmin) {
        return <AdminLoginForm onLoginSuccess={handleLoginSuccess} />;
      }
      
      const currentContext = activeTab === "anime" ? animeContext : movieContext;
      const siteTypeLabelForDialog = activeTab === "anime" ? "Anime Site" : "Movie Site";

      return (
        <div className="flex-grow p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-border"
          >
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4 sm:mb-0">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="destructive" disabled={formLoading}>
              <LogOut className="w-5 h-5 mr-2" /> Logout
            </Button>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <TabsList className="mb-4 sm:mb-0">
                <TabsTrigger value="anime" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Tv className="w-4 h-4 mr-2"/> Anime Sites
                </TabsTrigger>
                <TabsTrigger value="movies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Film className="w-4 h-4 mr-2"/> Movie Sites
                </TabsTrigger>
              </TabsList>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
                onClick={() => openForm()}
                disabled={formLoading}
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Add New {activeTab === "anime" ? "Anime" : "Movie"} Site
              </Button>
            </div>

            <TabsContent value="anime">
              <SiteList
                sites={animeContext.sites}
                onEdit={openForm}
                onDelete={handleDeleteSite}
                siteTypeLabel="Anime Site"
                loading={animeContext.loading}
                formBusyState={formLoading}
              />
            </TabsContent>
            <TabsContent value="movies">
              <SiteList
                sites={movieContext.sites}
                onEdit={openForm}
                onDelete={handleDeleteSite}
                siteTypeLabel="Movie Site"
                loading={movieContext.loading}
                formBusyState={formLoading}
              />
            </TabsContent>
          </Tabs>

          <SiteFormDialog
            isOpen={isFormOpen}
            onOpenChange={closeForm}
            currentSite={currentSite}
            onSubmit={handleSubmitSite}
            siteTypeLabel={siteTypeLabelForDialog}
            formLoading={formLoading}
          />
        </div>
      );
    };

    export default AdminPage;