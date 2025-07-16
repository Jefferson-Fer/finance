'use client'

import * as React from 'react'

import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { DotButton, useDotButton } from '@/components/ui/carousel-dot-button'
import { CardType } from '@/config/constants'
import { cn } from '@/lib/utils'

import { StructureCard } from './structure'

type Props = {
  options?: EmblaOptionsType
  classDot?: string
  items: CardType[]
}

export function CarouselCards({ options, classDot, items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="w-full">
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {items &&
            items.map((item) => (
              <div
                key={item.description}
                className="min-w-full shrink-0 grow-0 basis-full p-1"
              >
                <StructureCard item={item} classContainer="h-40" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-1">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            title={`Ir para o slide ${index + 1}`}
            className={cn(
              'size-3 mr-1 border-foreground rounded-full hover:bg-primary/80 hover:border-primary/80',
              classDot,
              index === selectedIndex
                ? ' bg-primary/80 border-primary/80'
                : 'bg-primary/20 border-primary/20',
            )}
          />
        ))}
      </div>
    </div>
  )
}
