import '../assets/styles/Shop.css'

function Shop() {
    const handleFormSubmit = (event) => {
        event.preventDefault();

        fetch('/api/v1/stripe/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: selectedSubscription, quantity: 1 }
                ]
            })
        }).then(async res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url;
        }).catch(err => {
            console.error(err.error);
        })
    }

    let selectedSubscription = null;

    return (
        <div className='shop'>
            <h2>Shop</h2>

            <form onSubmit={handleFormSubmit}>
                <label>
                    <input onClick={() => selectedSubscription = 1} type='radio' name='selection' required />
                    Subscribe to Rabbit Plus
                </label>
                <label>
                    <input onClick={() => selectedSubscription = 2} type='radio' name='selection' required />
                    Subscribe to Rabbit Premium
                </label>

                <button type='submit'>Continue to Payment</button>
            </form>
        </div>
    )
}

export default Shop