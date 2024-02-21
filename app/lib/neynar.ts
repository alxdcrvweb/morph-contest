import { NeynarAPIClient } from "@neynar/nodejs-sdk";
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
const delay = (ms:number) => new Promise((res) => setTimeout(res, ms));

export const getUserInfo = async(fid:number) => {
    let userInfo = await client.lookupUserByFid(fid);
    return userInfo;
}

// export const getUserInfoTwo = async(fid:number) => {
//     let a = await fetch(`https://hub-api.neynar.com/v1/reactionsByCast?reaction_type=2&target_fid=${fid}&target_hash=${hash}`, {
//         method: "GET",
//         headers: {
//             "api_key": process.env.NEYNAR_API_KEY!,
//             "Content-Type": "application/json",
//         }
//     })

// }

export const getCastRecasts = async(hash:string) => {
    let castInfo = await client.lookUpCastByHash(hash);
    console.log(castInfo.result)
    return castInfo?.result?.cast?.recasts?.fids;
}

export const getCastRecastsTwo = async(hash:string, fid: number) => {
    let d = [];
    let pageToken;
    let baseUrl = `https://hub-api.neynar.com/v1/reactionsByCast?reaction_type=2&target_fid=${fid}&target_hash=${hash}&pageSize=100`;

    while(true) {
        let url = baseUrl;
        if( typeof pageToken == "string") {
            url = url + `&pageToken=${pageToken}`
        }
        console.log(url)
        let a = await fetch(url, {
            method: "GET",
            headers: {
                "api_key": process.env.NEYNAR_API_KEY!,
                "Content-Type": "application/json",
            }
        })
        let b = await a.json();
        for(let c of b.messages) {
            d.push(c.data.fid)
        }
        pageToken = b.nextPageToken;
        if(pageToken == "") {
            break;
        }
    }
    
    // let a = await fetch(`https://hub-api.neynar.com/v1/reactionsByCast?reaction_type=2&target_fid=${fid}&target_hash=${hash}`, {
    //     method: "GET",
    //     headers: {
    //         "api_key": process.env.NEYNAR_API_KEY!,
    //         "Content-Type": "application/json",
    //     }
    // })
    // // console.log((await a.json()).messages)
    // let b = (await a.json()).messages;
    // for(let c of b) {
    //     d.push(c.data.fid)
    // }
    return d;
}