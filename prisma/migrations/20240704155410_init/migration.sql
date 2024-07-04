-- CreateTable
CREATE TABLE "LoanTransactions" (
    "TransactionID" TEXT NOT NULL,
    "FromAccountID" TEXT NOT NULL,
    "ToAccountID" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "TransactionDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "TransactionStatus" "TransactionStatus" NOT NULL DEFAULT 'INPROGRESS',

    CONSTRAINT "LoanTransactions_pkey" PRIMARY KEY ("TransactionID")
);

-- AddForeignKey
ALTER TABLE "LoanTransactions" ADD CONSTRAINT "LoanTransactions_FromAccountID_fkey" FOREIGN KEY ("FromAccountID") REFERENCES "SavingsAccount"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanTransactions" ADD CONSTRAINT "LoanTransactions_ToAccountID_fkey" FOREIGN KEY ("ToAccountID") REFERENCES "Loans"("LoanID") ON DELETE RESTRICT ON UPDATE CASCADE;
