import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Mail, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container space-y-12 max-w-3xl">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">About CompoundMax</h1>
          <p className="text-lg text-muted-foreground">
            Automating DeFi strategies for the next generation of yield farmers.
          </p>
        </div>

        {/* Mission */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              CompoundMax makes DeFi automation accessible to everyone. We believe yield farming
              should be seamless, secure, and profitable. Our platform leverages the power of
              Somnia's reactive smart contracts to automate yield compounding.
            </p>
            <p>
              By removing manual intervention and setting optimal compounding triggers, users can
              maximize returns while minimizing gas costs and complexity.
            </p>
          </CardContent>
        </Card>

        {/* How It Started */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>How It Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              CompoundMax was built by yield farming enthusiasts who experienced the pain of
              manual compounding optimization. We discovered Somnia's reactive handler framework
              and realized we could build a better solution.
            </p>
            <p>
              Today, CompoundMax serves as a bridge between DeFi users and advanced automation
              on the Somnia blockchain, making reactive smart contracts practical and accessible.
            </p>
          </CardContent>
        </Card>

        {/* Technology */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "React 18", desc: "UI Library" },
                { name: "TypeScript", desc: "Type Safety" },
                { name: "Wagmi v3", desc: "Web3 Hooks" },
                { name: "Viem", desc: "Ethereum Client" },
                { name: "Tailwind CSS", desc: "Styling" },
                { name: "Somnia SDK", desc: "Smart Contracts" },
              ].map((tech) => (
                <div key={tech.name} className="p-3 bg-secondary/50 rounded-lg">
                  <div className="font-semibold text-sm">{tech.name}</div>
                  <div className="text-xs text-muted-foreground">{tech.desc}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Handler Types", value: "6" },
            { label: "Supported Chains", value: "5+" },
            { label: "Test Coverage", value: "85%+" },
          ].map((stat) => (
            <Card key={stat.label} className="glass">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Security First",
                  desc: "Every line of code is reviewed. User funds are protected with battle-tested patterns.",
                },
                {
                  title: "Transparency",
                  desc: "Open source codebase. Audit reports and security disclosures published openly.",
                },
                {
                  title: "User-Centric",
                  desc: "Built for users, not token holders. Gas costs are optimized, UI is intuitive.",
                },
                {
                  title: "Innovation",
                  desc: "Pushing the boundaries of what's possible with reactive smart contracts.",
                },
              ].map((value) => (
                <div key={value.title}>
                  <h4 className="font-semibold mb-1">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connect */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Community
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* License */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">License & Attribution</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              CompoundMax is built on top of @somnia-react/autonomous SDK, which provides the foundation
              for secure reactive smart contract handlers.
            </p>
            <p>
              Licensed under MIT. See LICENSE file for details.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
