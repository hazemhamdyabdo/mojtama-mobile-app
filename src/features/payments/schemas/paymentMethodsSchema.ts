import { z } from "zod";

export const bankTransferSchema = z.object({
  bankId: z.string().min(1, "Select a bank"),
  accountNo: z
    .string()
    .min(1, "Account number is required")
    .min(8, "Enter a valid account number"),
  beneficiaryName: z
    .string()
    .min(1, "Beneficiary name is required")
    .min(2, "Enter a valid beneficiary name"),
});

export const digitalWalletSchema = z.object({
  walletId: z.string().min(1, "Select a wallet"),
});

export type BankTransferFormValues = z.infer<typeof bankTransferSchema>;
export type DigitalWalletFormValues = z.infer<typeof digitalWalletSchema>;
