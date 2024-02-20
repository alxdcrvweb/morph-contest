// handle frame actions
// ./app/frames/route.ts

import { getFrameHtml, validateFrameMessage, Frame } from "frames.js";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/images.jpg`;
  const frame: Frame = {
    image: imageUrl,
    version: "vNext",
    buttons: [
      {
        label: "Check the winners",
        action: "link",
        target: "/check-winners",
      },
      {
        action: "post",
        label: "Next",
      },
    ],
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/stats`,
  };

  // Return the frame as HTML
  const html = getFrameHtml(frame);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}
// Use the frame message to build the frame
