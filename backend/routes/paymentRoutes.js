const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { priceInCents: 1, name: 'Rabbit Plus Subscription' }],
    [2, { priceInCents: 2, name: 'Rabbit Premium Subscription' }]
]);


router.post('/pay', async function (req, res) {
    console.log(req.body.items);
    try {
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card', 'klarna', 'ideal', 'paypal'],
            // payment_method_types: ['card', 'ideal', 'paypal'],
            payment_method_types: ['card', 'ideal'],
            mode: 'subscription',
            // mode: 'payment' // One time payment
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents,
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
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

});

router.get('/', function (req, res) {
    res.send('Stripe Homepage');
});

router.get('/payment', function (req, res) {
    res.send(process.env.STRIPE_PRIVATE_KEY.toString());
});

module.exports = router;