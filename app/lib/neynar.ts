import { NeynarAPIClient } from "@neynar/nodejs-sdk";
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export const getUserInfo = async(fid:number) => {
    let userInfo = await client.lookupUserByFid(fid);
    return userInfo;
}

export const getCastRecasts = async(hash:string) => {
    let castInfo = await client.lookUpCastByHash(hash);
    return castInfo?.result?.cast?.recasts?.fids;
}