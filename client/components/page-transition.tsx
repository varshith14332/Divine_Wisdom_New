import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function PageTransition({ children, className, delay = 0 }: PageTransitionProps) {
  return (
    <div
      className={cn(
        "animate-fade-in-scale",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  staggerDelay?: number
}

export function StaggeredList({ 
  children, 
  className, 
  itemClassName,
  staggerDelay = 100 
}: StaggeredListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn("animate-slide-in-bottom", itemClassName)}
          style={{ animationDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
