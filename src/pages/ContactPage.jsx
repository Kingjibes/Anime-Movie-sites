
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Phone, Mail, MessageCircle } from 'lucide-react';

    const ContactPage = () => {
      const contactDetails = {
        whatsapp: "https://wa.me/+233557488116",
        email: "richvybs92@gmail.com" 
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.2,
            duration: 0.5,
            ease: "easeOut"
          },
        }),
      };

      return (
        <div className="flex-grow flex flex-col items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Orbitron', sans-serif" }}>Get In Touch</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Have questions, suggestions, or just want to say hi? Reach out through any of the channels below. We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <motion.custom
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="w-full"
            >
              <Card className="h-full shadow-xl hover:shadow-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 glassmorphism border-primary/30 hover:border-primary">
                <CardHeader className="items-center text-center">
                  <MessageCircle className="w-12 h-12 text-primary mb-3" />
                  <CardTitle className="text-2xl gradient-text">WhatsApp</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    For quick chats and support, message us on WhatsApp.
                  </p>
                  <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white animate-pulse-glow">
                    <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer">
                      <Phone className="w-5 h-5 mr-2" /> Chat Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.custom>

            <motion.custom
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="w-full"
            >
              <Card className="h-full shadow-xl hover:shadow-secondary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 glassmorphism border-secondary/30 hover:border-secondary">
                <CardHeader className="items-center text-center">
                  <Mail className="w-12 h-12 text-secondary mb-3" />
                  <CardTitle className="text-2xl gradient-text">Email</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Prefer email? Send your inquiries to Hackerpro.
                  </p>
                  <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    <a href={`mailto:${contactDetails.email}`}>
                      <Mail className="w-5 h-5 mr-2" /> Send Email
                    </a>
                  </Button>
                   <p className="text-xs text-muted-foreground mt-3 break-all">{contactDetails.email}</p>
                </CardContent>
              </Card>
            </motion.custom>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 text-center"
          >
             <img  
                className="w-64 h-auto mx-auto rounded-lg shadow-lg border-2 border-primary" 
                alt="Stylized anime character pointing towards contact info"
               src="https://images.unsplash.com/photo-1675650778156-c4ef79dfb4ca" />
            <p className="text-foreground text-md mt-4">We're always excited to connect with fellow anime enthusiasts!</p>
          </motion.div>
        </div>
      );
    };

    export default ContactPage;
  