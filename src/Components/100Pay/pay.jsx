import { v4 as uuidv4 } from "uuid";
import { shop100Pay } from "@100pay-hq/checkout";

const chargeData = {
  ref_id: uuidv4(), // Unique transaction reference ID
  api_key: "LIVE;PK;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjY2ZTQxNTM5YTcwNDRmMDA0OWUyZTQ3MSIsInVzZXJJZCI6IjY2ZTQxNTM5YTcwNDRmMDA0OWUyZTQ2ZSIsImlhdCI6MTcyNjIyMzY3M30.xFq6YscIVp3vuobMDmChduTl5rSnCjU7kgwfQDtPgzU", // Replace with your 100Pay API key
  billing: {
    amount: 10000, // Amount to be charged
    currency: 'NGN', // Currency in which the payment will be made
    description: "Purchase of digital product", // Description of the payment
    country: 'NG', // Country of the customer
    pricing_type: "fixed", // Pricing type (fixed or variable)
  },
  customer: {
    user_id: "12345", // Unique ID of the customer
    name: "John Doe", // Name of the customer
    email: "john.doe@example.com", // Email address of the customer
    phone: "+1234567890", // Phone number of the customer
  },
  metadata: {
    is_approved: "yes",
    order_id: "OR2", // Optional order ID
    charge_ref: "REF", // Optional charge reference
  },
  call_back_url: "http://localhost:8000/verifyorder/", // URL to which the user will be redirected after payment
  onClose: () => {
    console.log("User closed the payment modal.");
  },
  callback: (reference) => {
    console.log(`Transaction successful with reference: ${reference}`);
  },
  onError: (error) => {
    console.error("An error occurred:", error);
  },
  onPayment(reference) {
    console.log("Payment completed with reference:", reference);
    
  },
};

const displayOptions = {
  maxWidth: "500px", // Optional: specify the max width of the payment modal
};

const payWith100Pay = async () => {
  shop100Pay.setup(
    chargeData,
    displayOptions
  );
};

export default payWith100Pay;
