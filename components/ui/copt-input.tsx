import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react"; // icons
import { cn } from "@/lib/utils"; // if you're using ShadCN's `cn` utility

interface CopyInput {
  copy_value: string;
}

export default function CopyInput({ copy_value }: CopyInput) {
  const [value, setValue] = useState(copy_value);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // reset after 1.5s
    });
  };

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <Input
        value={value}
        readOnly
        className={cn(
          "w-[100%] transition-colors duration-300",
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
