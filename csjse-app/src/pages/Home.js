import React from "react";
import Button from "../components/Button";

function Home() {
  return (
    <div className="m-5">
      <div className="flex flex-row gap-5">
        <div className="basis-3/5">
          <h1 className="text-3xl font-medium">Christian Schools Job Board</h1>
        </div>
        <div className="basis-2/5 flex flex-row gap-5 items-center justify-end">
          <Button bg="black" btnText="Create Account" textColor="text-white" />
          <Button bg="black" btnText="Login" textColor="text-white" />
        </div>
      </div>
    </div>
  );
}

export default Home;
