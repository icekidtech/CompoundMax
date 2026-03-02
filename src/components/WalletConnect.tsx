import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, Copy, LogOut, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * WalletConnect Component
 * Custom wallet connection UI using Wagmi v3 hooks
 * Displays connect button or account info with dropdown menu
 */
export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openExplorer = () => {
    if (address) {
      window.open(`https://explorer-testnet.somnia.network/address/${address}`, "_blank");
    }
  };

  if (!isConnected || !address) {
    // Show connect button
    const metamaskConnector = connectors.find((c) => c.id === "metaMask");
    const injectedConnector = connectors.find((c) => c.id === "injected");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Select Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {metamaskConnector && (
            <DropdownMenuItem
              onClick={() => connect({ connector: metamaskConnector })}
              className="cursor-pointer"
            >
              <span className="mr-2">🦊</span> MetaMask
            </DropdownMenuItem>
          )}
          {injectedConnector && injectedConnector.id !== "metaMask" && (
            <DropdownMenuItem
              onClick={() => connect({ connector: injectedConnector })}
              className="cursor-pointer"
            >
              <span className="mr-2">💳</span> Injected Wallet
            </DropdownMenuItem>
          )}
          {connectors.map(
            (connector) =>
              connector.id !== "metaMask" &&
              connector.id !== "injected" && (
                <DropdownMenuItem
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="cursor-pointer capitalize"
                >
                  <span className="mr-2">🔗</span> {connector.name}
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Show connected account info with dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 font-mono">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">{address.slice(0, 6)}...{address.slice(-4)}</span>
          <span className="sm:hidden">Connected</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Connected Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="font-mono text-xs text-muted-foreground">
          {address}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer gap-2">
          <Copy className="h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openExplorer} className="cursor-pointer gap-2">
          <ExternalLink className="h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()} className="cursor-pointer gap-2 text-destructive">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
