import { InputHTMLAttributes } from 'react';

export default function Button(id: string, className: string, text: string) {
  return (
    <>
      <button id={id} className={className}>
        {text}
      </button>
    </>
  );
}
