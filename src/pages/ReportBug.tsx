import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Bug, AlertTriangle, Info } from "lucide-react";

export default function ReportBug() {
  const { toast } = useToast();
  const { address } = useAccount();
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !email) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    const bugReport = {
      title,
      severity,
      description,
      steps: steps || "Not provided",
      email,
      walletAddress: address || "Not connected",
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.log("Bug Report:", bugReport);
    
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Bug report submitted!",
      description: "Thank you for helping us improve CompoundMax. We'll investigate ASAP.",
    });

    // Reset form
    setTitle("");
    setSeverity("medium");
    setDescription("");
    setSteps("");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container space-y-8 max-w-2xl">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bug className="h-8 w-8 text-destructive" />
            Report a Bug
          </h1>
          <p className="text-muted-foreground">
            Found an issue? Help us fix it. Please provide as much detail as possible.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="glass border-blue-500/20 bg-blue-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Before reporting</h4>
                  <p className="text-xs text-muted-foreground">
                    Check the FAQ and troubleshooting guide. Your issue might already be documented.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-green-500/20 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Security issues</h4>
                  <p className="text-xs text-muted-foreground">
                    Found a security vulnerability? Email security@compoundmax.dev instead.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bug Report Form */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Submit Bug Report</CardTitle>
            <CardDescription>Tell us what went wrong so we can fix it</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Bug Title *</label>
                <Input
                  placeholder="Brief summary of the bug"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Be specific, e.g., "Deploy button not responding on Firefox"
                </p>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity Level</label>
                <Select value={severity} onValueChange={setSeverity} disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">
                      🔴 Critical (App crashes, funds at risk)
                    </SelectItem>
                    <SelectItem value="high">
                      🟠 High (Major feature broken)
                    </SelectItem>
                    <SelectItem value="medium">
                      🟡 Medium (Feature works incorrectly)
                    </SelectItem>
                    <SelectItem value="low">
                      🟢 Low (Minor issue or cosmetic)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Describe the bug in detail. What were you doing? What happened?"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Include error messages if any
                </p>
              </div>

              {/* Steps to Reproduce */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Steps to Reproduce</label>
                <Textarea
                  placeholder="1. Click X&#10;2. Enter Y&#10;3. Observe bug&#10;(Leave blank if not applicable)"
                  rows={3}
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  Help us reproduce the issue
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  We'll use this to follow up if we need more information
                </p>
              </div>

              {/* Wallet Info (if connected) */}
              {address && (
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Connected Wallet (optional context)</p>
                  <p className="text-sm font-mono break-all">{address}</p>
                </div>
              )}

              {/* System Info Notice */}
              <div className="p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground">
                <p className="font-semibold mb-1">We'll also collect:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Browser and OS information for debugging</li>
                  <li>Current page URL</li>
                  <li>Connected wallet address (if applicable)</li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Bug Report"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Common Issues & Solutions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Wallet not detected",
                solution: "Make sure MetaMask or your wallet extension is installed and enabled",
              },
              {
                title: "Transaction keeps failing",
                solution: "Check gas balance, network is correct (Somnia Testnet 50312), and contract addresses are valid",
              },
              {
                title: "UI looks broken/glitchy",
                solution: "Try clearing browser cache, refreshing page, or using a different browser",
              },
              {
                title: "Handler deployed but not appearing",
                solution: "Wait 1-2 minutes for blockchain confirmation, then refresh. Check contract deployment on explorer",
              },
              {
                title: "Can't see my handlers",
                solution: "Make sure you're on the correct wallet account. Handlers are account-specific",
              },
            ].map((issue, i) => (
              <div key={i} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold text-sm mb-1">{issue.title}</h4>
                <p className="text-sm text-muted-foreground">{issue.solution}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Support Options */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Other Ways to Get Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you prefer other communication channels:
            </p>
            <div className="space-y-2">
              <div>
                <p className="font-semibold text-sm">GitHub Issues</p>
                <p className="text-xs text-muted-foreground">Report bugs on our public GitHub repository</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Discord Community</p>
                <p className="text-xs text-muted-foreground">Chat with developers and get real-time support</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Email Support</p>
                <p className="text-xs text-muted-foreground">support@compoundmax.dev</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
