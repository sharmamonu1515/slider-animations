export interface CustomCSSProperties extends React.CSSProperties {
  '--animation-duration'?: string;
  '--expand-animation'?: string;
  '--flip-animation'?: string;
  '--animation-delay'?: string;
}

export type AnimationOptions = {
  duration: number;
  delay: number;
  autoplayDuration: number;
  pauseOnHover: boolean;
  direction?: string[];
  style?: string[];
  shape?: string[];
  distance?: string;
};

export interface BaseAnimationOptions {
  duration: number;
  delay: number;
  autoplayDuration: number;
  pauseOnHover: boolean;
}

export type SimpleAnimationOptions = BaseAnimationOptions;

export interface BlurOptions extends BaseAnimationOptions {
  style: 'gentle' | 'moderate' | 'intense';
}

export interface FloatOptions extends BaseAnimationOptions {
  direction: 'top' | 'bottom' | 'left' | 'right';
}

export interface FlipOptions extends BaseAnimationOptions {
  style: 'gentle' | 'moderate' | 'intense';
  direction: 'top' | 'bottom' | 'left' | 'right';
}

export interface ExpandOptions extends BaseAnimationOptions {
  style: 'gentle' | 'moderate' | 'intense';
  direction: 'right' | 'top right' | 'top' | 'top left' | 'left' | 'bottom left' | 'bottom' | 'bottom right' | 'center';
}

export interface ShrinkOptions extends BaseAnimationOptions {
  style: 'gentle' | 'moderate' | 'intense';
}

export interface ShapeOptions extends BaseAnimationOptions {
  shape: 'oval' | 'circle' | 'square' | 'diamond';
}

export interface RevealOptions extends BaseAnimationOptions {
  direction: 'top' | 'bottom' | 'left' | 'right';
}

export interface WinkOptions extends BaseAnimationOptions {
  direction: 'horizontal' | 'vertical';
}

export interface GrowOptions extends BaseAnimationOptions {
  style: 'gentle' | 'moderate' | 'intense';
  direction: 'top' | 'bottom' | 'left' | 'right';
  distance: string;
}

export interface SlideOptions extends BaseAnimationOptions {
  style: 'gentle' | 'moderate' | 'intense';
  direction: 'top' | 'bottom' | 'left' | 'right';
}

export type CarouselOptions =
  | { animationType: 'fade'; options: SimpleAnimationOptions }
  | { animationType: 'float'; options: FloatOptions }
  | { animationType: 'blur'; options: BlurOptions }
  | { animationType: 'expand'; options: ExpandOptions }
  | { animationType: 'shrink'; options: ShrinkOptions }
  | { animationType: 'reveal'; options: RevealOptions }
  | { animationType: 'shape'; options: ShapeOptions }
  | { animationType: 'flip'; options: FlipOptions }
  | { animationType: 'grow'; options: GrowOptions }
  | { animationType: 'wink'; options: WinkOptions }
  | { animationType: 'slide'; options: SlideOptions }
  | { animationType: 'flash'; options: SimpleAnimationOptions };


export interface CarouselProps {
  slides: string[];
  animationType: CarouselOptions['animationType'];
  options: CarouselOptions['options'];
}