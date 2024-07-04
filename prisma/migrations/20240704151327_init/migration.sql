-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_FromAccountID_fkey" FOREIGN KEY ("FromAccountID") REFERENCES "SavingsAccount"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_ToAccountID_fkey" FOREIGN KEY ("ToAccountID") REFERENCES "SavingsAccount"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;
