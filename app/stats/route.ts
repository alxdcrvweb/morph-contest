// handle frame actions
// ./app/frames/route.ts

import { getFrameHtml, Frame, validateFrameMessage } from "frames.js";
import { NextRequest } from "next/server";
import { getTimer } from "../components/timer";

export async function POST(request: NextRequest) {
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/stats.jpg`;
  const body = await request.json();
  const { isValid, message } = await validateFrameMessage(body);
  let button =
    message?.data.frameActionBody.buttonIndex || body.untrustedData.buttonIndex;

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
          label: "Back",
          action: "post",
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
