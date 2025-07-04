import { Frame, getFrameFlattened } from "frames.js";
import type { Metadata } from "next";
import { dbConnect, getWinners, getWinningStatus } from "./lib/db";

// Declare the frame
const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/mainScreen.gif`;
const initialFrame: Frame = {
  image: imageUrl,
  version: "vNext",
  buttons: [
    {
      label: "Check the winners",
      action: "post",
    },
    {
      action: "post",
      label: "About Project",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_HOST}/showdown`,
};

// console.log(process.env.NEXT_PUBLIC_HOST)

// Export Next.js metadata
export const metadata: Metadata = {
  title: "Morpheus",
  description: "Choose your side",
  openGraph: {
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  other: getFrameFlattened(initialFrame),
};
export default async function Home() {
  // let html = getFrameHtml(initialFrame);
  // console.log(html);
  return <div>Morpheus Frame</div>;
}
