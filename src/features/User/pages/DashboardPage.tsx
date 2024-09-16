import * as React from "react";
import { HeaderSection, Card } from "~src/components";

export const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <HeaderSection
        title="Dashboard"
        variant="primary"
        desc="Welcome to the dashboard"
      />
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mt-6">Appointments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          
        </div>
      </div>
    </div>
  );
};
