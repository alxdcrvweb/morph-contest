// handle frame actions
// ./app/frames/route.ts

import {
  getFrameHtml,
  validateFrameMessage,
  Frame,
  FrameActionPayload,
  FrameActionDataParsedAndHubContext,
} from "frames.js";
import { NextRequest } from "next/server";
import { getWinners, getWinningStatus } from "../lib/db";
import { FrameActionMessage } from "@farcaster/core";
export async function getTimer(message: FrameActionDataParsedAndHubContext) {
  const total =
    Date.parse("2024-02-21 23:30:00 GMT+0100") -
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
          label: `Refresh`,
          action: "post",
        },
        {
          label: `Back`,
          action: "post",
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
  } else if (total <= 0) {
    // const hash = "0x9d021952c7208c3a120aeea23441836a6870acba"
    // const fid = 292319

    const hash = message?.castId?.hash;
    const fid = message?.requesterFid;
    const creatorFid = message.castId?.fid;
    //@ts-ignore
    console.log(
      "msg, hash, fid, message.data",
      message?.castId?.hash,
      hash,
      fid
    );
    await getWinners(fid, hash);
    const win = await getWinningStatus(fid);

    if (win) {
      const frame: Frame = {
        version: "vNext",
        image: `${process.env.NEXT_PUBLIC_HOST}/congratz.jpg`,
        buttons: [
          {
            label: `Website`,
            action: "link",
            target: "https://mrphs.io",
          },
          {
            label: `Back`,
            action: "post",
          },
        ],
        postUrl: `${process.env.NEXT_PUBLIC_HOST}/main`,
      };
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
        image: `${process.env.NEXT_PUBLIC_HOST}/lose.jpg`,
        buttons: [
          {
            label: `Website`,
            action: "link",
            target: "https://mrphs.io",
          },
          {
            label: `Back`,
            action: "post",
          },
        ],
        postUrl: `${process.env.NEXT_PUBLIC_HOST}/main`,
      };
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
}
