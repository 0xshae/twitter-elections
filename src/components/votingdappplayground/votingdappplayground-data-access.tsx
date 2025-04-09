'use client'

import { getVotingdappplaygroundProgram, getVotingdappplaygroundProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useVotingdappplaygroundProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getVotingdappplaygroundProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getVotingdappplaygroundProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['votingdappplayground', 'all', { cluster }],
    queryFn: () => program.account.votingdappplayground.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['votingdappplayground', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ votingdappplayground: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useVotingdappplaygroundProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useVotingdappplaygroundProgram()

  const accountQuery = useQuery({
    queryKey: ['votingdappplayground', 'fetch', { cluster, account }],
    queryFn: () => program.account.votingdappplayground.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['votingdappplayground', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ votingdappplayground: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['votingdappplayground', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ votingdappplayground: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['votingdappplayground', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ votingdappplayground: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['votingdappplayground', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ votingdappplayground: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
