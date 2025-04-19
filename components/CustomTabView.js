"use client";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export default function CustomTabView({ tabs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="items-center justify-center">
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        className="custom-tabview"
      >
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            header={
              <div
                className={`px-4 py-2 rounded-t-lg text-sm font-semibold transition-all ${
                  index === activeIndex
                    ? "bg-blue-500 text-white shadow border-b-2 border-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {tab.label}
              </div>
            }
          >
            <div className="p-4">{tab.content}</div>
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
}
