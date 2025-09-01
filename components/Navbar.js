import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="flex items-center justify-center w-full h-36 bg-primary-red">
      <Image alt="chill burger logo" width={120} height={120} src="/Frame.svg" className="mt-3" />
    </div>
  );
}

export default Navbar;
