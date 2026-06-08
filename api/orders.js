import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe secret key not configured' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // Fetch last 50 completed checkout sessions with line items
  const sessions = await stripe.checkout.sessions.list({
    limit: 50,
    expand: ['data.line_items'],
  })

  const orders = sessions.data
    .filter(s => s.payment_status === 'paid')
    .map(s => ({
      id:              s.id,
      created:         s.created,
      customerEmail:   s.customer_email ?? s.metadata?.customer_email ?? '—',
      customerName:    s.metadata?.customer_name  ?? '—',
      customerPhone:   s.metadata?.customer_phone ?? '—',
      fulfillmentType: s.metadata?.fulfillment_type ?? '—',
      deliveryAddress: s.metadata?.delivery_address ?? '—',
      preferredDate:   s.metadata?.preferred_date ?? '—',
      notes:           s.metadata?.notes ?? '',
      total:           (s.amount_total ?? 0) / 100,
      currency:        s.currency?.toUpperCase() ?? 'USD',
      lineItems:       (s.line_items?.data ?? []).map(li => ({
        name:     li.description,
        quantity: li.quantity,
        amount:   (li.amount_total ?? 0) / 100,
      })),
    }))

  return res.status(200).json({ orders })
}
