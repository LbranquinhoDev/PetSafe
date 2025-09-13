import React from 'react';
import styles from './Botao.module.css';

const Botao = ({ 
  children, 
  text, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...props 
}) => {
  const buttonText = text || children;
  
  return (
    <button
      type={type}
      className={`${styles['animated-button']} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <svg viewBox="0 0 24 24" className={styles['arr-2']} xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
      
      <span className={styles.text}>{buttonText}</span>
      
      <span className={styles.circle}></span>
      
      <svg viewBox="0 0 24 24" className={styles['arr-1']} xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </button>
  );
}

export default Botao;