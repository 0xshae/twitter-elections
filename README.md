# twitter-electon-dapp

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.30.1 or higher
- Solana CLI 1.18.17 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
npm i
```

#### Start the web app

```
npm run dev
```

## Apps

### anchor

A Solana voting program written in Rust using the the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` commands using anchor <COMMAND>

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the
Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
anchor keys sync
```

#### Build the program:

```shell
anchor-build
```

#### Start the test validator with the program deployed:

```shell
anchor-localnet
```

#### Run the tests

```shell
anchor-test
```

#### Deploy to Devnet

```shell
anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands
Install dependencies

```shell
npm i
```

Start the web app

```shell
npm run dev
```

Build the web app

```shell
anchor build
```
