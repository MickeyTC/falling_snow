const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const setup = () => {
  const canvas = document.getElementById('falling-snow-canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  return {
    canvas,
    canvasContext: canvas?.getContext('2d'),
    numSnowBalls: Math.floor((canvas.width * canvas.height) / 2400),
  }
}

const createSnowBalls = (canvas, numSnowBalls) => {
  return [...Array(numSnowBalls)].map(() => ({
    x: random(0, canvas.width),
    y: random(0, canvas.height),
    radius: random(1, 3),
    opacity: random(0.5, 1),
    speedX: random(-3, 3),
    speedY: random(1, 3),
  }))
}

const drawSnowBall = (canvasContext, snowBall) => {
  const { x, y, radius, opacity } = snowBall
  canvasContext.beginPath()
  canvasContext.arc(x, y, radius, 0, Math.PI * 2)
  canvasContext.fillStyle = `rgba(255, 255, 255, ${opacity})`
  canvasContext.fill()
}

const moveSnowBall = (canvas, snowBall) => {
  snowBall.x = (snowBall.x + snowBall.speedX + canvas.width) % canvas.width
  snowBall.y = (snowBall.y + snowBall.speedY + canvas.height) % canvas.height
}

let timer

const run = () => {
  const { canvas, canvasContext, numSnowBalls } = setup()
  const snowBalls = createSnowBalls(canvas, numSnowBalls)
  timer = setInterval(() => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snowBalls.forEach(snowBall => drawSnowBall(canvasContext, snowBall))
    snowBalls.forEach(snowBall => moveSnowBall(canvas, snowBall))
  }, 50)
}

const resizeCanvas = () => {
  clearInterval(timer)
  run()
}

window.addEventListener('resize', resizeCanvas, false)

run()
