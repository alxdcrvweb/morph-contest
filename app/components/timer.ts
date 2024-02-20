// handle frame actions
// ./app/frames/route.ts

import { getFrameHtml, validateFrameMessage, Frame } from "frames.js";
import { NextRequest } from "next/server";

export async function getTimer() {
  const total =
    Date.parse("2024-02-21 18:00:00 GMT+0100") -
    Date.parse(new Date().toString());
  function getTimeRemaining(total: any) {
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return `${days < 10 ? "0" + days : days} : ${
      hours < 10 ? "0" + hours : hours
    } : ${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
  const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/og?time=${getTimeRemaining(
    total
  )}`;
  if (total > 0) {
    const frame: Frame = {
      version: "vNext",
      image: imageUrl,
      buttons: [
        {
          label: `Back`,
          action: "post",
        },
        {
          label: `Learn More`,
          action: "link",
          target: "https://mrphs.io/",
        },
      ],
      postUrl: process.env.NEXT_PUBLIC_HOST + "/main",
    };

    // Return the frame as HTML
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  } else {
    const frame: Frame = {
      version: "vNext",
      image: `${process.env.NEXT_PUBLIC_HOST}/images.jpg`,
      buttons: [
        {
          label: `Sleep Faction`,
          action: "post",
        },
        {
          label: `Vigilant Faction`,
          action: "post",
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}/result`,
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
}
