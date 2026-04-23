

import Navbar from "@/components/(admin)/Navbar";
import SideBar from "@/components/(admin)/SideBar";
import React from "react";

const layout = ({ children }) => {
  return (

    <main className="flex h-screen w-full overflow-hidden bg-background">
      
      {/* Assuming your Sidebar has a fixed width, it will sit perfectly here */}
      <SideBar />

      {/* Added overflow-y-auto so ONLY this side scrolls when content is long */}
      <div className="flex flex-1 flex-col h-full overflow-y-auto relative">
        <Navbar />
        {/* Added w-full to ensure it takes proper space */}
        <div className="w-full">
          {children}
        </div>
      </div>
      
    </main>
  );
};

export default layout;