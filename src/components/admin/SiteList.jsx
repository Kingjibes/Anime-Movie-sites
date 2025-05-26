import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
    import { Edit, Trash2, ListOrdered, Loader2 } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const SiteList = ({ sites, onEdit, onDelete, siteTypeLabel, loading, formBusyState }) => {
      const { toast } = useToast();
      const [deletingId, setDeletingId] = useState(null);

      const handleDelete = async (siteId, siteName) => {
        setDeletingId(siteId);
        const success = await onDelete(siteId);
        if (success) {
          toast({ title: `${siteTypeLabel} Deleted`, description: `The ${siteTypeLabel.toLowerCase()} "${siteName}" has been removed.`, className: "bg-red-600 text-white" });
        }
        setDeletingId(null);
      };

      if (loading) {
        return (
          <div className="flex flex-col items-center justify-center p-10">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-lg text-foreground">Loading {siteTypeLabel}s...</p>
          </div>
        );
      }

      if (sites.length === 0) {
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg shadow-lg glassmorphism mt-6"
          >
            <ListOrdered className="w-16 h-16 mx-auto mb-4 text-primary" />
            <p className="text-xl font-semibold text-foreground mb-2">No {siteTypeLabel}s Added Yet</p>
            <p className="text-muted-foreground">Click "Add New {siteTypeLabel}" to start building your list.</p>
          </motion.div>
        );
      }

      return (
        <motion.ul
          className="space-y-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.07 } }}
        >
          <AnimatePresence>
            {sites.map((site) => (
              <motion.li
                key={site.id}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30, transition: { duration: 0.25 } }}
                className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg shadow-md glassmorphism border border-border hover:border-primary/70 transition-colors duration-200"
              >
                <div className="mb-3 sm:mb-0 overflow-hidden flex-grow">
                  <h3 className="text-lg font-semibold text-primary">{site.name}</h3>
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline truncate max-w-xs md:max-w-md lg:max-w-lg block">
                    {site.url}
                  </a>
                  {site.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{site.description}</p>}
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => onEdit(site)} className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white" disabled={formBusyState || deletingId === site.id}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" disabled={formBusyState || deletingId === site.id}>
                        {deletingId === site.id ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Trash2 className="w-4 h-4 mr-1" />}
                         Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="glassmorphism border-destructive">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-destructive-foreground">Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the {siteTypeLabel.toLowerCase()} "{site.name}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={deletingId === site.id}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(site.id, site.name)} className="bg-destructive hover:bg-destructive/90" disabled={deletingId === site.id}>
                           {deletingId === site.id ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
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
      );
    };

    export default SiteList;