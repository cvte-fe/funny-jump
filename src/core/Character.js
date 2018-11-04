class Character {
  constructor(ele) {
    this.ele = ele;
    this.isJumping = false;

    this.run(200);
  }

  init(x, y) {
    this.ele.style.left = x + 'px';
    this.ele.style.bottom = y + 'px';
  }

  run(bottom) {
    this.ele.style.bottom = bottom + 'px';
  }

  jump(height) {
    // isJumping 确保在一次跳跃中不会产生其他跳跃
    if (!this.isJumping) {
      this.isJumping = true;

      this._increase(height).then(() => {
        return this._fall(height);
      }).then(() => {
        this.isJumping = false;
      });
    }
  }

  _increase(totalHeight) {
    return new Promise(resolve => {
      const increase = height => {
        const speed = Math.ceil((totalHeight - height) / 10);
        if (height < totalHeight) {
          window.requestAnimationFrame(() => {
            this._setEleHeight(height);
            increase(height + speed);
          });
        } else {
          resolve();
        }
      }

      increase(0);
    });
  }

  _fall(height) {
    return new Promise(resolve => {
      const fall = height => {
        const speed = Math.ceil(height / 12);
        if (height > 0) {
          window.requestAnimationFrame(() => {
            this._setEleHeight(height);
            fall(height - speed);
          });
        } else {
          this._setEleHeight(0);
          resolve();
        }
      }

      fall(height);
    });
  }

  _setEleHeight(height) {
    this.ele.style.transform = `translateY(${-height}px)`;
  }

  cry() {

  }
};

export default Character;