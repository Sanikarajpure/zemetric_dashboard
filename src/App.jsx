import React from "react";
import SmsSender from "./components/SmsSender";

function App() {
  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center">
      <div className="flex p-6 gap-y-20 w-full md:w-[60%]">
        <div className="w-full px-2">
          <SmsSender />
        </div>
      </div>
    </div>
  );
}

export default App;
