//-----------Libraries-----------//
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

//-----------Components-----------//

export default function adminHomePage() {
  return (
    <div>
      <Outlet />
      Admin homepage
    </div>
  );
}
