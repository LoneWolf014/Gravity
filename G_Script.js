let canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// variables 
let mouse = {
    x : innerWidth/2,
    y : innerHeight/2
};

let colors = [
    "#610C9F",
    "#940B92",
    "#DA0C81",
    "#E95793",
    "#C62A88"
];

// Event Listeners

addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener("click", function() {
    init();
});

// Utilities / Important Functions
function randomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
let gravity = 1;
let friction = 0.59;

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if(((this.y + this.radius + this.dy) > canvas.height))
        {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if((this.x + this.radius + this.dx > canvas.width) || (this.x - this.radius < 0))
        {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();

        // Shadow
        // c.shadowColor = this.color;
        // c.shadowBlur = 20;
    };
};

// Implementation
let ballArray;
function init() {
    ballArray = [];
    for (let i = 0; i < 500; i++) {
        
        let radius = randomIntRange(10, 30);
        let x = randomIntRange(radius, canvas.width - radius);
        let y = randomIntRange(0, canvas.height - radius);
        let dx = randomIntRange(-2, 2);
        let dy = randomIntRange(-2, 2);
        let color = randomColor(colors);

        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// Animation Loop

function Animate() {
    requestAnimationFrame(Animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

init();
Animate();