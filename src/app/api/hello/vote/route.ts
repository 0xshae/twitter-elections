import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Votingdapp } from "@/../anchor/target/types/votingdapp";
import { BN, Program } from "@coral-xyz/anchor";

const IDL = require("@/../anchor/target/idl/votingdapp.json");

export const OPTIONS = GET;

export async function GET(request: Request) {
  const actionMetadata: ActionGetResponse = {
    icon: "https://imgs.search.brave.com/cLQr20AeyOb-tQ8g-GJnSLagugao9f9Zlnx3Oztmu0I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdHJlc3NlZC1w/cm9ncmFtbWVyLWh1/cnRpbmctZnJvbS1o/ZWFkYWNoZS1vdmVy/d29ya2luZy1wcmV2/ZW50aW5nLW1hbHdh/cmVfNDgyMjU3LTEx/MTgxMC5qcGc_c2Vt/dD1haXNfaHlicmlk",
    title: "Who's the best engineer?",
    description: "Vote for your favourite engineer on X",
    label: "Vote",
    links:{
      actions: [
        {
          label: "Yacine",
          href: "/api/hello/vote?candidate=YacineMTB",
          type: "transaction"
        },
        {
          label: "Primeagen",
          href: "/api/hello/vote?candidate=Primeagen",
          type: "transaction"
        }
      ]
    }
  };
  return Response.json(actionMetadata, {headers: ACTIONS_CORS_HEADERS});  
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const candidate = url.searchParams.get('candidate');

  if (candidate != "YacineMTB" && candidate != "Primeagen"){
    return new Response("Invalid candidate", {status: 400, headers: ACTIONS_CORS_HEADERS});
  }

  const connection = new Connection("http://127.0.0.1:8899", "confirmed" );

  const program: Program<Votingdapp> = new Program(IDL, {connection});

  const body: ActionPostRequest = await request.json();
  let voter;

  try{
    voter = new PublicKey(body.account);
  } catch(error) {
    return new Response("Invalid account", {status: 400, headers: ACTIONS_CORS_HEADERS});
  }

  const instruction = await program.methods
  .vote(candidate, new BN(1))
  .accounts({
    signer: voter,
  }
  )
  .instruction();

  const blockhash = await connection.getLatestBlockhash();

  const transaction = new Transaction({
    feePayer: voter,
    blockhash: blockhash.blockhash,
    lastValidBlockHeight: blockhash.lastValidBlockHeight,
  }).add(instruction);

  const response = await createPostResponse({
    fields: {
      type: "transaction",
      transaction: transaction
    }
  });

  return Response.json(response, {headers: ACTIONS_CORS_HEADERS});
}
