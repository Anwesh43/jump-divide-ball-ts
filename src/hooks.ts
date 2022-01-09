import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.01
const sizeFactor : number = 11.2 
export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            clearInterval(interval)
                            setAnimated(false)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h, 
    }
}

const maxScale = (scale : number, i : number, n : number) => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / sizeFactor 
    const sf : number = sinify(scale)
    const sc1 : number = divideScale(sf, 0, 2)
    const sc2 : number = divideScale(sf, 1, 2)
    const position = 'absolute'
    const background = 'indigo'
    const width = `${size}px`
    const height = `${size}px`
    return {
        blockStyle(i : number) : CSSProperties {
            const left : string = `${w / 2 - (1 - 2 * i) * (w / 2 - size / 2) * sc2}px`
            const top : string = `${h - size - (h / 2 - size / 2) * sc1}px`
            const borderRadius : string = `50%`
            return {
                background, 
                position, 
                width, 
                height,
                left,
                top,
                borderRadius
            }

        }
    }
    
}