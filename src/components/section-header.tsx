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
      <div className="flex w-full justify-between items-center">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </div>
        <div className="gap-5 flex">
          <Button>Auto Generate</Button>
          <Button onClick={() => setDatabase(sampleDatabase)}>
            Load Sample Data
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SectionHeader;
