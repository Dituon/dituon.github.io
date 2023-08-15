import stickers from "./module/stickers.js"

const sticker = stickers[Math.floor(Math.random() * stickers.length)]

document.body.style.setProperty('--sticker-url', `url(/stickers/${sticker}.png)`)

let flag = false
const scrollFun = () => {
    const windowScrollY = window.scrollY
    let scroll = windowScrollY / (document.body.offsetHeight - window.innerHeight)
    document.body.style.setProperty('--scroll', scroll)

    if (flag && windowScrollY === 0) {
        removeEventListener('scroll', scrollFun)
        document.body.style.minHeight = 'unset'
        document.body.style.setProperty('--flag', 'none')
        importAnimationStyle()
    }

    if (scroll < 0.99) return

    flag = true
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
}
window.addEventListener('scroll', scrollFun, false)

const titleElement = document.getElementById('title')
const importAnimationStyle = function () {
    const animationStyleElement = document.createElement('link')
    animationStyleElement.rel = 'stylesheet'
    animationStyleElement.href = '/style/content-animation.css'
    document.head.appendChild(animationStyleElement)

    const hoverStyleElement = document.createElement('link')
    hoverStyleElement.rel = 'stylesheet'
    hoverStyleElement.href = '/style/content-hover.css'
    document.head.appendChild(hoverStyleElement)
    titleElement.addEventListener(
        'click',
        () => hoverStyleElement.remove(),
        { once: true }
    )
}
