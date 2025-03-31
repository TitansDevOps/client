"use client";
import { useState, useRef } from "react";

import SidebarC from "@/components/sidebar";

const SIDEBAR_TITLE = "Sidebar Title";

const SidebarExample = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      <SidebarC
        ref={sidebarRef}
        open={isSidebarOpen}
        onClose={handleClose}
        fullScreen={false}
        className="custom-sidebar"
        title={SIDEBAR_TITLE}
      >
        <div id="section-id">
          <h2>Section Content</h2>
          <p>This is the content of the section you can scroll to.</p>
        </div>
      </SidebarC>
    </div>
  );
};

export default SidebarExample;
