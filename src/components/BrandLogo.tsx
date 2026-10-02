import Image from 'next/image'

interface BrandLogoProps {
  compact?: boolean
  onDark?: boolean
}

/**
 * Renders the Janus Journey brand mark with an optional wordmark.
 *
 * @param compact - Whether to render only the logo mark without the wordmark.
 * @param onDark - Whether the wordmark is rendered for a dark background.
 * @returns The Janus Journey logo and wordmark.
 */
const BrandLogo = ({ compact = false, onDark = false }: BrandLogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/janus-journey-logo.svg"
        alt={compact ? 'Janus Journey logo' : ''}
        className="size-15"
      />
      {!compact && (
        <span className={`text-3xl font-semibold tracking-tight ${onDark ? 'text-white' : 'text-slate-950'}`}>
          Janus Journey
        </span>
      )}
    </div>
  )
}

export default BrandLogo
