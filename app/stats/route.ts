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

  if (button == 1) {
    return getTimer();
  } else {
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
          label: "Roadmap",
          action: "link",
          target:
            "https://adev.notion.site/Morpheus-ae4be3d10e6047ed905459e9199ea66f",
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/`,
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
