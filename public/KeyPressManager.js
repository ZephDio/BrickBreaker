class KeyPressManager {
  constructor(onKeyPress, key) {
    this.isPressed = false;
    window.addEventListener('keydown', (event) => {
        if (event.key === key) {
          if (this.isPressed === false) {
            onKeyPress();
          }
          this.isPressed = true;
        }
      });
    window.addEventListener('keyup', (event) => {
        if (event.key === key) {
            this.isPressed = false;
        }
    })


    }
    
}

