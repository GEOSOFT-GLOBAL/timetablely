import * as React from "react";
import SectionHeader from "@/components/section-header";
import BlockItem from "@/components/block-item";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDatabaseStore } from "@/store/databaseStore";
import { BanIcon } from "lucide-react";

interface BlocksProps {
  propName?: string;
}

const Blocks: React.FC<BlocksProps> = () => {
  const { database, setDatabase } = useDatabaseStore();
  const [blockType, setBlockType] = React.useState<"slot" | "text">("text");
  const [blockValue, setBlockValue] = React.useState("");

  const addBlock = () => {
    if (!blockValue.trim()) return;

    if (blockType === "slot") {
      if (database.blockedSlots.includes(blockValue.trim())) return;
      setDatabase({
        ...database,
        blockedSlots: [...database.blockedSlots, blockValue.trim()],
      });
    } else {
      if (database.blockedTexts.includes(blockValue.trim())) return;
      setDatabase({
        ...database,
        blockedTexts: [...database.blockedTexts, blockValue.trim()],
      });
    }

    setBlockValue("");
  };

  const removeBlockedSlot = (slot: string) => {
    setDatabase({
      ...database,
      blockedSlots: database.blockedSlots.filter((s) => s !== slot),
    });
  };

  const removeBlockedText = (text: string) => {
    setDatabase({
      ...database,
      blockedTexts: database.blockedTexts.filter((t) => t !== text),
    });
  };

  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 md:gap-6">
        <Card className="">
          <div className="p-4 flex flex-col gap-4">
            <Label htmlFor="blockType">Block Type</Label>
            <Select
              value={blockType}
              onValueChange={(value) => setBlockType(value as "slot" | "text")}
            >
              <SelectTrigger id="blockType" className="w-full">
                <SelectValue placeholder="Select block type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Blocked Text</SelectItem>
                <SelectItem value="slot">Blocked Slot</SelectItem>
              </SelectContent>
            </Select>

            <Label htmlFor="blockValue">
              {blockType === "slot" ? "Slot Identifier" : "Text to Block"}
            </Label>
            <Input
              id="blockValue"
              value={blockValue}
              onChange={(e) => setBlockValue(e.target.value)}
              placeholder={
                blockType === "slot"
                  ? "e.g., 1-3 (row-col)"
                  : "e.g., Break, Devotion, Lunch"
              }
            />

            <div className="text-sm text-muted-foreground">
              {blockType === "slot" ? (
                <p>
                  Blocked slots are specific time slots that should be avoided
                  (e.g., breaks, lunch). Use format: row-col (e.g., 1-3)
                </p>
              ) : (
                <p>
                  Blocked texts are labels to avoid when auto-generating
                  timetables (e.g., Break, Devotion, Lunch)
                </p>
              )}
            </div>
          </div>
          <CardFooter className="gap-4">
            <Button variant="outline" onClick={addBlock}>
              Add Block
            </Button>
            <Button variant="outline" onClick={() => setBlockValue("")}>
              Cancel
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full h-[calc(100vh-220px)] flex flex-col px-4 overflow-y-auto">
          <div className="py-4">
            <h3 className="text-sm font-semibold mb-2">Blocked Texts</h3>
            {database.blockedTexts.length === 0 ? (
              <p className="text-sm text-muted-foreground mb-4">
                No blocked texts
              </p>
            ) : (
              database.blockedTexts.map((text) => (
                <BlockItem
                  key={text}
                  text={text}
                  type="text"
                  onRemove={removeBlockedText}
                />
              ))
            )}

            <h3 className="text-sm font-semibold mt-6 mb-2">Blocked Slots</h3>
            {database.blockedSlots.length === 0 ? (
              <p className="text-sm text-muted-foreground">No blocked slots</p>
            ) : (
              database.blockedSlots.map((slot) => (
                <BlockItem
                  key={slot}
                  text={slot}
                  type="slot"
                  onRemove={removeBlockedSlot}
                />
              ))
            )}
          </div>

          {database.blockedTexts.length === 0 &&
            database.blockedSlots.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                <BanIcon className="size-12 opacity-20" />
                <p>No blocks added yet</p>
              </div>
            )}
        </Card>
      </div>
    </div>
  );
};

export default Blocks;
