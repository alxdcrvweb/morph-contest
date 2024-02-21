import mongoose from "mongoose";
import { getCastRecasts, getCastRecastsTwo, getUserInfo } from "./neynar";
import User from "../models/user";
import Check from "../models/check";

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
  console.log(1);
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  console.log(2);
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  console.log(3);
  return cached.conn;
};

export const getWinners = async ( fid: number, hash?: string) => {
  await dbConnect();
  let users = await User.find();
  console.log(5, hash, users?.length);
  let asd = await Check.findOneAndUpdate(
    { isInitialized: true }, // query
    { $setOnInsert: { isInitialized:true }}, // new doc fields
    { upsert: true } // still use upsert option
  );
  if(asd) return false;
  // if (users?.length > 0) {
  //   return false;
  // }
  // let participants = await getCastRecasts(hash!);
  console.log(hash,fid)
  let d = await getCastRecastsTwo(hash!, fid);
  // console.log("http",d)
  let winners = getRandom(
    d,
    d?.length >= 10 ? 10 : d?.length
  );
    console.log(winners)
  for (let winner of winners) {
    console.log(6);
    let userInfo = await getUserInfo(winner);
    let user = new User({
      fid: Number(winner),
      address: userInfo.result.user.custodyAddress,
      winner: true,
    });
    console.log(user);
    await user.save();
    console.log(7);
  }
  return true;
};

export const getWinningStatus = async (fid: number) => {
  // try {
  //   await dbConnect();
  // } catch (error) {
  //   console.log("connect error (already connected?)");
  // }
  await dbConnect();
  let check = await User.find({ fid });
  if (check?.length > 0) return true;
  return false;
};

function getRandom(arr: number[], n: number) {
  var result: number[] = new Array(n),
    len = arr?.length,
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
