import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type AutocompleteProps = {
  data: { value: (string | undefined)[]; label: string | undefined }[];
  selectedValue: string | undefined;
  onSelect: (value: string | undefined) => void;
  label: string;
  placeholder: string;
  isModal?: boolean;
  error?: string;
};

function Autocomplete({
  data,
  selectedValue,
  onSelect,
  label,
  placeholder,
  isModal = false,
  error,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]); // Update lebar setiap kali popover dibuka

  return (
    <div className="relative flex flex-col gap-1">
      <Popover open={open} onOpenChange={setOpen} modal={isModal}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between overflow-clip"
          >
            {selectedValue
              ? data.find((item) => item.value[0] === selectedValue)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: triggerWidth ? `${triggerWidth}px` : "auto" }}
        >
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />
            <CommandList>
              <CommandEmpty>No {label} found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value[0]}
                    value={item.value[1]}
                    onSelect={() => {
                      onSelect(item.value[0]);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === item.value[0]
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default Autocomplete;