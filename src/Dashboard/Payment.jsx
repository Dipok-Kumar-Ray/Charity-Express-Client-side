import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_payment_Key)

    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm></PaymentForm>
            </Elements>
        </div>
    );
};

export default Payment;