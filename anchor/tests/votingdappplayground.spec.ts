import { BankrunProvider, startAnchor } from "anchor-bankrun";
import { Keypair, PublicKey } from "@solana/web3.js";
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Votingdapp } from '../target/types/votingdapp';

const IDL = require("../target/idl/votingdapp.json");
const votingAddress = new PublicKey("2UqsGQM8gDJed17xkTjJoAay7L8YVQqXZajcPV7sGZSD");


describe('Votingdapp', () => {

let context;
let provider;
anchor.setProvider(anchor.AnchorProvider.env());
let votingProgram = anchor.workspace.Votingdapp as Program<Votingdapp>;

  // let context;
  // let provider;
  // let votingProgram: anchor.Program<Votingdapp>;

  // beforeAll( async () => {
  //   context = await startAnchor("", [{name: "votingdappplayground", programId: votingAddress}], []);
	//   provider = new BankrunProvider(context);
  //   votingProgram = new Program<Votingdapp>(
	// 	IDL,
	// 	provider,
  // ); 
  // });
 


//test for initializing poll
  it('Initialize Poll', async () => {

  await votingProgram.methods.initializePoll(
    new anchor.BN(1),
    "Who is your favorite engineer on X?",
    new anchor.BN(0),
    new anchor.BN(1913035500),
  ).rpc();

  const [pollAddress] = PublicKey.findProgramAddressSync(
    [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
    votingAddress,
  )

  const poll = await votingProgram.account.poll.fetch(pollAddress); 

  console.log(poll);

  expect(poll.pollId.toNumber()).toEqual(1);
  expect(poll.description).toEqual("Who is your favorite engineer on X?");
  expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber());
  
  });

  //test for initializing candidate

  it('Initialize Candidate', async () => {
    //CANDIDATE #1
    await votingProgram.methods.initializeCandidate(
      "yacineMTB",
      new anchor.BN(1),
    ).rpc();

    //create PDA for yacineMTBCandidate
    const [yacineAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("yacineMTB")],
      votingAddress,
    );
    
    //fetching account details using PDA
    const yacineMTBCandidate = await votingProgram.account.candidate.fetch(yacineAddress);
  
    console.log(yacineMTBCandidate);
    expect(yacineMTBCandidate.candidateVotes.toNumber()).toEqual(0);



    //CANDIDATE #2
    await votingProgram.methods.initializeCandidate(
      "Primeagen",
      new anchor.BN(1),
    ).rpc();

    const [primeagenAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("Primeagen")],
      votingAddress,
    );
  
    const primeagenCandidate = await votingProgram.account.candidate.fetch(primeagenAddress);
  
    console.log(primeagenCandidate);
    expect(primeagenCandidate.candidateVotes.toNumber()).toEqual(0);

    //CANDIDATE 3
    await votingProgram.methods.initializeCandidate(
      "Fireship",
      new anchor.BN(1),
    ).rpc();

    const [fireshipAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("Fireship")],
      votingAddress,
    );
  
    const fireshipCandidate = await votingProgram.account.candidate.fetch(fireshipAddress);
  
    console.log(fireshipCandidate);
    expect(fireshipCandidate.candidateVotes.toNumber()).toEqual(0);


  });

 

  //test for voting

  it('vote', async () => {
    await votingProgram.methods.vote(
      "yacineMTB",
      new anchor.BN(1),
    ).rpc();

    const [yacineAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("yacineMTB")],
      votingAddress,
    );
    
    //fetching account details using PDA
    const yacineMTBCandidate = await votingProgram.account.candidate.fetch(yacineAddress);
    
    console.log(yacineMTBCandidate);
  });

  // it('vote', async () => {
  //   await votingProgram.methods.vote(
  //     "Primeagen",
  //     new anchor.BN(1),
  //   ).rpc();

  //   const [primeagenAddress] = PublicKey.findProgramAddressSync(
  //     [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("Primeagen")],
  //     votingAddress,
  //   );
    
  //   //fetching account details using PDA
  //   const primeagenCandidate = await votingProgram.account.candidate.fetch(primeagenAddress);
    
  //   console.log(primeagenCandidate);
  // });

  //test for fetching votes
  it('Fetch Votes', async() => {
    await votingProgram.methods.fetchVotes(
      "yacineMTB",
      new anchor.BN(1),
    ).rpc();
    const [yacineAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("yacineMTB")],
      votingAddress,
    );
    const yacineCandidate = await votingProgram.account.candidate.fetch(yacineAddress);
    console.log(yacineCandidate);
  })
  it('Fetch Votes', async() => {
    await votingProgram.methods.fetchVotes(
      "Fireship",
      new anchor.BN(1),
    ).rpc();

 })

});
  