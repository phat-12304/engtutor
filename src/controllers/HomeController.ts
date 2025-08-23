import { AnimationService } from '../services'
import type { CountState, CountTargets } from '../services/AnimationService'

export class HomeController {
  private counts: CountState = {
    students: 0,
    tutors: 0,
    lessons: 0,
    rating: 0
  }

  private animationTimer?: number
  private observer?: IntersectionObserver
  private onCountsUpdate: (counts: CountState) => void
  private onAnimationComplete: () => void

  constructor(
    onCountsUpdate: (counts: CountState) => void,
    onAnimationComplete: () => void
  ) {
    this.onCountsUpdate = onCountsUpdate
    this.onAnimationComplete = onAnimationComplete
  }

  startCountAnimation(element: Element, targets?: CountTargets): void {
    this.observer = AnimationService.createIntersectionObserver(
      element,
      0.5,
      () => {
        this.animationTimer = AnimationService.createCountAnimation(
          targets,
          2000,
          60,
          (counts) => {
            this.counts = counts
            this.onCountsUpdate(counts)
          },
          () => {
            this.onAnimationComplete()
          }
        )
      }
    )
  }

  stopAnimation(): void {
    if (this.animationTimer) {
      clearInterval(this.animationTimer)
    }
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  getCurrentCounts(): CountState {
    return this.counts
  }
}
