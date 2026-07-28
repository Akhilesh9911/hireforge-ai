// Blocks obvious fake/test domains, allows real providers + company/college emails
const FAKE_DOMAINS = [
  'test.com', 'test.in', 'fake.com', 'example.com', 'abc.com',
  'xyz.com', 'temp.com', 'demo.com', 'sample.com', 'dummy.com',
  'email.com', 'tempmail.com', 'guerrillamail.com', 'mailinator.com',
  'throwaway.email', 'sharklasers.com', 'grr.la', 'spam4.me',
  'trashmail.com', 'dispostable.com', 'yopmail.com', 'maildrop.cc',
  'aaa.com', 'bbb.com', 'ccc.com', 'asdf.com', 'qwerty.com',
];

// Common real providers — company/college emails also allowed
const KNOWN_REAL_DOMAINS = [
  'gmail.com', 'googlemail.com',
  'outlook.com', 'hotmail.com', 'hotmail.in', 'live.com', 'msn.com',
  'yahoo.com', 'yahoo.in', 'yahoo.co.in', 'ymail.com',
  'icloud.com', 'me.com', 'mac.com',
  'rediffmail.com',
  'protonmail.com', 'proton.me', 'pm.me',
  'zoho.com', 'aol.com', 'mail.com', 'gmx.com', 'gmx.in',
];

export const validateEmail = (email: string): string | true => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return 'Please enter a valid email address.';

  // Block known fake domains
  if (FAKE_DOMAINS.includes(domain)) {
    return 'Please use a real email address (e.g. Gmail, Outlook, Yahoo or your college/company email).';
  }

  // Must have a proper TLD (at least 2 chars)
  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) {
    return 'Please enter a valid email address.';
  }

  return true;
};
