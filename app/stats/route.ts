// handle frame actions
// ./app/frames/route.ts

import { getFrameHtml, Frame } from "frames.js";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/stats.jpg`;
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
        target: "https://adev.notion.site/Morpheus-ae4be3d10e6047ed905459e9199ea66f",
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

