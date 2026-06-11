import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduceMotion) {
  initShowcase()
  initConstruction()
  initTraverse()
}

function initShowcase() {
  const skiL = document.querySelector<HTMLElement>('.ski-l')
  const skiR = document.querySelector<HTMLElement>('.ski-r')
  const skiB = document.querySelector<HTMLElement>('.ski-b')
  const skiB2 = document.querySelector<HTMLElement>('.ski-b2')
  if (!skiL || !skiR || !skiB || !skiB2) return

  const split = () => Math.min(window.innerWidth * 0.2, 340)

  gsap.set([skiL, skiR, skiB, skiB2], { xPercent: -50, transformPerspective: 1100 })
  gsap.set([skiL, skiB2], { x: -split() * 0.22 })
  gsap.set([skiR, skiB], { x: split() * 0.22 })
  gsap.set([skiB, skiB2], { scaleX: 0 })
  gsap.set([skiL, skiR], { rotationX: 58, scale: 0.88, transformOrigin: '50% 65%' })

  const tl = gsap.timeline({
    defaults: { ease: 'power1.inOut' },
    scrollTrigger: {
      trigger: '.showcase',
      start: 'top top',
      end: '+=540%',
      pin: true,
      scrub: 0.7,
      invalidateOnRefresh: true,
    },
  })

  tl.fromTo('.cap-1', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.5 })
    .to([skiL, skiR], { rotationX: 0, scale: 1.04, duration: 4.6, ease: 'power1.out' }, '<')
    .to({}, { duration: 0.6 })
    .to('.cap-1', { autoAlpha: 0, y: -20, duration: 0.35 })

    .addLabel('split')
    .to([skiL, skiB2], { x: () => -split(), rotation: -11, duration: 1.2 }, 'split')
    .to([skiR, skiB], { x: () => split(), rotation: 11, duration: 1.2 }, 'split')
    .fromTo('.cap-2', { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.8 }, 'split+=0.3')
    .to({}, { duration: 0.7 })

    .addLabel('flip')
    .to('.cap-2', { autoAlpha: 0, duration: 0.4 }, 'flip')
    .to(skiR, { scaleX: 0, duration: 0.35, ease: 'power2.in' }, 'flip')
    .to(skiB, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 'flip+=0.35')
    .to(skiL, { scaleX: 0, duration: 0.35, ease: 'power2.in' }, 'flip+=0.2')
    .to(skiB2, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 'flip+=0.55')
    .to('.show-glow', { autoAlpha: 1, scale: 1.15, duration: 0.8 }, 'flip+=0.2')
    .fromTo('.cap-3', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 'flip+=0.6')
    .to({}, { duration: 0.8 })

    .addLabel('settle')
    .to(skiB2, { x: () => -split() * 0.35, rotation: 0, scale: 0.94, duration: 1 }, 'settle')
    .to(skiB, { x: () => split() * 0.35, rotation: 0, scale: 0.94, duration: 1 }, 'settle')
    .to('.show-glow', { autoAlpha: 0.35, duration: 1 }, 'settle')
    .to('.cap-3', { autoAlpha: 0, y: -16, duration: 0.4 }, 'settle+=0.4')
    .to({}, { duration: 0.4 })
}

function initConstruction() {
  const stages = gsap.utils.toArray<HTMLElement>('.bs')
  const media = gsap.utils.toArray<HTMLElement>('.bm')
  if (stages.length < 2) return

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.build',
      start: 'top top',
      end: '+=280%',
      pin: true,
      scrub: 0.6,
    },
  })

  stages.forEach((stage, i) => {
    if (i > 0) {
      const at = `stage${i}`
      tl.addLabel(at)
        .to(stages[i - 1], { autoAlpha: 0, y: -36, duration: 0.4 }, at)
        .to(media[i - 1], { autoAlpha: 0, scale: 1.05, duration: 0.5 }, at)
        .fromTo(stage, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.5 }, `${at}+=0.15`)
        .fromTo(media[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, `${at}+=0.1`)
    }
    tl.to({}, { duration: 1 })
  })
}

function initTraverse() {
  const track = document.querySelector<HTMLElement>('.track')
  if (!track) return

  const distance = () => track.scrollWidth - window.innerWidth
  gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    onUpdate: syncTopbar,
    scrollTrigger: {
      trigger: '.traverse',
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })
}

function syncTopbar() {
  const topbar = document.querySelector<HTMLElement>('.topbar')
  const brand = document.querySelector<HTMLElement>('.topbar .brand')
  const limePanel = document.querySelector<HTMLElement>('.panel-lime')
  if (!topbar || !brand || !limePanel) return
  const b = brand.getBoundingClientRect()
  const r = limePanel.getBoundingClientRect()
  const over = r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top
  topbar.classList.toggle('on-lime', over)
}
window.addEventListener('scroll', syncTopbar, { passive: true })
window.addEventListener('resize', syncTopbar, { passive: true })

if (!CSS.supports('animation-timeline: scroll()')) {
  console.warn(
    '[kore93] No native scroll-driven animation support — reveals/parallax degrade gracefully. ' +
      'Polyfill if needed: https://github.com/flackr/scroll-timeline',
  )
}
