-- CreateEnum
CREATE TYPE "Network" AS ENUM ('Solana', 'Ethereum', 'Base', 'SolanaTestnet', 'EthereumTestnet', 'BaseTestnet');

-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('Buy', 'Sell');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('takingOff', 'hot', 'poop', 'redFlag');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "username" TEXT,
    "verified" BOOLEAN,
    "imageUrl" TEXT,
    "coverUrl" TEXT,
    "referralId" TEXT,
    "inviteId" TEXT,
    "bio" TEXT,
    "socialMedia" TEXT,
    "email" TEXT,
    "twitter" TEXT,
    "telegram" TEXT,
    "link" TEXT,
    "kycStatus" TEXT DEFAULT 'null',
    "country" TEXT,
    "documentType" TEXT,
    "documentFrontUrl" TEXT,
    "documentBackUrl" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "wallets" (
    "address" TEXT NOT NULL,
    "network" "Network" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "trades" (
    "id" SERIAL NOT NULL,
    "network" "Network" NOT NULL,
    "type" "SaleType" NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "swapperAddress" TEXT NOT NULL,
    "swapperId" TEXT NOT NULL,
    "baseAmount" DOUBLE PRECISION NOT NULL,
    "tokenAmount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "txHash" TEXT NOT NULL,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "bondingCurveAddress" TEXT,
    "network" "Network" NOT NULL,
    "description" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "webLink" TEXT,
    "telegramLink" TEXT,
    "twitterLink" TEXT,
    "maxBuyPerWallet" DOUBLE PRECISION,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "verified" BOOLEAN,
    "marketCap" DOUBLE PRECISION,
    "liquidity" DOUBLE PRECISION,
    "virtualLP" DOUBLE PRECISION,
    "capacity" DOUBLE PRECISION,
    "devsOwnership" INTEGER,
    "volume" DOUBLE PRECISION,
    "makers" INTEGER,
    "price" DOUBLE PRECISION,
    "launched" BOOLEAN,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holders" (
    "id" SERIAL NOT NULL,
    "tokenName" TEXT,
    "tokenSymbol" TEXT,
    "tokenAddress" TEXT NOT NULL,
    "bondingCurveAddress" TEXT,
    "network" "Network" NOT NULL,
    "holderAddress" TEXT NOT NULL,
    "tokenAmount" DOUBLE PRECISION,
    "tokenMaxAmount" DOUBLE PRECISION,
    "creatorAddress" TEXT,
    "walletAddress" TEXT,

    CONSTRAINT "holders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "comment" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "follows_followerId_followingId_key" ON "follows"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_tokenAddress_key" ON "tokens"("tokenAddress");

-- CreateIndex
CREATE INDEX "holders_tokenAddress_holderAddress_unique" ON "holders"("tokenAddress", "holderAddress");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_swapperId_fkey" FOREIGN KEY ("swapperId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_swapperAddress_fkey" FOREIGN KEY ("swapperAddress") REFERENCES "wallets"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_tokenAddress_fkey" FOREIGN KEY ("tokenAddress") REFERENCES "tokens"("tokenAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_creatorAddress_fkey" FOREIGN KEY ("creatorAddress") REFERENCES "wallets"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_tokenAddress_fkey" FOREIGN KEY ("tokenAddress") REFERENCES "tokens"("tokenAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holders" ADD CONSTRAINT "holders_tokenAddress_fkey" FOREIGN KEY ("tokenAddress") REFERENCES "tokens"("tokenAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holders" ADD CONSTRAINT "holders_holderAddress_fkey" FOREIGN KEY ("holderAddress") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holders" ADD CONSTRAINT "holders_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "wallets"("address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
