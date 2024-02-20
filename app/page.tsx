import Image from "next/image";
import styles from "./page.module.css";
import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  validateActionSignature,
  FrameInput,
} from "frames.js/next/server";
import { Frame, getFrameFlattened, getFrameHtml } from "frames.js";
import type { Metadata } from "next";

// Declare the frame
const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/morph.jpg`;
const initialFrame: Frame = {
  image: imageUrl,
  version: "vNext",
  buttons: [
    {
      label: "Website",
      action: "link",
      target: "https://mrphs.io/",
    },
    {
      action: "post",
      label: "Next",
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
