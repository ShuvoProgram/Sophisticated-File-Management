import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          src="/logo.svg"
          alt="Image AI"
          fill
          className="shrink-0 hover:opacity-75 transition ml-3"
        />
      </div>
    </Link>
  );
};
