import React from 'react';

export const SENA_ESCUDO_URL = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';

interface SenaEscudoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export const SenaEscudo: React.FC<SenaEscudoProps> = ({
  className = '',
  size = 64,
  alt = 'Escudo Oficial del SENA'
}) => {
  return (
    <img
      src={SENA_ESCUDO_URL}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain shrink-0 ${className}`}
      loading="lazy"
    />
  );
};
