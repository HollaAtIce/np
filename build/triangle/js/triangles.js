import * as d3 from 'd3'
import { TweenLite, TimelineLite } from 'gsap'

let targX = 0,
    targY = 0,
    anim = TweenLite

var svg = d3.select('body').append('svg')
    .attr('width', 500)
    .attr('height', 500)

var sqrt3 = Math.sqrt(3)

var triangle = svg.append('path')
    .attr('d', drawTriangle({ x: 100, y: 200 }, 30))
    .style('fill', 'black')
    .node()

triangle.side = 100
triangle.tHeight = h(100)
triangle.state = 0

function drawTriangle(start, side) {
    let height = h(side)
    return function() {
        return `M ${start.x} ${start.y} L ${start.x + side} ${start.y} L ${start.x + side/2} ${start.y - height} z`
    }
}

function h(side) {
    return Math.round(sqrt3 / 2 * side * 100) / 100
}


function moveTriangle(triangle, direction) {
    let rotation, newRotation,
        newState = triangle.state ? 0 : 1

    if (triangle.state === 0) {
        rotation = (direction - 1) * 120
        newRotation = 300
    } else {
        rotation = (direction * 120 + 180) % 360
        newRotation = 0
    }

    tl = new TimelineLite()

    tl.set(triangle, { rotation: rotation, transformOrigin: '50% 67%' })
        .to(triangle, 0.1, { scaleY: -1, transformOrigin: 'bottom' })
        .set(triangle, { scale: 1, transformOrigin: '50% 67%', rotation: newRotation })

    triangle.state = newState
    return tl
}


let tl = moveTriangle(triangle, 1)

tl.eventCallback('onComplete', moveToward, null, tl)

function moveToward() {
    let { top, left } = triangle.getBoundingClientRect(), dir
    if (Math.abs(top - targY) < 30 && Math.abs(left - targX) < 30) return setTimeout(moveToward, 10)

    if (Math.random() > 0.8) {
        dir = R(3)
        let tl = moveTriangle(triangle, dir)
        return tl.eventCallback('onComplete', moveToward, null, tl)
    }

    // triangle.state? point down : point up
    if (top < targY && left < targX) {
        //lower left
        dir = triangle.state ? 1 : 0
    } else if (top < targY && left >= targX) {
        // upper left
        dir = triangle.state ? 2 : 1
    } else if (top >= targY && left < targX) {
        // upper right
        dir = 0
    } else {
        //lower right
        dir = triangle.state ? 0 : 2
    }
    let tl = moveTriangle(triangle, dir)
    tl.eventCallback('onComplete', moveToward, null, tl)
}

document.body.onmousemove = function(e) {
    targX = e.clientX,
        targY = e.clientY
}

function R(max) {
    return Math.floor(Math.random()*max)
}