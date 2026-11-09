import type {ImgHTMLAttributes} from 'react';
import type {Photo} from '../content';

export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;
export const large = (p: Photo) => media(`${p.src}-1600.webp`);

/**
 * A venue photo at the right size for its slot: an 800px and a 1600px WebP,
 * with the intrinsic size declared so nothing shifts while it loads.
 */
export function Img({
  photo,
  sizes = '100vw',
  eager = false,
  className = '',
  ...rest
}: {photo: Photo; sizes?: string; eager?: boolean} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>) {
  return (
    <img
      src={large(photo)}
      srcSet={`${media(`${photo.src}-800.webp`)} ${Math.min(800, photo.w)}w, ${large(photo)} ${Math.min(1600, photo.w)}w`}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
