
"use strict";

const app = new PIXI.Application(600,600);
console.log(document.getElementById("#here"));
document.getElementById("here").appendChild(app.view);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;
const bounds = 50;

let stage;

//scenes
let startScene;
let gameScene;
let gameOverscene;
let rightkey;
let leftkey;
let upkey;
let downkey;

let Wkey,Skey,Akey,Dkey;

PIXI.loader.add([
    "images/sprites/danklord.png","images/sprites/door.png","images/sprites/enemyshot.png","images/sprites/heart.png",
    "images/sprites/robot.png","images/sprites/fireball.png","images/sprites/rock.png","images/sprites/room.png",
    "images/sprites/turret.png","images/sprites/walkingenemy.png"
]).on("progress",e=>{console.log(`progress=${e.progress}`)}).
load(setUp);

let player;
let currentroom;
let enemies;
let life = 3;
let paused = true;
let startRoom;
let bullets;
let currentroom;
let rooms;

function setUp(){
    app.ticker.add(gameLoop);

    startScene = new PIXI.Container();
    startScene.visible = true;
    let stage = app.stage;
    
    stage.addChild(startScene);
    
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    gameOverscene = new PIXI.Container();
    gameOverscene.visible = false;
    stage.addChild(gameOverscene);

    createLabelsandButtons();

    player = new Character();
    startRoom = new PIXI.Sprite(PIXI.loader.resources["images/sprites/room.png"].texture);
    currentroom = startroom;
    currentroom.height = sceneHeight;
    currentroom.width = sceneWidth;
    
    //initrooms();
    gameScene.addChild(startRoom);

    setKeys();
    bullets = [];
}


function gameLoop(){
    //delta time
    let dt = 1/app.ticker.FPS;
    if(dt>1/12)dt = 1/12;

    //move player
    player.move();

    //move bullets
    for(let i = 0;i < bullets.length;i++){
        bullets[i].move();
    }

    //move enemies

    //check for collisions

    //clean up

    //game over?

    
}

const SPEED = 2.5;

function setKeys(){
     rightkey = keyboard("ArrowRight");
     leftkey = keyboard("ArrowLeft");
     upkey =  keyboard("ArrowUp");
     downkey = keyboard("ArrowDown");
    console.log(Wkey);
     Wkey = keyboard("w");
     Skey = keyboard("s");
     Dkey = keyboard("d");
     Akey = keyboard("a");
    
    rightkey.press = () => {
        player.vx = SPEED;
    }
    rightkey.release = () =>{
        if(!leftkey.isDown)player.vx = 0;
    }

    leftkey.press = () => {
         player.vx = -SPEED;
    }
    leftkey.release = () =>{
        if(!rightkey.isDown)player.vx = 0;
    }

    upkey.press = () => {
        player.vy = -SPEED;
        console.log("up pressed");
    }
    upkey.release = () =>{
        if(!downkey.isDown)player.vy = 0;
    }
    downkey.press = () => {
        player.vy = SPEED;
    }
    downkey.release = () =>{
        if(!upkey.isDown)player.vy = 0;
    }

    Wkey.press = () => {
        fireBullet(0,-5);
    }
    Skey.press = () => {
        fireBullet(0,5);
    }
    Dkey.press = () => {
        fireBullet(5,0);
    }
    Akey.press = () => {
        console.log("here");
        fireBullet(-5,0);
    }


}

function initrooms(){
    rooms = [];
    for(let i = 0; i < 9;i++){
        rooms[i] = new Room();
        rooms[i].height = sceneHeight;
        rooms[i].width = sceneWidth;
        rooms[i].visible = false;
        stage.addChild(rooms[i]);
    }
    makeConnection(rooms[0],rooms[1],true);
    makeConnection(rooms[1],rooms[2],true);
    makeConnection(rooms[3],rooms[2],false);
    makeConnection(rooms[4],rooms[3],true);
    makeConnection(rooms[2],rooms[6],false);
    makeConnection(rooms[2],rooms[5],true);
    makeConnection(rooms[5],rooms[8],true);
    makeConnection(rooms[7],rooms[5],false);

    rooms[0].visible = true;
    
}

function createLabelsandButtons(){
    let buttonStyle = new PIXI.TextStyle({
        fill:0xFF000,
        fontSize:48,
        fontFamily:"Futura"
    });
    let startLabel1 = new PIXI.Text("Test");
    startLabel1.style = new PIXI.TextStyle({
        fill:0xFFFFFF,
        fontSize:96,
        fontFamily:'Futura',
        stroke:0xFF000,
        strokeThickness:6
    });
    startLabel1.x = 50;
    startLabel1.y = 120;
    startScene.addChild(startLabel1);



    let startButton = new PIXI.Text("Enter, .. if you dare!");
    startButton.style = buttonStyle;
    startButton.x = 80;
    startButton.y = sceneHeight - 100;
    startButton.interactive = true;
    startButton.buttonmode = true;
    startButton.on("pointerup",startGame);
    startButton.on("pointerover",e=>e.target.alpha = 0.7);
    startButton.on("pointerout",e=>e.currentTarget.alpha = 1.0);
    
    startScene.addChild(startButton);

}

function startGame(){
    startScene.visible = false;
    gameOverscene.visible = false;
    gameScene.visible = true;

    gameScene.addChild(player);
}

function fireBullet(vx,vy){
    let b = new Bullet(vx,vy);
    bullets[bullets.length] = b;
    gameScene.addChild(b);
}

function changeRoom(){
    
}