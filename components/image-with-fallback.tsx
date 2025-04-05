"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc: string
}

export function ImageWithFallback({ src, fallbackSrc, alt, ...rest }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      {...rest}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc)
        setHasError(true)
      }}
    />
  )
}

