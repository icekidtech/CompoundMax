import { useState } from "react";
import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun, Settings, Bell, Eye, Lock } from "lucide-react";

export default function Settings() {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [transparency, setTransparency] = useState(false);
  const [gasMode, setGasMode] = useState("standard");
  const [rpcUrl, setRpcUrl] = useState("https://dream-rpc.somnia.network");

  const handleSaveSettings = () => {
    // Save to localStorage
    localStorage.setItem("compoundmax_theme", theme);
    localStorage.setItem("compoundmax_notifications", notifications.toString());
    localStorage.setItem("compoundmax_transparency", transparency.toString());
    localStorage.setItem("compoundmax_gasMode", gasMode);
    localStorage.setItem("compoundmax_rpcUrl", rpcUrl);

    toast({ title: "Settings saved successfully!" });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen py-20">
        <div className="container max-w-2xl">
          <Card className="glass">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">Please connect your wallet to access settings.</p>
              <Button onClick={() => window.location.href = "/dashboard"}>Go to Dashboard</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container space-y-8 max-w-2xl">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your CompoundMax experience</p>
        </div>

        {/* Account Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Connected Address</div>
              <div className="font-mono text-sm break-all">{address}</div>
            </div>
            <Button variant="outline" className="w-full">
              Disconnect Wallet
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how CompoundMax looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={theme}
                onValueChange={(value) => {
                  setTheme(value as typeof theme);
                  // Apply theme to HTML element
                  if (value === "light") {
                    document.documentElement.classList.add("light");
                  } else if (value === "dark") {
                    document.documentElement.classList.remove("light");
                  } else {
                    // System theme
                    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    if (isDark) {
                      document.documentElement.classList.remove("light");
                    } else {
                      document.documentElement.classList.add("light");
                    }
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Choose your preferred color scheme</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Data Transparency
              </Label>
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <input
                  type="checkbox"
                  checked={transparency}
                  onChange={(e) => setTransparency(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Show all contract interactions in logs</span>
              </div>
              <p className="text-xs text-muted-foreground">Enable detailed contract interaction visibility</p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </CardTitle>
            <CardDescription>Control how you're notified about important events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="rounded"
                />
                <label className="text-sm cursor-pointer">
                  Enable notifications
                </label>
              </div>
              <p className="text-xs text-muted-foreground">Get alerts for compounds, deployments, and errors</p>
            </div>

            <div className="space-y-2 p-3 bg-secondary/50 rounded-lg">
              <div className="text-sm font-semibold">Notification Types (when enabled)</div>
              <div className="space-y-2 mt-2">
                {["Handler Deployed", "Compound Executed", "Threshold Met", "Error Occurred"].map((notif) => (
                  <div key={notif} className="text-xs text-muted-foreground flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {notif}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Network Configuration
            </CardTitle>
            <CardDescription>Advanced network settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Gas Mode</Label>
              <Select value={gasMode} onValueChange={setGasMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy (Slowest)</SelectItem>
                  <SelectItem value="standard">Standard (Current)</SelectItem>
                  <SelectItem value="fast">Fast (Higher Cost)</SelectItem>
                  <SelectItem value="instant">Instant (Highest Cost)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Select transaction speed preference</p>
            </div>

            <div className="space-y-2">
              <Label>RPC Endpoint</Label>
              <Input
                value={rpcUrl}
                onChange={(e) => setRpcUrl(e.target.value)}
                placeholder="https://dream-rpc.somnia.network"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">Custom RPC endpoint (optional, uses default if empty)</p>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Data & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                All your settings and handler data are stored locally in your browser. We don't collect or store any personal information.
              </p>
              <Button variant="outline" className="w-full">
                Download Data Export
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => {
                if (confirm("Are you sure? This will delete all local data.")) {
                  localStorage.clear();
                  toast({ title: "All data cleared" });
                }
              }}>
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1" onClick={handleSaveSettings}>
            Save Settings
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => {
            setTheme("dark");
            setNotifications(true);
            setTransparency(false);
            setGasMode("standard");
            setRpcUrl("https://dream-rpc.somnia.network");
          }}>
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
}
