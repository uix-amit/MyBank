import { Injectable } from '@nestjs/common';
import * as braintree from 'braintree';

@Injectable()
export class BraintreeService {
  private gateway: braintree.BraintreeGateway;

  constructor() {
    this.gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: process.env.BRAINTREE_MERCHANT_ID,
      publicKey: process.env.BRAINTREE_PUBLIC_KEY,
      privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });
  }

  async generateClientToken(): Promise<string> {
    try {
      const { clientToken } = await this.gateway.clientToken.generate({});
      return clientToken;
    } catch (error) {
      console.error('Error generating client token:', error);
      throw error;
    }
  }

  async processPayment(amount: number, paymentMethodNonce: string) {
    try {
      const result = await this.gateway.transaction.sale({
        amount,
        paymentMethodNonce,
        options: {
          submitForSettlement: true,
        },
      });

      return result;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }
}
