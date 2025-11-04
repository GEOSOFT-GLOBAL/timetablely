import { SectionCards } from "@/components/section-cards";
import SectionHeader from "@/components/section-header";
import TimeTable from "@/components/timetable";

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6 gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className="flex w-full gap-2 px-6">
        <div className="w-3/4">
          <TimeTable />
        </div>
        <div className="w-1/4">
          <SectionCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
