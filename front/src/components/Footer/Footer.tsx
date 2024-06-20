// "use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Style from './Footer.module.css'
import Image from 'next/image';
import LogoFace from '@/assets/LogoFace.png'
import LogoX from '@/assets/XLogo.png'
import LogoIg from '@/assets/logoIG.webp'
import LogoLinkedIn from '@/assets/LinkedIn.webp'

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
    <div className={Style.footerMiddle}>
      <div className={Style.footerColumns}>
        <div className={Style.column}>Acerca de</div>
        <div className={Style.column}>Otros sitios</div>
        <div className={Style.column}>
          <h2>Categorías</h2>
          <ul>
            <li><a href="">Hombres</a></li>
            <li><a href="">Mujeres</a></li>
            <li><a href="">Niños y Niñas</a></li>
            <li><a href="">Accesorios</a></li>
          </ul>
        </div>
        <div className={Style.column}>
          <h2>Síguenos en nuestras Redes</h2>
          <div className={Style.socialIcons}>
            <a href="#">
              <Image 
                className={Style.socialMediaImages} 
                src={LogoFace} 
                alt="Facebook Logo" 
                width={24} 
                height={24} 
              />
            </a>
            <a href="#">
              <Image 
                className={Style.socialMediaImages} 
                src={LogoX} 
                alt="X Logo" 
                width={24} 
                height={24} 
              />
            </a>
            <a href="#">
              <Image 
                className={Style.socialMediaImages} 
                src={LogoIg} 
                alt="Instagram Logo" 
                width={24} 
                height={24} 
              />
            </a>
            <a href="#">
              <Image 
                className={Style.socialMediaImages} 
                src={LogoLinkedIn} 
                alt="LinkedIn Logo" 
                width={24} 
                height={24} 
              />
            </a>
          </div>
        </div>
        <div className={Style.socialColumn}>
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
          <div>Nuestras Formas De Pago</div>
          <div>Payments</div>
          <div className={Style.paymentIcons}>
            <Image 
              src="/path/to/visa.png" 
              width={38} 
              height={24}  
              alt="Visa" 
            />
            <Image 
              width={38}  
              height={24}
              src="/path/to/mastercard.png"
              alt="MasterCard" 
            />
            <Image 
              src="/path/to/amex.png" 
              width={38}  
              height={24}
              alt="American Express" 
            />
            <Image 
              src="/path/to/paypal.png"
              width={38}  
              height={24}
              alt="PayPal" 
            />
            <Image 
              src="/path/to/applepay.png"
              width={38}  
              height={24}
              alt="Apple Pay" 
            />
            <Image 
              src="/path/to/googlepay.png" 
              width={38}  
              height={24} 
              alt="Google Pay" 
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;