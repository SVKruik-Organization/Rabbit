import '../assets/styles/Shop.css'
import { Link } from 'react-router-dom'

function Shop() {
    const pageType = {
        success: true ? window.location.pathname.split("/")[1].includes('success') : false,
        canceled: true ? window.location.pathname.split("/")[1].includes('cancel') : false
    }

    if (pageType.success) localStorage.removeItem("selected-subscription")

    // On form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();

        fetch('/api/v1/stripe/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: parseInt(localStorage.getItem("selected-subscription")), quantity: 1 }
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

    const selectSubscription = (subscription) => {
        localStorage.setItem("selected-subscription", subscription);
    }

    return (
        <div className='shop'>

            {/* If on the shop page */}
            {!pageType.success ? (
                <div>
                    <h2>Shop</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            <input onClick={() => selectSubscription(1)} type='radio' name='selection' required defaultChecked={localStorage.getItem("selected-subscription") === "1"} />
                            Subscribe to Rabbit Plus
                        </label>
                        <label>
                            <input onClick={() => selectSubscription(2)} type='radio' name='selection' required defaultChecked={localStorage.getItem("selected-subscription") === "2"} />
                            Subscribe to Rabbit Premium
                        </label>
                        <button type='submit'>Continue to Payment</button>
                    </form>
                </div>
            ) : null}

            {/* If payment was successfull */}
            {pageType.success ? (
                <div>
                    <h2>Thank you for your order!</h2>
                    <p>Our team will process your order and you will receive your subscription benefits in less than 24 hours.</p>

                    <Link to="/"><button>Back to home</button></Link>
                </div>
            ) : null}

            {/* If payment was canceled */}
            {pageType.canceled ? (
                <div>
                    <h2>There was an issue with the payment method, try again with another payment method.</h2>
                </div>
            ) : null}
        </div>

    )
}

export default Shop