export default class SliderService {
    static timer(time, useIndex, index, slider) {
        if (slider.length != 0) {
            const interval = setInterval(() => {
              if (index=== slider.length -1 ) {useIndex(0); console.log(slider.length)}
              else(useIndex(index + 1))
            }, time);
            return () => clearInterval(interval);
          }
    }
}