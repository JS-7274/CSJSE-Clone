import React from "react";
import Button from "../components/Button";

function Home() {
    return (
    <div class="m-5">
      <div class="flex flex-row gap-5">
        <div class="basis-3/4">
          <h1 class="text-3xl font-medium">Christian Schools Job Board</h1>
        </div>
        <div class="basis-1/4 flex flex-row gap-5 items-center justify-end">
          <Button btnText={"Create Account"}></Button>
          <Button btnText={"Login"}></Button>
        </div>
      </div>
    </div>
    );
}

export default Home;