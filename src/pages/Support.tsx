import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Github, MessageSquare, FileText, AlertTriangle } from "lucide-react";

export default function Support() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({ title: "Message sent!", description: "We'll get back to you soon" });
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container space-y-12 max-w-3xl">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Support & Help</h1>
          <p className="text-lg text-muted-foreground">
            Get help with CompoundMax. We're here to support you.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: FileText,
              title: "Documentation",
              desc: "Read our comprehensive guides",
              href: "/docs",
            },
            {
              icon: Github,
              title: "GitHub",
              desc: "View source code & issues",
              href: "https://github.com/icekidtech/compound-max",
            },
            {
              icon: MessageSquare,
              title: "Discord Community",
              desc: "Chat with other users",
              href: "#",
            },
            {
              icon: Mail,
              title: "Email Support",
              desc: "Send us a detailed message",
              href: "#contact",
            },
          ].map((link) => (
            <a key={link.title} href={link.href} className="group">
              <Card className="glass hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <link.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">{link.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                q: "How long does deployment take?",
                a: "Deployment typically takes 1-2 minutes. You'll see confirmation on-chain.",
              },
              {
                q: "What if a compound fails?",
                a: "Failed compounds are retried. Check the event log for details. Contact support if issues persist.",
              },
              {
                q: "Can I modify a handler after deployment?",
                a: "Yes, you can update threshold, vault, and other settings from the monitor page.",
              },
              {
                q: "How do I withdraw my funds?",
                a: "Pause the handler first, then withdraw directly from the vault contract.",
              },
              {
                q: "What happens if the RPC goes down?",
                a: "Handlers are deployed on-chain and work independently. RPC issues only affect monitoring.",
              },
              {
                q: "How is CompoundMax funded?",
                a: "CompoundMax is open source and community-driven. No token, no fees.",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="glass" id="contact">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Have a question or feedback? We'd love to hear from you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Tell us how we can help..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="glass border-yellow-500/20 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Wallet won't connect?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Make sure you're on Somnia Testnet (Chain ID: 50312)</li>
                <li>Try refreshing the page</li>
                <li>Clear your browser cache and cookies</li>
                <li>Try a different wallet or browser extension</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Deployment transaction failed?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Check you have enough gas (STT) for the transaction</li>
                <li>Verify all input addresses are correct</li>
                <li>Try increasing gas price in settings</li>
                <li>Contact support with your transaction hash</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Handler not compounding?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Check reward balance hasn't reached threshold yet</li>
                <li>Verify handler is not paused</li>
                <li>Check event log for errors</li>
                <li>Ensure vault address is correct</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Community */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Join Our Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Connect with other CompoundMax users, share strategies, and get real-time support from our community.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Discord
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Telegram
              </Button>
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub Discussions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
