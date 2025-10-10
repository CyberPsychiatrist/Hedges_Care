import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, AlertCircle, Wallet, Leaf, TreePine, Zap } from "lucide-react";
import { PlantNFT, MintingRequest } from "@/types/nft";
import { nftService } from "@/services/nftService";
import { useAuth } from "@/components/AuthProvider";

interface NFTMintingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantData: any;
}

export const NFTMintingModal: React.FC<NFTMintingModalProps> = ({ isOpen, onClose, plantData }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState<PlantNFT | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [mintingStep, setMintingStep] = useState<'idle' | 'connecting' | 'confirming' | 'minting' | 'completed'>('idle');
  const [estimatedGas, setEstimatedGas] = useState(0.002);
  const [estimatedCost, setEstimatedCost] = useState(0.01);

  // Reset state when modal closes
  const resetState = () => {
    setIsMinting(false);
    setMintedNFT(null);
    setWalletAddress("");
    setMintingStep('idle');
    setEstimatedGas(0.002);
    setEstimatedCost(0.01);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500 text-white';
      case 'epic': return 'bg-purple-600 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'uncommon': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Zap className="h-4 w-4" />;
      case 'epic': return <Zap className="h-4 w-4" />;
      case 'rare': return <TreePine className="h-4 w-4" />;
      case 'uncommon': return <Leaf className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  const calculateEstimatedCost = () => {
    // Mock calculation based on plant CO2 absorption
    const co2Absorption = plantData.co2_absorption?.annual || 10;
    const baseCost = 0.01;
    const co2Bonus = Math.min(co2Absorption * 0.0005, 0.1);
    setEstimatedCost(baseCost + co2Bonus);
    setEstimatedGas(0.002 + (co2Absorption * 0.00002));
  };

  const handleMint = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to mint NFTs.",
      });
      return;
    }

    if (!walletAddress) {
      toast({
        variant: "destructive",
        title: "Wallet Address Required",
        description: "Please enter your wallet address.",
      });
      return;
    }

    setIsMinting(true);
    setMintingStep('connecting');

    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMintingStep('confirming');

      // Calculate estimated costs
      calculateEstimatedCost();

      // Simulate user confirmation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMintingStep('minting');

      // Mint the NFT
      const mintingRequest: MintingRequest = {
        plantData,
        userId: user.id,
        walletAddress
      };

      const result = await nftService.mintNFT(mintingRequest);

      if (result.success && result.nft) {
        setMintedNFT(result.nft);
        setMintingStep('completed');
        
        toast({
          title: "NFT Minted Successfully!",
          description: `Your ${result.nft.name} has been minted and added to your collection.`,
        });
      } else {
        throw new Error(result.error || "Failed to mint NFT");
      }
    } catch (error) {
      console.error("NFT minting error:", error);
      toast({
        variant: "destructive",
        title: "Minting Failed",
        description: error instanceof Error ? error.message : "An error occurred while minting your NFT.",
      });
      setMintingStep('idle');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-500" />
            Mint Plant NFT
          </DialogTitle>
          <DialogDescription>
            Convert your plant analysis into a unique NFT representing its environmental impact.
          </DialogDescription>
        </DialogHeader>

        {mintingStep === 'idle' && (
          <div className="space-y-6">
            {/* Plant Preview */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Plant Preview</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center">
                  <TreePine className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h5 className="font-medium text-green-900">{plantData.common_name}</h5>
                  <p className="text-sm text-green-700 italic">{plantData.species_name}</p>
                  <Badge variant="outline" className="mt-1 bg-green-100 text-green-800 border-green-300">
                    {plantData.plant_type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Environmental Impact</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-600">CO₂ Absorption (Annual)</p>
                  <p className="text-lg font-bold text-blue-800">
                    {plantData.co2_absorption?.annual.toFixed(1)} kg
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Environmental Impact</p>
                  <p className="text-sm text-blue-800">
                    {plantData.co2_absorption?.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Wallet Address</Label>
              <Input
                id="wallet-address"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                disabled={isMinting}
              />
              <p className="text-sm text-gray-500">
                Enter your Ethereum wallet address where the NFT will be sent.
              </p>
            </div>

            {/* Minting Cost */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-3">Minting Costs</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">Minting Fee</span>
                  <span className="text-sm font-medium text-amber-800">
                    {estimatedCost.toFixed(4)} ETH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">Gas Fee</span>
                  <span className="text-sm font-medium text-amber-800">
                    {estimatedGas.toFixed(4)} ETH
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium text-amber-800">Total</span>
                  <span className="text-sm font-bold text-amber-900">
                    {(estimatedCost + estimatedGas).toFixed(4)} ETH
                  </span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3">NFT Benefits</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  Proof of plant verification and environmental impact
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  Trade on NFT marketplaces
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  Contribute to environmental impact tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  Access to exclusive plant care communities
                </li>
              </ul>
            </div>
          </div>
        )}

        {mintingStep === 'connecting' && (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <h3 className="text-lg font-medium">Connecting to Wallet</h3>
            <p className="text-gray-500">Please approve the connection request in your wallet.</p>
          </div>
        )}

        {mintingStep === 'confirming' && (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Wallet className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium">Confirm Transaction</h3>
            <p className="text-gray-500">
              Please confirm the minting transaction in your wallet.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex justify-between">
                <span>Estimated Cost:</span>
                <span className="font-medium">{(estimatedCost + estimatedGas).toFixed(4)} ETH</span>
              </div>
            </div>
          </div>
        )}

        {mintingStep === 'minting' && (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <Loader2 className="h-12 w-12 text-green-500 animate-spin" />
            <h3 className="text-lg font-medium">Minting NFT</h3>
            <p className="text-gray-500">Your NFT is being created on the blockchain...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}

        {mintingStep === 'completed' && mintedNFT && (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-bold text-green-800">NFT Minted Successfully!</h3>
            <p className="text-gray-600">
              Your {mintedNFT.name} has been minted and sent to your wallet.
            </p>
            
            <div className="w-full max-w-sm p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-green-600">NFT Name</p>
                  <p className="font-medium text-green-800">{mintedNFT.name}</p>
                </div>
                <div>
                  <p className="text-sm text-green-600">Token ID</p>
                  <p className="font-mono text-green-800">{mintedNFT.tokenId}</p>
                </div>
                <div>
                  <p className="text-sm text-green-600">Rarity</p>
                  <Badge className={`${getRarityColor(mintedNFT.metadata.rarity)} border-0`}>
                    <div className="flex items-center gap-1">
                      {getRarityIcon(mintedNFT.metadata.rarity)}
                      <span className="capitalize">{mintedNFT.metadata.rarity}</span>
                    </div>
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-green-600">Sent to</p>
                  <p className="font-mono text-green-800 text-sm">{walletAddress}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {mintingStep !== 'completed' && (
            <Button variant="outline" onClick={handleClose} disabled={isMinting}>
              Cancel
            </Button>
          )}
          {mintingStep === 'idle' && (
            <Button onClick={handleMint} disabled={isMinting || !walletAddress}>
              {isMinting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing...
                </>
              ) : (
                <>
                  <Leaf className="mr-2 h-4 w-4" />
                  Mint NFT
                </>
              )}
            </Button>
          )}
          {mintingStep === 'completed' && (
            <Button onClick={handleClose}>
              View Collection
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NFTMintingModal;