class Ground {
  constructor(wrap) {
    this.wrap = wrap;
    this.width = 0;
  }

  addWall({
    x,
    width,
    height
  }) {
    const wall = document.createElement('li');
    wall.style.left = x + 'px';
    wall.style.top = -height + 'px';
    wall.style.width = width + 'px';
    wall.style.height = height + 'px';
    wall.className = 'wall';
    this.wrap.appendChild(wall);
  }

  move(offset) {
    this.width += offset;
    this.wrap.style.width = this.width + window.innerWidth + 'px';

    this._move(offset);
  }

  clear() {
    this.wrap.innerHTML = '';
    this.wrap.style.left = 0;
    this.width = 0;
  }

  _move(offset) {
    const speed = 10;
    if (offset > 0) {
      const offsetLeft = this.wrap.offsetLeft;
      window.requestAnimationFrame(() => {
        this.wrap.style.left = offsetLeft - offset + 'px';
        this._move(offset - speed);
      });
    }
  }
}

export default Ground;