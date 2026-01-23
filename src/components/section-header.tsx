import * as React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useDatabaseStore } from "@/store/databaseStore";
import { sampleDatabase } from "@/mock/load-data";

interface SectionHeaderProps {
  propName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = () => {
  const { setDatabase } = useDatabaseStore();

  return (
    <Card className="p-4 w-full flex">
      <div className="flex w-full flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Welcome to your dashboard!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Auto Generate</Button>
          <Button
            onClick={() => setDatabase(sampleDatabase)}
            className="w-full sm:w-auto"
          >
            Load Sample Data
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SectionHeader;
