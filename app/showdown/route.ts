// handle frame actions
// ./app/frames/route.ts

import { getFrameHtml, validateFrameMessage, Frame } from "frames.js";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/showdown.jpg`;
  const body = await request.json();

  // Parse and validate the frame message
  const { isValid, message } = await validateFrameMessage(body);
  const frame: Frame = {
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
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/traits`,
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
