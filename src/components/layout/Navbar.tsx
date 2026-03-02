import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import { useChainId, useSwitchChain } from "wagmi";
import { SUPPORTED_CHAINS } from "@/config/wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Deploy", path: "/deploy" },
  { label: "Docs", path: "/docs" },
  { label: "About", path: "/about" },
  { label: "Settings", path: "/settings" },
  { label: "Support", path: "/support" },
  { label: "Report Bug", path: "/report-bug" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const currentChain = SUPPORTED_CHAINS.find((c) => c.id === chainId) ?? SUPPORTED_CHAINS[0];

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center glow-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight hidden sm:inline">
            Compound<span className="text-gradient">Max</span>
          </span>
        </Link>

        {/* Center Nav - Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Network Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5">
                <span className="text-xs">{currentChain.icon}</span>
                <span className="text-xs hidden sm:inline">{currentChain.name}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {SUPPORTED_CHAINS.map((chain) => (
                <DropdownMenuItem
                  key={chain.id}
                  onClick={() => switchChain?.({ chainId: chain.id })}
                  className="gap-2 cursor-pointer"
                >
                  <span>{chain.icon}</span>
                  <span>{chain.name}</span>
                  {chain.id === chainId && <Check className="h-3 w-3 ml-auto text-green-500" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Connect Button */}
          <WalletConnect />

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <nav className="container py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
