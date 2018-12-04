
//learned how to do this from https://github.com/kittykatattack/learningPixi#keyboard
function keyboard(value){
    let key = {
        value:value,
        isDown: false,
        isUp:true,
        press:undefined,
        release:undefined
    }

    key.downHandler = event => {
        if(event.key === key.value){
            if(key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };
    
    key.upHandler = event => {
        if(event.key === key.value){
            if(key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    }

    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
      );
      window.addEventListener(
        "keyup", upListener, false
      );
      
      key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
      };
      
      return key;

}

function getSin(x,y){
    let z = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    return Math.sin(x/z);
}

function makeConnection(r1,r2,vert){
    if(vert){
        r1.up = r2;
        r2.down = r1;
    }else{
        r1.left = r2;
        r2.right = r1;
    }
}