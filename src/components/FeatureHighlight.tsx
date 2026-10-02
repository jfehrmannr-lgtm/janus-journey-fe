import type { ReactNode } from 'react'

interface FeatureHighlightProps {
  description: string
  icon: ReactNode
  title: string
}

/**
 * Renders one benefit item in the login page hero panel.
 *
 * @param description - Supporting text for the feature.
 * @param icon - Icon displayed beside the feature content.
 * @param title - Short feature heading.
 * @returns A styled feature highlight.
 */
const FeatureHighlight = ({ description, icon, title }: FeatureHighlightProps) => {
  return (
    <li className="flex items-start gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-white ring-1 ring-white/10">
        {icon}
      </span>
      <span className="pt-0.5">
        <strong className="block text-base font-semibold text-white sm:text-lg">{title}</strong>
        <span className="mt-1 block text-sm leading-6 text-slate-300 sm:text-base">{description}</span>
      </span>
    </li>
  )
}

export default FeatureHighlight
