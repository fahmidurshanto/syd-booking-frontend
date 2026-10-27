import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;

export const getStripe = (publishableKey) => {
  const key =
    publishableKey ||
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51UV35dF0Cv2SNlucCk8OzQvv47pI3hvHDHQ05vJscRrXovmoDeb9RWALL6kTcBJY0Zxq0aTrqBidqC4KY3O7jrub00cFx2dUo3";

  if (!stripePromise && key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};
