// handle frame actions
// ./app/frames/route.ts

import { getFrameHtml, validateFrameMessage, Frame, getFrameMessage } from "frames.js";
import { NextRequest } from "next/server";
import { getTimer } from "../components/timer";

export async function POST(request: NextRequest) {
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/mainScreen.gif`;
  const body = await request.json();
  let message = await getFrameMessage(body)
  let button =
    message?.buttonIndex || body.untrustedData.buttonIndex;

  if (button == 1 && message) {
    return getTimer(message);
  } else {
    const frame: Frame = {
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

    // Return the frame as HTML
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  }
}
// Use the frame message to build the frame
