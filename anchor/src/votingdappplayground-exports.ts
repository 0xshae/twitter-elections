// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import VotingdappplaygroundIDL from '../target/idl/votingdappplayground.json'
import type { Votingdappplayground } from '../target/types/votingdappplayground'

// Re-export the generated IDL and type
export { Votingdappplayground, VotingdappplaygroundIDL }

// The programId is imported from the program IDL.
export const VOTINGDAPPPLAYGROUND_PROGRAM_ID = new PublicKey(VotingdappplaygroundIDL.address)

// This is a helper function to get the Votingdappplayground Anchor program.
export function getVotingdappplaygroundProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...VotingdappplaygroundIDL, address: address ? address.toBase58() : VotingdappplaygroundIDL.address } as Votingdappplayground, provider)
}

// This is a helper function to get the program ID for the Votingdappplayground program depending on the cluster.
export function getVotingdappplaygroundProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Votingdappplayground program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return VOTINGDAPPPLAYGROUND_PROGRAM_ID
  }
}
