class Room extends PIXI.Sprite{

    //pass in connections to other rooms
    //layout is a 2d array that puts in obstacles and stuff. height:20 width:10
    constructor(layout = null){
        super(PIXI.loader.resources["images/sprites/room.png"].texture);
        this.left = null;
        this.right = null;
        this.up = null;
        this.down = null;
        this.layout = layout;
        this.cleared = false;
    }

    


}
class Door extends PIXI.Sprite{
    constructor(x=0,y=0,quarters){
        super(PIXI.loader.resources["images/sprites/door.png"].texture);
        this.x = x;
        this.y = y;
        this.rotation = quarters * Math.PI / 2;
        this.anchor.set(.5,.5);
        this.visible = false;
    }
}
class Character extends PIXI.Sprite{
    constructor(x=250,y=250){
        super(PIXI.loader.resources["images/sprites/danklord.png"].texture);
        this.anchor.set(.5,.5);
        this.scale.set(.5);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;
        
    }
}

class Bullet extends PIXI.Sprite{
    constructor(vx,vy){
        super(PIXI.loader.resources["images/sprites/enemyshot.png"].texture);
        this.x = player.x;
        this.y = player.y;
        this.vx = vx;
        this.vy = vy;
    }

    move(){
        if(this.x + this.vx < sceneWidth - bounds && this.x + this.vx > bounds){
            this.x += this.vx;
        }
        if(this.y + this.vy < sceneHeight - bounds && this.y + this.vy > bounds){
            this.y += this.vy;
        }
    }
}

class Enemy extends PIXI.Sprite{
    constructor(x,y){
        super(PIXI.loader.resources["images/sprites/turret.png"].texture);
        this.x = x;
        this.y = y;
    }
}

class Turret extends PIXI.Sprite{
    constructor(x,y){
        super(PIXI.loader.resources["images/sprites/turret"].texture)
        this.x = x;
        this.y = y;

    }
}