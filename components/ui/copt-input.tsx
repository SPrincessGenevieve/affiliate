import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyInputProps {
  full_link: string; // e.g. full URL
}

export default function CopyInput({ full_link }: CopyInputProps) {
  // Extract code from the full_link
  const code = new URL(full_link).searchParams.get("code") || "";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(full_link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <Input
        value={code}
        readOnly
        className={cn(
          "w-full transition-colors duration-300",
          copied ? "border-[#2E5257] ring-1 ring-[#2E5257]" : ""
        )}
      />
      <Button
        onClick={handleCopy}
        size="icon"
        variant={copied ? "default" : "outline"}
        className={cn(
          "transition-colors duration-300",
          copied && "bg-[#2E5257] text-white"
        )}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );
}
