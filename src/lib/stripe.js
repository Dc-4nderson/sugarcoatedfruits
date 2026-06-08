import { loadStripe } from '@stripe/stripe-js'

// Publishable key is safe to expose client-side
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

/**
 * Creates a Stripe Checkout Session via the Vercel serverless function,
 * then redirects the browser to Stripe's hosted checkout page.
 *
 * @param {Array}  cartItems          - Items currently in the cart
 * @param {Object} customerInfo       - { name, phone, email }
 * @param {string} fulfillmentType    - 'pickup' | 'delivery'
 * @param {Object} fulfillmentDetails - Address + date + notes + rushFee
 */
export async function handlePayment(cartItems, customerInfo, fulfillmentType, fulfillmentDetails = {}) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: cartItems,
      customer: customerInfo,
      fulfillmentType,
      fulfillmentDetails,
      origin: window.location.origin,
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to start checkout. Please try again.')
  }

  const { url } = await response.json()

  // Redirect to Stripe's hosted checkout
  window.location.href = url
}
