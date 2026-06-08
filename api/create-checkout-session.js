import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe secret key not configured' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const { items, customer, fulfillmentType, fulfillmentDetails, origin } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  // Build line items from cart
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `${item.name} — ${item.size}`,
        description: `Flavor: ${item.flavor}`,
      },
      unit_amount: Math.round(item.unitPrice * 100), // convert dollars to cents
    },
    quantity: item.quantity,
  }))

  // Add rush fee as a separate line item if applicable
  if (fulfillmentDetails?.rushFee > 0) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Same-Day Rush Fee',
          description: `Rush fee for ${items.length === 1 ? '1 item' : `${items.length} items`}`,
        },
        unit_amount: Math.round(fulfillmentDetails.rushFee * 100),
      },
      quantity: 1,
    })
  }

  const baseUrl = origin || `https://${process.env.VERCEL_URL}`

  const deliveryAddress =
    fulfillmentType === 'delivery' && fulfillmentDetails
      ? `${fulfillmentDetails.street}, ${fulfillmentDetails.city}, ${fulfillmentDetails.state} ${fulfillmentDetails.zip}`
      : 'Pickup'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: customer?.email || undefined,
    metadata: {
      customer_name:    customer?.name    || '',
      customer_phone:   customer?.phone   || '',
      fulfillment_type: fulfillmentType,
      delivery_address: deliveryAddress,
      preferred_date:   fulfillmentDetails?.date  || '',
      notes:            fulfillmentDetails?.notes || '',
    },
    success_url: `${baseUrl}/?order=success`,
    cancel_url:  `${baseUrl}/?order=cancelled`,
  })

  return res.status(200).json({ url: session.url })
}
