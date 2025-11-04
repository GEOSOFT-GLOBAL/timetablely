import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as React from "react";

interface TutorsProps {
  propName?: string;
}

const Tutors: React.FC<TutorsProps> = () => {
  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className=" grid grid-cols-1 w-full gap-4 md:grid-cols-2 md:gap-6">
        <Card className="">
          <div className="p-4 flex flex-col gap-4">
            <Input />
            <Input />
          </div>
          <CardFooter className="gap-4">
            <Button variant="outline">Save</Button>
            <Button variant="outline">Cancel</Button>
          </CardFooter>
        </Card>
        <div>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export default Tutors;
