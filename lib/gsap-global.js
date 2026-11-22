'use client';
// The pages read GSAP from window (as in the design prototypes).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}
