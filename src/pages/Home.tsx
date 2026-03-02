import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, TrendingUp, Lock, Gauge, Power, FileText } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Auto-Compound",
    description: "Automatically compound your yield farming rewards when thresholds are met",
  },
  {
    icon: TrendingUp,
    title: "Maximize Gains",
    description: "Reduce manual intervention and maximize compound interest returns",
  },
  {
    icon: Lock,
    title: "Secure & Audited",
    description: "Battle-tested smart contracts with security best practices",
  },
  {
    icon: Gauge,
    title: "Customizable",
    description: "Set your own thresholds and compounding strategies",
  },
  {
    icon: Power,
    title: "Multi-Chain",
    description: "Deploy handlers across Somnia and other EVM-compatible chains",
  },
  {
    icon: FileText,
    title: "Real-Time Monitoring",
    description: "Track compounds, yields, and fees with detailed analytics",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="container py-20 md:py-32 space-y-8">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <span className="text-xs font-medium text-primary">🌌 Powered by Somnia</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Automate Your Yield
            <span className="text-gradient"> Farming</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground">
            CompoundMax automatically compounds your rewards, maximizing gains while you sleep.
            Deploy reactive handlers on Somnia to automate DeFi strategies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2 group">
              Get Started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/docs")}>
              Read Docs
            </Button>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient">6</div>
            <div className="text-sm text-muted-foreground">Handler Types</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient">5+</div>
            <div className="text-sm text-muted-foreground">Supported Chains</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient">100%</div>
            <div className="text-sm text-muted-foreground">Gas Optimized</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Why CompoundMax?</h2>
          <p className="text-muted-foreground">
            Everything you need to automate yield farming and maximize returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="glass hover:glow-primary/10 transition-all p-6">
              <CardContent className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-20 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-muted-foreground">
            Simple steps to automate your yield farming strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: "1", title: "Connect Wallet", desc: "Link your wallet to get started" },
            { num: "2", title: "Configure Handler", desc: "Set thresholds and target vaults" },
            { num: "3", title: "Deploy Contract", desc: "Deploy to Somnia blockchain" },
            { num: "4", title: "Automate & Earn", desc: "Sit back and watch rewards compound" },
          ].map((step) => (
            <div key={step.num} className="relative">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {step.num}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
              {parseInt(step.num) < 4 && (
                <ArrowRight className="hidden md:block absolute top-5 -right-10 h-5 w-5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-32">
        <Card className="glass border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              Ready to Automate Your Yields?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Connect your wallet and deploy your first handler in minutes.
            </p>
            <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2026 CompoundMax. Powered by Somnia & Somnia React Autonomous SDK.
          </div>
          <div className="flex gap-4">
            <a href="/docs" className="text-sm hover:text-foreground transition-colors">Docs</a>
            <a href="/about" className="text-sm hover:text-foreground transition-colors">About</a>
            <a href="/support" className="text-sm hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
