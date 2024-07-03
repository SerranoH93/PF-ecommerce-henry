import React from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Configuración de la clave pública de Stripe
const stripePromise: Promise<Stripe | null> = loadStripe("pk_test_51PVx00CRx9u6cZBxtTBfWTyf5b5VfJdwTub8aoRbb2N7OqwZTxr33aPgL0B8kvAhy475sF3lGhtjFsaJGzbfhhUP00yzZChe7p");

interface Product {
    id: string;
    name: string;
    price: number;
}

interface StripeCheckoutProps {
    product: Product;
}

const CheckoutForm: React.FC<StripeCheckoutProps> = ({ product }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleClick = async () => {
        if (!stripe) return;

        try {
            const response = await fetch('https://pf-ecommerce-henry.onrender.com/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    amount: product.price,
                }),
            });

            const session = await response.json();

            if (!session || !session.id) {
                throw new Error('No se pudo iniciar la sesión de pago.');
            }

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error al iniciar la sesión de pago:', error);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Comprar</button>
        </div>
    );
};

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ product }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm product={product} />
        </Elements>
    );
};

export default StripeCheckout;
