//The frontend will send some http requests to here (backend)
//we will handle them using GET/POST requests

import { ActionGetResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";

//so if you get a request you use GET

export async function GET(request: Request) {
    const actionMetadata: ActionGetResponse = {
      icon: "https://imgs.search.brave.com/q8fsR6XowIW4V63Us28NrQCtHco9E-XBYJZKbJnEu20/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmd1/aW0uY28udWsvaW1n/L21lZGlhLzMyN2U0/NmMzYWIwNDkzNThm/YWQ4MDU3NTE0NmJl/OWUwZTY1Njg2ZTcv/MF8wXzEwMjNfNzQy/L21hc3Rlci8xMDIz/LmpwZz93aWR0aD00/NjUmZHByPTEmcz1u/b25lJmNyb3A9bm9u/ZQ",
      title: "Best engineer on X",
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
          },
          {
            label: "Fireship",
            href: "/api/hello/vote?candidate=Fireship",
            type: "transaction"
          }
        ]
      }
    };
    return Response.json(actionMetadata, {headers: ACTIONS_CORS_HEADERS});  
  }