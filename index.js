/**
 * Created by Administrator on 2017/7/9.
 */

var timer;

var canvasWidth = window.innerWidth //画布的宽度

var canvasHeight = window.innerHeight //画布的高度

var cvs = document.getElementById('canvas') //获取画布
var context = cvs.getContext('2d')

cvs.width = canvasWidth //设置宽高

cvs.height = canvasHeight

var image = new Image()

var radius = 80

//剪辑的变量
var clippingRegion = {x: -1 , y: -1 , r: 50}
var leftMargin = 0 , topMargin = 0

image.src = '1.jpg'

image.onload = function (e) {

    $('.blur').css({
        'width' : canvasWidth+'px',
        'height' : canvasHeight+'px'
    })

    $('#image').css({
        'width' : image.width+'px',
        'height' : image.height+'px'
    })

    leftMargin = (image.width - cvs.width)/2
    topMargin = (image.height - cvs.height)/2

    $('#image').css({
        'top' : String(-topMargin)+'px',
        'left' : String(-leftMargin)+'px'
    })

    initCanvas()
}

function initCanvas() {

    var theleft= leftMargin<0? -leftMargin:0
    var thetop= topMargin<0? -topMargin:0
    clippingRegion= {x: Math.random()*(cvs.width-2*radius-2*theleft)+radius+theleft,
                     y: Math.random()*(cvs.height-2*radius-2*thetop)+radius+thetop , r: radius}
    draw( image , clippingRegion )
}

function setClippingRegion( clippingRegion ) {

    context.beginPath()
    context.arc( clippingRegion.x , clippingRegion.y , clippingRegion.r , 0 , Math.PI*2 , false )
    context.clip()
}

function draw( image , clippingRegion) {

    context.clearRect( 0 , 0 , cvs.width , cvs.height )

    context.save()

    setClippingRegion( clippingRegion )

    context.drawImage( image ,
        Math.max(leftMargin,0) , Math.max(topMargin,0) ,
        Math.min(cvs.width,image.width) , Math.min(cvs.height,image.height) ,
        leftMargin<0? -leftMargin:0 , topMargin<0? -topMargin:0 ,
        Math.min(cvs.width,image.width) , Math.min(cvs.height,image.height) )

    context.restore()
    
}

function reset() {
    clearInterval(timer)
    initCanvas()
}

function show() {
    clearInterval(timer)
    timer = setInterval(
        function () {
            clippingRegion.r += 20
            if(clippingRegion.r > 2*Math.max(cvs.width,cvs.height) ) {
                clearInterval(timer)
            }
            draw( image , clippingRegion )
        },
        30
    )
}

cvs.addEventListener('touchstart',function (e) {
    e.preventDefault()
})