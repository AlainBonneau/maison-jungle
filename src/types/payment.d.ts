export type PaymentMethod = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
};

export type PaymentFormData = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
};

export type PaymentData = {
  amount: number;
  currency?: "EUR" | "USD";
  paymentMethod: PaymentMethod;
};

export type PaymentSuccess = {
  success: true;
  transactionId: string;
  amount: number;
  currency: string;
  status: "succeeded";
  timestamp: string;
};

export type PaymentError = {
  success: false;
  message: string;
};
