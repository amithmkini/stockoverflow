'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

import { ModeToggle } from '@/components/dark-mode-toggle'
import { AvatarDropdown } from '@/components/avatar-dropdown'

// If the pathname matches the href of a link, it will be given an active class.
const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/watchlist', label: 'Watchlist' },
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <div className="flex grow flex-row justify-between space-x-10">
      <div className="hidden sm:block">
        <div className={cn('text-2xl font-bold', openSans.className)}>
          <span className="text-orange-600">stock</span>overflow
        </div>
      </div>
      <nav
        className={cn('flex items-center space-x-4 lg:space-x-6', className)}
        {...props}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              pathname.substring(0, href.length) === href
                ? ''
                : 'text-muted-foreground',
              'text-sm font-medium transition-colors hover:text-primary',
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="hidden flex-grow sm:block"></div>
      <div className="flex flex-row items-center space-x-4">
        <ModeToggle />
        <AvatarDropdown />
      </div>
    </div>
  )
}
