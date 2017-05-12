import {
    TweenMax,
    TimelineLite,
    Elastic
} from 'gsap'
const customEase = require('bezier-easing')




document.addEventListener('DOMContentLoaded', ready)

// initialize

function ready() {
    toggle = $('.toggle')
    holder = $('#holder')[0]
    experiment = $('#experiment')[0]
    bio = $('#bio')[0]
    skills = $('#skills')[0]
    slider = $('#slider')[0]
    header = $('header')[0]

    // listeners
    toggle.forEach(e => e.addEventListener('click', toggleExperiments))

    window.onresize = resizeUpdate
    setupHeadline()
    resizeUpdate()
}

let clickTimer = false,
    restartTimer,
    letters,
    primary = '#d5ece7',
    primary_dark = '#7208fd',
    primary_darker = '#4f3a6b',
    text_primary = 'white', //'#888',
    text_light = 'white',
    state = 'bio',
    duration = 0.4,
    toggle, header, holder, bio, experiment, slider, skills,
    swoop = customEase(0.52, 0.85, 0.93, 0.51),
    heights,
    offsets

let states = {
    experiment: {
        text: text_light,
        bg: primary_darker,
        holderBg: primary,
        headerText: primary
    },
    bio: {
        text: text_primary,
        bg: primary,
        holderBg: '#6122b3',
        headerText: primary_dark
    },
    skills: {
        text: '#000000',
        bg: '#FFFFFF',
        holderBg: '#FFFFFF',
        headerText: '#DDDDDD'
    }
}

let $ = document.querySelectorAll.bind(window.document)

// handlers



function toggleExperiments(e) {
    event.preventDefault()

    let targetHeight, slide

    switch (e.target.dataset.to) {
    case 'experiments':
        state = 'experiment'
        targetHeight = experiment.getBoundingClientRect().height - 20
        slide = -getComputedStyle(bio).height.slice(0, -2) - 20
        break
    case 'bio':
        state = 'bio'
        targetHeight = bio.getBoundingClientRect().height - 20
        slide = 0
        break
    case 'skills':
        state = 'skills'
        targetHeight = skills.getBoundingClientRect().height
        slide = -getComputedStyle(bio).height.slice(0, -2) - getComputedStyle(experiment).height.slice(0, -2) - 40
    }

    let { holderBg, bg, text, headerText } = states[state]


    holder.classList.toggle('mds1')

    TweenMax.to(holder, duration, {
        backgroundColor: holderBg,
        color: text,
        height: targetHeight,
        opacity: 1,
        ease: swoop
    })

    TweenMax.to(header, duration, {
        ease: swoop,
        color: headerText
    })

    TweenMax.to(document.body, duration, {
        backgroundColor: bg,
        ease: swoop
    })

    TweenMax.to(slider, duration, {
        y: slide,
        ease: swoop
    })
}

// utilities

function resizeUpdate() {
    heights = {
        bio: getComputedStyle(bio).height,
        skills: getComputedStyle(skills).height,
        experiment: getComputedStyle(experiment).height
    }

    offsets = {
        bio: 0,
        experiment: -heights.bio.slice(0, -2) - 20,
        skills: -heights.bio.slice(0, -2) - heights.experiment.slice(0, -2) - 40
    }

    holder.style.height = heights[state]

    TweenMax.set(slider, {
        y: offsets[state]
    })
    
}

function setupHeadline() {
    let headline = document.getElementById('greeting')

    splitText(headline)
    addWiggles(headline)
    letters = document.getElementsByClassName('headline-letter')
    setTimeout(() => shake([letters[0], letters[3], letters[7], letters[14]], 15, 0.08), 3000)
}


function splitText(el) {
    let text = el.textContent || el.innerText
    let words = []
    let word = document.createElement('span')
    el.textContent = ''
    text = text.split('')

    text.forEach(letter => {
        let temp = document.createElement('small')
        temp.textContent = letter
        temp.classList.add('headline-letter')
        if (letter === ' ') {
            temp.classList.add('headline-space')
            word = document.createElement('span')
            word.classList.add('headline-word')
        }
        word.append(temp)
        words.push(word)
        let pos = temp.getBoundingClientRect()
    })

    words.forEach(word => el.append(word))

}

function addWiggles(parent) {
    function handler() {
        if (clickTimer) return
        if (event.target.nodeName === 'SMALL') {
            let dir = setDirection(event)
            shake(event.target, 5, 0.1, false, dir)
        }
    }
    parent.addEventListener('mousemove', handler)
    parent.addEventListener('touchmove', handler)
}

function setDirection(event) {
    return {
        x: (event.offsetX - event.target.clientWidth / 2) / event.target.clientWidth,
        y: (event.offsetY - event.target.clientHeight / 2) / event.target.clientHeight,
    }
}

function resetLetters() {
    clickTimer = true
    let letters = [].slice.call(document.getElementsByClassName('headline-letter'))

    TweenMax.staggerTo(letters, 0.8, {
        ease: Elastic.easeOut.config(1, 0.4),
        x: 0,
        y: 0,
        rotation: 0
    }, 0.07)

    setTimeout(() => clickTimer = false, 1500)
}

function shake(el, shakes, speed, revert = true, dir = { x: 0, y: 0 }, delay) {
    clearTimeout(restartTimer)
    restartTimer = setTimeout(resetLetters, 2000)

    if (el instanceof HTMLCollection || el instanceof Array) {
        for (let child of el) {
            shake(child, shakes, speed, revert, dir, delay)
        }
        return
    }

    var tl = new TimelineLite({ delay })
    TweenMax.set(el, {
        x: '+=0'
    })
    var transforms = el._gsTransform

    var initProps = {
        x: transforms.x,
        y: transforms.y,
        rotation: transforms.rotation
    }

    for (var i = 0; i < shakes; i++) {
        tl.to(el, speed, {
            x: initProps.x + R(-4, 4) - dir.x * 20,
            y: initProps.y + R(-2, 2) - dir.y * 20,
            rotation: initProps.rotation + R(-20, 10)
        })
    }

    if (revert) tl.to(el, speed, {
        x: initProps.x,
        y: initProps.y,
        scale: initProps.scale,
        rotation: initProps.rotation
    })

    return tl

}

function R(max, min) {
    return Math.random() * (max - min) + min
}
