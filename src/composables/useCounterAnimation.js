import { ref } from "vue";

export function useCounterAnimation() {
  const animateCounter = (end, animationDuration = 2000) => {
    const displayCount = ref(0);
    let start = Math.min(0, end - 100); // Calculate a starting number based on the end
    let currentCount = start;
    const duration = animationDuration; // Duration of animation in milliseconds
    let timePassed = 0;
    
    const animate = () => {
      timePassed += 15; // Increase timePassed by 20ms
      const progress = timePassed / duration;
      
      // Adjust the easing function to slow down for the last 10 counts
      if (end - currentCount <= 100) {
        currentCount += (end - currentCount) / 10; // Slow down for the last 10 counts
      } else {
        currentCount = start + (end - start) * (1 - Math.pow(1 - progress, 2)); // Quadratic easing function
      }

      if (progress < 1) {
        displayCount.value = Math.ceil(currentCount);
        requestAnimationFrame(animate);
      } else {
        displayCount.value = end; // Ensure the counter ends at the exact number
      }
    };

    animate();
    
    return displayCount;
  };

  return animateCounter;
}
