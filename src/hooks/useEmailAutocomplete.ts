// src/hooks/useEmailAutocomplete.ts
import { useState } from 'react';
import { emailDomains, getHint } from '@/utils/autocomplete';

export function useEmailAutocomplete(initialEmail = '') {
  const [email, setEmail] = useState(initialEmail);
  const [hint, setHint] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setHint(getHint(value, emailDomains));
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hint || hint === email) return;
    if (['Tab', 'ArrowRight', 'End'].includes(e.key)) {
      e.preventDefault();
      setEmail(hint);
      setHint('');
    }
  };

  const handleHintClick = () => {
    if (hint && hint !== email) {
      setEmail(hint);
      setHint('');
    }
  };

  return {
    email,
    setEmail,
    hint,
    setHint,
    handleEmailChange,
    handleEmailKeyDown,
    handleHintClick,
  };
}
