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
  await getWinners(228880, "0xefa68e91f1981a6a26dfaa7514d89b9aec0ad5a8")
  // let html = getFrameHtml(initialFrame);
  // console.log(html);
  return <div>Morpheus Frame</div>;
}
