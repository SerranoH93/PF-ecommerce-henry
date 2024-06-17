import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Style from './Footer.module.css'

interface ContactFormInputs {
  email: string;
  message: string;
}

const Footer: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = data => {
    console.log('Form Data:', data);
    // por aca deberiamos manejar la info del form
  };

  return (
    <footer className={Style.footer}>
      <div className={Style.footerTop}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={Style.contactForm}>
          <input 
            type="email" 
            placeholder="Your email" 
            {...register('email', { required: true })} 
          />
          {errors.email && <span>This field is required</span>}
          <textarea 
            placeholder="Your message" 
            {...register('message', { required: true })}
          />
          {errors.message && <span>This field is required</span>}
          <button type="submit">Send</button>
        </form>
      </div>
      <div className={Style.footerMiddle}>
        <div className={Style.footerColumns}>
          <div className={Style.column}>Column 1</div>
          <div className={Style.column}>Column 2</div>
          <div className={Style.column}>Column 3</div>
          <div className={Style.column}>Column 4</div>
          <div className={Style.socialColumn}>
            <div>Follow Us</div>
            <div className={Style.socialIcons}>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
            <div>Payments</div>
            <div className={Style.paymentIcons}>
              <img src="/path/to/visa.png" alt="Visa" />
              <img src="/path/to/mastercard.png" alt="MasterCard" />
              <img src="/path/to/amex.png" alt="American Express" />
              <img src="/path/to/paypal.png" alt="PayPal" />
              <img src="/path/to/applepay.png" alt="Apple Pay" />
              <img src="/path/to/googlepay.png" alt="Google Pay" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;