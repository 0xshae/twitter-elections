import { ActionGetResponse } from "@solana/actions"

export const OPTIONS = GET;

export async function GET(request: Request) {
  const actionMetadata: ActionGetResponse = {
    icon: "https://imgs.search.brave.com/cLQr20AeyOb-tQ8g-GJnSLagugao9f9Zlnx3Oztmu0I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdHJlc3NlZC1w/cm9ncmFtbWVyLWh1/cnRpbmctZnJvbS1o/ZWFkYWNoZS1vdmVy/d29ya2luZy1wcmV2/ZW50aW5nLW1hbHdh/cmVfNDgyMjU3LTEx/MTgxMC5qcGc_c2Vt/dD1haXNfaHlicmlk",
    title: "Who's the bext engineer?",
    description: "Vote for your favourite engineer on X",
    label: "Vote",
  };
  return Response.json(actionMetadata, {headers: ACTIONS_CORS_HEADERS});  
}
