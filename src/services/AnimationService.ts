export interface CountTargets {
  students: number
  tutors: number
  lessons: number
  rating: number
}

export interface CountState {
  students: number
  tutors: number
  lessons: number
  rating: number
}

export class AnimationService {
  private static readonly DEFAULT_TARGETS: CountTargets = {
    students: 500,
    tutors: 50,
    lessons: 1000,
    rating: 4.9
  }

  private static readonly DEFAULT_DURATION = 2000 // 2 seconds
  private static readonly DEFAULT_STEPS = 60

  static createCountAnimation(
    targets: CountTargets = this.DEFAULT_TARGETS,
    duration: number = this.DEFAULT_DURATION,
    steps: number = this.DEFAULT_STEPS,
    onUpdate: (counts: CountState) => void,
    onComplete: () => void
  ) {
    const stepValue: { [key: string]: number } = {}
    
    Object.keys(targets).forEach(key => {
      stepValue[key] = targets[key as keyof CountTargets] / steps
    })
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      
      const currentCounts: CountState = {
        students: Math.min(Math.floor(currentStep * stepValue.students), targets.students),
        tutors: Math.min(Math.floor(currentStep * stepValue.tutors), targets.tutors),
        lessons: Math.min(Math.floor(currentStep * stepValue.lessons), targets.lessons),
        rating: Math.min(parseFloat((currentStep * stepValue.rating).toFixed(1)), targets.rating)
      }
      
      onUpdate(currentCounts)
      
      if (currentStep >= steps) {
        clearInterval(timer)
        onUpdate(targets)
        onComplete()
      }
    }, duration / steps)

    return timer
  }

  static createIntersectionObserver(
    element: Element,
    threshold: number = 0.5,
    onIntersect: () => void
  ) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect()
        }
      })
    }, { threshold })

    observer.observe(element)
    return observer
  }
}
