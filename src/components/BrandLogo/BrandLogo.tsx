import Image from 'next/image'

interface BrandLogoProps {
  compact?: boolean
  onDark?: boolean
  size?: BrandLogoSize
}

type BrandLogoSize = 'sm' | 'md' | 'nm' | 'lg' | 'xl'

const brandLogoSizeClasses: Record<BrandLogoSize, { image: string; text: string }> = {
  sm: { image: 'size-8', text: 'text-xl' },
  md: { image: 'size-10', text: 'text-2xl' },
  nm: { image: 'size-14', text: 'text-3xl' },
  lg: { image: 'size-16', text: 'text-4xl' },
  xl: { image: 'size-20', text: 'text-5xl' }
}

/**
 * Renders the Janus Journey brand mark with an optional wordmark.
 *
 * @param compact - Whether to render only the logo mark without the wordmark.
 * @param onDark - Whether the wordmark is rendered for a dark background.
 * @param size - Visual size of the logo mark and wordmark.
 * @returns The Janus Journey logo and wordmark.
 */
const BrandLogo = ({ compact = false, onDark = false, size = 'nm' }: BrandLogoProps) => {
  const sizeClasses = brandLogoSizeClasses[size]

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/janus-journey-logo.svg"
        width={0}
        height={0}
        alt={compact ? 'Janus Journey logo' : ''}
        className={sizeClasses.image}
      />
      {!compact && (
        <span
          className={`${sizeClasses.text} font-semibold tracking-tight ${onDark ? 'text-white' : 'text-slate-950'}`}
        >
          Janus Journey
        </span>
      )}
    </div>
  )
}

export default BrandLogo
