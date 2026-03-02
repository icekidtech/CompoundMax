import { useState, useCallback } from "react";

/**
 * Mock Uniswap LP Farming Hook
 * For testing CompoundMax with mock yield farm data
 * In production, this would interact with actual contracts
 */

export interface YieldFarmPool {
  id: string;
  name: string;
  pair: string;
  tvl: string;
  apy: number;
  rewardToken: string;
  rewardTokenAddress: string;
  vaultAddress: string;
  minStake: string;
}

export interface UserStakeInfo {
  stakedAmount: string;
  pendingRewards: string;
  earnedToDate: string;
  lastHarvest?: number;
  apy: number;
}

export interface UseYieldFarmReturn {
  pools: YieldFarmPool[];
  userStakes: Record<string, UserStakeInfo>;
  isLoading: boolean;
  stake: (poolId: string, amount: string) => Promise<boolean>;
  unstake: (poolId: string, amount: string) => Promise<boolean>;
  harvest: (poolId: string) => Promise<boolean>;
  updateRewards: () => void;
}

/**
 * Hook to interact with mock Uniswap LP farming pools
 */
export function useYieldFarm(): UseYieldFarmReturn {
  // Mock pools - in production these would come from an API
  const [pools] = useState<YieldFarmPool[]>([
    {
      id: "uniswap-eth-usdc",
      name: "ETH / USDC",
      pair: "WETH-USDC",
      tvl: "$2.5M",
      apy: 15.5,
      rewardToken: "UNI",
      rewardTokenAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      vaultAddress: "0x39d6ba1e62e06d1ec6a6d9d03dc1e70c84e9a24e",
      minStake: "0.01",
    },
    {
      id: "uniswap-eth-dai",
      name: "ETH / DAI",
      pair: "WETH-DAI",
      tvl: "$1.8M",
      apy: 12.3,
      rewardToken: "UNI",
      rewardTokenAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      vaultAddress: "0x4d96c7873c9e5999c6f25f2d778073d7e7e6e3e6",
      minStake: "50",
    },
    {
      id: "uniswap-usdc-usdt",
      name: "USDC / USDT",
      pair: "USDC-USDT",
      tvl: "$3.2M",
      apy: 8.7,
      rewardToken: "UNI",
      rewardTokenAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      vaultAddress: "0x7f8c4fef3e91df3b4b5f8c4d9e0c1a2b3c4d5e6f",
      minStake: "500",
    },
  ]);

  const [userStakes, setUserStakes] = useState<Record<string, UserStakeInfo>>({
    "uniswap-eth-usdc": {
      stakedAmount: "5.5",
      pendingRewards: "0.342",
      earnedToDate: "2.156",
      lastHarvest: Date.now() - 86400000,
      apy: 15.5,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simulate reward accumulation
  const updateRewards = useCallback(() => {
    setUserStakes((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((poolId) => {
        const stake = updated[poolId];
        const dailyReward = (parseFloat(stake.stakedAmount) * (stake.apy / 100)) / 365;
        stake.pendingRewards = (parseFloat(stake.pendingRewards) + dailyReward).toFixed(6);
      });
      return updated;
    });
  }, []);

  // Simulate staking
  const stake = useCallback(async (poolId: string, amount: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUserStakes((prev) => ({
        ...prev,
        [poolId]: {
          stakedAmount: (parseFloat(prev[poolId]?.stakedAmount || "0") + parseFloat(amount)).toFixed(6),
          pendingRewards: prev[poolId]?.pendingRewards || "0",
          earnedToDate: prev[poolId]?.earnedToDate || "0",
          apy: prev[poolId]?.apy || 0,
        },
      }));

      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Simulate unstaking
  const unstake = useCallback(async (poolId: string, amount: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUserStakes((prev) => {
        const poolStake = prev[poolId];
        if (!poolStake) return prev;

        const newAmount = Math.max(0, parseFloat(poolStake.stakedAmount) - parseFloat(amount));

        if (newAmount === 0) {
          const updated = { ...prev };
          delete updated[poolId];
          return updated;
        }

        return {
          ...prev,
          [poolId]: {
            ...poolStake,
            stakedAmount: newAmount.toFixed(6),
          },
        };
      });

      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Simulate harvesting rewards
  const harvest = useCallback(async (poolId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUserStakes((prev) => {
        const poolStake = prev[poolId];
        if (!poolStake) return prev;

        return {
          ...prev,
          [poolId]: {
            ...poolStake,
            earnedToDate: (parseFloat(poolStake.earnedToDate) + parseFloat(poolStake.pendingRewards)).toFixed(6),
            pendingRewards: "0",
            lastHarvest: Date.now(),
          },
        };
      });

      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    pools,
    userStakes,
    isLoading,
    stake,
    unstake,
    harvest,
    updateRewards,
  };
}
