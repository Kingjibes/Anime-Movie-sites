import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { useToast } from '@/components/ui/use-toast';
    import { Loader2 } from 'lucide-react';

    const SiteFormDialog = ({ isOpen, onOpenChange, currentSite, onSubmit, siteTypeLabel, formLoading }) => {
      const [name, setName] = useState('');
      const [url, setUrl] = useState('');
      const [description, setDescription] = useState('');
      const { toast } = useToast();

      useEffect(() => {
        if (currentSite) {
          setName(currentSite.name || '');
          setUrl(currentSite.url || '');
          setDescription(currentSite.description || '');
        } else {
          setName('');
          setUrl('');
          setDescription('');
        }
      }, [currentSite, isOpen]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !url.trim()) {
          toast({ title: "Validation Error", description: "Site name and URL cannot be empty.", variant: "destructive" });
          return;
        }
        try {
          new URL(url);
        } catch (_) {
          toast({ title: "Validation Error", description: "Please enter a valid URL (e.g., https://example.com).", variant: "destructive" });
          return;
        }
        
        await onSubmit({ name, url, description });
      };
      
      const handleClose = () => {
        if (!formLoading) {
          onOpenChange(false);
        }
      }

      return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-[480px] glassmorphism border-primary">
            <DialogHeader>
              <DialogTitle className="gradient-text text-2xl">{currentSite ? `Edit ${siteTypeLabel}` : `Add New ${siteTypeLabel}`}</DialogTitle>
              <DialogDescription>
                {currentSite ? `Update the details for this ${siteTypeLabel.toLowerCase()}.` : `Enter the details for the new ${siteTypeLabel.toLowerCase()}.`}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name-form" className="text-right text-foreground">
                  Name
                </Label>
                <Input id="name-form" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-background/70 border-primary/50" placeholder={`e.g., Awesome ${siteTypeLabel}`} disabled={formLoading} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url-form" className="text-right text-foreground">
                  URL
                </Label>
                <Input id="url-form" type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3 bg-background/70 border-primary/50" placeholder="https://example.com" disabled={formLoading} />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description-form" className="text-right text-foreground pt-2">
                  Description
                </Label>
                <Textarea id="description-form" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 bg-background/70 border-primary/50 min-h-[80px]" placeholder={`A brief description of the ${siteTypeLabel.toLowerCase()}.`} disabled={formLoading} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={formLoading}>Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-gradient-to-r from-primary to-secondary" disabled={formLoading}>
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {currentSite ? 'Save Changes' : `Add ${siteTypeLabel}`}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };
    
    export default SiteFormDialog;