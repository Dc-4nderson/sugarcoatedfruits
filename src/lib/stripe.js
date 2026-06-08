// TODO: Replace with live Stripe integration
// Stripe Checkout Session will be created server-side
// Required: VITE_STRIPE_PUBLIC_KEY env var and backend endpoint /api/create-checkout-session
//
// import { loadStripe } from '@stripe/stripe-js'
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

/**
 * Placeholder for Stripe Checkout payment.
 * Replace this with a real Stripe integration when ready.
 *
 * @param {Array}  cartItems        - Items currently in the cart
 * @param {Object} customerInfo     - { name, phone, email }
 * @param {string} fulfillmentType  - 'pickup' | 'delivery'
 * @param {Object} fulfillmentDetails - Address + date + notes
 */
export async function handlePayment(cartItems, customerInfo, fulfillmentType, fulfillmentDetails = {}) {
  // TODO: Stripe Checkout integration — create /api/create-checkout-session endpoint
  // TODO: Order confirmation SMS via Twilio
  console.log('Stripe payment placeholder', { cartItems, customerInfo, fulfillmentType, fulfillmentDetails })
  alert('Payment integration coming soon! For now, DM @sugarcoated.fruitzz on Instagram to place your order.')
}
