import mongoose from "mongoose";
import { getCastRecasts, getUserInfo } from "./neynar";
import User, { Users } from "../models/user";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export const getWinners = async (hash: string) => {
  let participants = await getCastRecasts(hash);
  let winners = getRandom(
    participants,
    participants.length >= 10 ? 10 : participants.length
  );
  await dbConnect();
  let users = await User.find();
  if (users.length > 0) {
    return false;
  }
  for (let winner of winners) {
    let userInfo = await getUserInfo(winner);
    let user = new User({
      fid: winner,
      address: userInfo.result.user.custodyAddress,
      winner: true,
    });
    await user.save();
  }
  return true;
};

export const getWinningStatus = async (fid: number) => {
  try {
    await dbConnect();
  } catch (error) {
    console.log("connect error (already connected?)");
  }
  let check = await User.find({ fid });
  if (check) return true;
  return false;
};

function getRandom(arr: number[], n: number) {
  var result: number[] = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
