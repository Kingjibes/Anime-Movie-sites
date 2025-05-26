import React, { useState, useEffect } from 'react';
    import { useAnimeSites } from '@/contexts/AnimeSiteContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
    import { useToast } from '@/components/ui/use-toast';
    import { motion, AnimatePresence } from 'framer-motion';
    import { PlusCircle, Edit, Trash2, LogIn, LogOut, ShieldAlert, ListOrdered, Loader2 } from 'lucide-react';

    const ADMIN_EMAIL = "richvybs92@gmail.com";

    const AdminPage = () => {
      const { sites, addSite, updateSite, deleteSite, loading: sitesLoading } = useAnimeSites();
      const { toast } = useToast();
      const [isAdmin, setIsAdmin] = useState(false);
      const [email, setEmail] = useState('');
      const [currentSite, setCurrentSite] = useState(null);
      const [isFormOpen, setIsFormOpen] = useState(false);
      const [siteName, setSiteName] = useState('');
      const [siteUrl, setSiteUrl] = useState('');
      const [formLoading, setFormLoading] = useState(false);


      useEffect(() => {
        const loggedInAdmin = localStorage.getItem('animeAdminEmail');
        if (loggedInAdmin === ADMIN_EMAIL) {
          setIsAdmin(true);
        }
      }, []);

      const handleLogin = (e) => {
        e.preventDefault();
        if (email === ADMIN_EMAIL) {
          localStorage.setItem('animeAdminEmail', email);
          setIsAdmin(true);
          toast({ title: "Login Successful", description: "Welcome, Admin!", className: "bg-green-600 text-white" });
          setEmail('');
        } else {
          toast({ title: "Login Failed", description: "Invalid email address.", variant: "destructive" });
        }
      };

      const handleLogout = () => {
        localStorage.removeItem('animeAdminEmail');
        setIsAdmin(false);
        toast({ title: "Logged Out", description: "You have been logged out successfully." });
      };

      const openForm = (site = null) => {
        setCurrentSite(site);
        setSiteName(site ? site.name : '');
        setSiteUrl(site ? site.url : '');
        setIsFormOpen(true);
      };

      const closeForm = () => {
        setIsFormOpen(false);
        setCurrentSite(null);
        setSiteName('');
        setSiteUrl('');
        setFormLoading(false);
      };

      const handleSubmitSite = async (e) => {
        e.preventDefault();
        if (!siteName.trim() || !siteUrl.trim()) {
          toast({ title: "Validation Error", description: "Site name and URL cannot be empty.", variant: "destructive" });
          return;
        }
        try {
          new URL(siteUrl);
        } catch (_) {
          toast({ title: "Validation Error", description: "Please enter a valid URL (e.g., https://example.com).", variant: "destructive" });
          return;
        }

        setFormLoading(true);
        let success = false;
        if (currentSite) {
          const result = await updateSite(currentSite.id, { name: siteName, url: siteUrl });
          if(result) {
            toast({ title: "Site Updated", description: `${siteName} has been updated.`, className: "bg-blue-600 text-white" });
            success = true;
          }
        } else {
          const result = await addSite({ name: siteName, url: siteUrl });
          if(result) {
            toast({ title: "Site Added", description: `${siteName} has been added.`, className: "bg-green-600 text-white" });
            success = true;
          }
        }
        setFormLoading(false);
        if (success) {
          closeForm();
        }
      };

      const handleDeleteSite = async (siteId, siteNameText) => {
        setFormLoading(true);
        const success = await deleteSite(siteId);
        setFormLoading(false);
        if (success) {
          toast({ title: "Site Deleted", description: `The site "${siteNameText}" has been removed.`, className: "bg-red-600 text-white" });
        }
      };

      if (!isAdmin) {
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-grow flex flex-col items-center justify-center p-8 glassmorphism rounded-lg shadow-2xl border border-primary/30 max-w-md mx-auto"
          >
            <ShieldAlert className="w-20 h-20 text-primary mb-6" />
            <h1 className="text-3xl font-bold mb-4 gradient-text">Admin Access Required</h1>
            <p className="text-muted-foreground mb-8 text-center">
              Please log in with your admin credentials to manage anime sites.
            </p>
            <form onSubmit={handleLogin} className="w-full space-y-6">
              <div>
                <Label htmlFor="email" className="text-foreground">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-admin-email@example.com"
                  required
                  className="mt-1 bg-background/70 border-primary/50 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-3">
                <LogIn className="w-5 h-5 mr-2" /> Log In
              </Button>
            </form>
          </motion.div>
        );
      }

      return (
        <div className="flex-grow p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-border"
          >
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4 sm:mb-0">Admin Dashboard</h1>
            <div className="flex gap-3">
              <Dialog open={isFormOpen} onOpenChange={(isOpen) => !isOpen && closeForm()}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => openForm()} disabled={formLoading}>
                    <PlusCircle className="w-5 h-5 mr-2" /> Add New Site
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glassmorphism border-primary">
                  <DialogHeader>
                    <DialogTitle className="gradient-text text-2xl">{currentSite ? 'Edit Anime Site' : 'Add New Anime Site'}</DialogTitle>
                    <DialogDescription>
                      {currentSite ? 'Update the details for this anime site.' : 'Enter the details for the new anime site.'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitSite} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right text-foreground">
                        Name
                      </Label>
                      <Input id="name" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="col-span-3 bg-background/70 border-primary/50" placeholder="e.g., Crunchyroll" disabled={formLoading} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="url" className="text-right text-foreground">
                        URL
                      </Label>
                      <Input id="url" type="url" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className="col-span-3 bg-background/70 border-primary/50" placeholder="https://www.crunchyroll.com" disabled={formLoading} />
                    </div>
                     <DialogFooter>
                       <DialogClose asChild>
                          <Button type="button" variant="outline" disabled={formLoading}>Cancel</Button>
                       </DialogClose>
                       <Button type="submit" className="bg-gradient-to-r from-primary to-secondary" disabled={formLoading}>
                         {formLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                         {currentSite ? 'Save Changes' : 'Add Site'}
                       </Button>
                     </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button onClick={handleLogout} variant="destructive" disabled={formLoading}>
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </Button>
            </div>
          </motion.div>

          {sitesLoading ? (
             <div className="flex flex-col items-center justify-center p-10">
              <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
              <p className="text-xl text-foreground">Loading Sites...</p>
            </div>
          ) : sites.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg shadow-lg glassmorphism"
            >
              <ListOrdered className="w-16 h-16 mx-auto mb-4 text-primary" />
              <p className="text-xl font-semibold text-foreground mb-2">No Anime Sites Added Yet</p>
              <p className="text-muted-foreground">Click "Add New Site" to start building your list.</p>
            </motion.div>
          ) : (
            <motion.ul
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
            >
              <AnimatePresence>
                {sites.map((site) => (
                  <motion.li
                    key={site.id}
                    layout
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                    className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg shadow-md glassmorphism border border-border hover:border-primary transition-colors"
                  >
                    <div className="mb-3 sm:mb-0 overflow-hidden">
                      <h3 className="text-lg font-semibold text-primary">{site.name}</h3>
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline truncate max-w-xs block">
                        {site.url}
                      </a>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openForm(site)} className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white" disabled={formLoading}>
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" disabled={formLoading}>
                            {formLoading && currentSite?.id === site.id ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Trash2 className="w-4 h-4 mr-1" />}
                             Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glassmorphism border-destructive">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-destructive-foreground">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the anime site "{site.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={formLoading}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteSite(site.id, site.name)} className="bg-destructive hover:bg-destructive/90" disabled={formLoading}>
                               {formLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                              Yes, delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      );
    };

    export default AdminPage;