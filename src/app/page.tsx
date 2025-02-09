

import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/ModeToggle';
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className='m-4'>
      <h1>Home Page Content</h1>
    </div>
  );
}
