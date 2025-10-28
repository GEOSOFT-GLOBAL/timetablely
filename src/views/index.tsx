import SectionHeader from "@/components/section-header";
import * as React from "react";

interface DashboardProps {
  propName: type;
}

const Dashboard: React.FC<DashboardProps> = ({ propName }) => {
  return (
    <div className="w-full items-center flex">
      <SectionHeader />
    </div>
  );
};

export default Dashboard;
