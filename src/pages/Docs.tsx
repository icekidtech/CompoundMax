import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Zap, Shield, GitBranch, Eye } from "lucide-react";

const DOCS_SECTIONS = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Deploy your first handler in 5 minutes",
    content: `
1. Connect your wallet on Somnia Testnet
2. Navigate to Deploy page
3. Configure handler name, vault, and reward token
4. Set compound threshold (in USD)
5. Click Deploy and approve the transaction
6. Monitor your handler in real-time
    `,
  },
  {
    icon: Shield,
    title: "Security & Best Practices",
    description: "Keep your funds safe",
    content: `
- Always verify contract addresses before deploying
- Start with small amounts to test
- Set reasonable compound thresholds
- Review all transactions before approving
- Keep your wallet seed phrase secure
- Use hardware wallets for larger amounts
    `,
  },
  {
    icon: GitBranch,
    title: "Handler Types",
    description: "Available automation handlers",
    content: `
- AutoCompoundHandler: Automatically compounds vault rewards
- CronScheduler: Time-based task execution
- EventFilterThrottle: Rate-limits event processing
- LiquidationGuardian: Monitors liquidation risks
- CrossCallOrchestrator: Multi-step automation chains
- UpgradeableReactiveProxy: Future-proof handlers
    `,
  },
  {
    icon: Eye,
    title: "Monitoring",
    description: "Track your deployments",
    content: `
- View real-time reward balances
- Track compound event history
- Monitor total yield earned
- Check gas fees and efficiency
- Analyze ROI and returns
- Export reports for tax purposes
    `,
  },
];

export default function Docs() {
  return (
    <div className="min-h-screen py-20">
      <div className="container space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to use CompoundMax to automate your yield farming strategies.
          </p>
        </div>

        {/* Network Info */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Network Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Somnia Testnet</h4>
              <div className="space-y-1 text-sm font-mono text-muted-foreground">
                <div><strong>Chain ID:</strong> 50312</div>
                <div><strong>RPC URL:</strong> https://dream-rpc.somnia.network</div>
                <div><strong>Currency:</strong> STT (Somnia Test Token)</div>
                <div><strong>Explorer:</strong> https://explorer-testnet.somnia.network</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Docs Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DOCS_SECTIONS.map((section) => (
            <Card key={section.title} className="glass hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs overflow-auto bg-secondary/50 p-3 rounded-lg text-muted-foreground">
                  {section.content.trim()}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported Tokens */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Supported Test Tokens (Somnia Testnet)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { symbol: "WETH", address: "0x...", name: "Wrapped Ether" },
                { symbol: "USDC", address: "0x...", name: "USD Coin" },
                { symbol: "DAI", address: "0x...", name: "DAI Stablecoin" },
                { symbol: "USDT", address: "0x...", name: "Tether USD" },
              ].map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <div className="font-semibold">{token.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{token.symbol}</div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono break-all text-right">{token.address}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                q: "What is a compound handler?",
                a: "A smart contract that automatically compounds reward tokens when triggered, maximizing your yield farming returns.",
              },
              {
                q: "What's the compound threshold?",
                a: "The minimum amount of rewards that must accumulate before an automatic compound is triggered, helping reduce unnecessary gas fees.",
              },
              {
                q: "Is CompoundMax audited?",
                a: "The underlying Somnia Autonomous SDK is built with security best practices. Always review contracts before deploying.",
              },
              {
                q: "Can I pause my handler?",
                a: "Yes, you can pause/resume handlers anytime from the monitor page without losing configuration.",
              },
              {
                q: "What are the gas costs?",
                a: "Gas costs vary by network and transaction complexity. Somnia is optimized for low-cost operations.",
              },
            ].map((faq, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-semibold">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
