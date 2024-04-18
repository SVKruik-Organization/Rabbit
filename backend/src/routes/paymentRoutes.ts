import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

// Stripe Config
import Stripe from "stripe";
const stripePrivateKey: string = process.env.STRIPE_PRIVATE_KEY || "";
const stripe: Stripe | undefined = new Stripe(stripePrivateKey);

// Items for Sale
const storeItems = new Map([
    [1, { priceInCents: 1, name: 'Rabbit Plus Subscription' }],
    [2, { priceInCents: 2, name: 'Rabbit Premium Subscription' }]
]);

// Stripe Payment
router.post('/pay', async function (req: Request, res: Response) {
    console.log(req.body.items);
    try {
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card', 'klarna', 'ideal', 'paypal'],
            // payment_method_types: ['card', 'ideal', 'paypal'],
            payment_method_types: ['card', 'ideal'],
            mode: 'subscription',
            // mode: 'payment' // One time payment
            line_items: req.body.items.map((item: any) => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: storeItem?.name
                        },
                        unit_amount: storeItem?.priceInCents,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success`,
            cancel_url: `${process.env.SERVER_URL}/cancel`,
        })

        res.json({ url: session.url })
    } catch (e: any) {
        res.status(500).json({ error: e.message })
    }
});

// Base Route
router.get('/', function (req: Request, res: Response) {
    res.send('Stripe Homepage');
});

// DANGER Stripe Private Key
router.get('/payment', function (req: Request, res: Response) {
    if (!process.env.STRIPE_PRIVATE_KEY) return;
    res.send(process.env.STRIPE_PRIVATE_KEY.toString());
});

export { router as PaymentRoutes };