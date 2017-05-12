var svg,
    grid = [],
    width = window.innerWidth,
    height = window.innerHeight,
    colors = ['blue', 'red', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'blue', 'green', 'green', 'green', 'green'],
    i = 0,
    targX = 0,
    targY = 0,
    click = 1,
    clickEl,
    counter = 0,
    flux = 1

// listeners 

document.addEventListener('DOMContentLoaded', ready)

document.onmousemove = function(e) {
    targX = e.pageX - 70
    targY = e.pageY
}

document.onclick = function() {
    counter = (counter + 1) % colors.length
}

// event handlers

function changeFlux() {
    flux = [0.001, 0.0014, 0.0006, -0.0007][Math.floor(Math.random() * 4)]
    setTimeout(changeFlux, Math.random() * 3000 + 1000)
}

setInterval(() => counter = (counter + 1) % colors.length, 10)
changeFlux()

function animate() {
    setTimeout(() => requestAnimationFrame(animate), 1)

    document.body.style.filter = 'hue-rotate(' + (i*9)%360 + 'deg)'

    targX = (100 - 70) * Math.cos(i * flux) + 2.2 * Math.cos((100 / 70 - 1) * i) + width / 2 // Math.sin(i/5) * 100 + width/2  
    targY = (100 - 70) * Math.sin(i * flux) - 2.2 * Math.sin((100 / 70 - 1) * i) + height / 2 // Math.sin(8.6 * Math.sin(i/10)) *  100 + height/2 
    
    for (let j = 0, l = grid.length; j < l; j++) {
        let ind = j
        let el = grid[j]
        i += flux
        el.classList.remove(colors[(counter + j) % colors.length], colors[(counter + j - 1) % colors.length])
        el.classList.add(colors[(counter + 1 + j) % colors.length], colors[(counter + 2 + j) % colors.length])
        el.style.width = el.style.height = 50 + ind*(0.1 * ind)
        ///el.style.height = 100 + (40 * Math.random())
        let mod = 1.1 - ind * 0.00099
        let tweenX = targX + (((+el.pastX || 0) - targX) / mod) + (Math.sin(i + (ind / 1000)) * ind ) * (1 + Math.cos(ind / 3) / 4)
        let tweenY = targY + (((+el.pastY || 0) - targY) / mod) + (Math.sin(i + (ind / 10)) * (ind * (ind / 9) / 1.5 - 50) / 3) - 5
        el.setAttribute('x', tweenX + ind * 0.02)
        el.setAttribute('y', tweenY + ind / 5)
        el.pastX = el.getAttribute('x')
        el.pastY = el.getAttribute('y')

    }
}
function ready() {
    svg = document.getElementById('svgbg')
    clickEl = document.getElementById('click')
    makeGrid(10, 3, 'rect', ['blue', 'screen'])
    setTarget()
    animate()
}

// utilities

function setTarget() {
    // targX = Math.random() * width
    // targY = Math.random() * height / 2
    // setTimeout(setTarget, Math.random() * 2000 + 500)
}

function makeGrid(x, y, elem, css) {
    var xOff = width / x,
        yOff = height / y / 2,
        ind = 0
    

    for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
            
            var box = document.createElementNS('http://www.w3.org/2000/svg', elem)
            box.classList.add(...css)
            box.setAttribute('width', i * 10 + j)
            box.setAttribute('height', 100)
            box.setAttribute('ry', 100)
            box.setAttribute('x', j * xOff)
            box.setAttribute('opacity', 1 - 0.03*ind)
            box.setAttribute('y', i * yOff + j * 10)
            grid.push(box)
            svg.appendChild(box)
            ind++
        }
    }
    return grid
}
