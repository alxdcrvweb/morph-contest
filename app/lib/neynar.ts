import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { CastResponse, CastsResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export const getUserInfo = async(fid:number) => {
    let userInfo = await client.lookupUserByFid(fid);
    console.log(userInfo);
    return userInfo;
}

export const getCastRecasts = async(hash:string) => {
    let castInfo = await client.lookUpCastByHash(hash);
    return castInfo.result.cast.reactions.fids;
}