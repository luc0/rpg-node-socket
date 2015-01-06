var Controls = function(){
    this.keysNames = {
        38  :  "up",
        39  :  "right",
        40  :  "down",
        37  :  "left",
        65  :  "attack",
        81  :  "take", // INVENTARIO
        69  :  "drop" // INVENTARIO
    }
    this.keys = {};
    this.eventsDown = {
        "nothing":function(){},
        "up":function(){},
        "right":function(){},
        "down":function(){},
        "left":function(){},
        "attack":function(){},
        "take":function(){}, // INVENTARIO
        "drop":function(){} // INVENTARIO
    }
    this.eventsUp = {
        "nothing":function(){},
        "up":function(){},
        "right":function(){},
        "down":function(){},
        "left":function(){},
        "attack":function(){},
        "take":function(){}, // INVENTARIO
        "drop":function(){} // INVENTARIO
    }

    this.init = function(){
        (function(self){
            document.onkeydown = function (e) {
                var e = e || window.event;
                var charCode = e.charCode || e.keyCode;
                self.keys[self.keysNames[charCode] || "nothing"] = true;
                self.triggerDown();
            };

            document.onkeyup = function (e) {
                var e = e || window.event;
                var charCode = e.charCode || e.keyCode;
                self.keys[self.keysNames[charCode] || "nothing"] = false;
                self.triggerUp();
            };
        })(this);
    }

    this.triggerDown = function(){
        for( key in this.keys ){
            if(this.keys[key] == true )
                this.eventsDown[key]();
        }
    }

    this.triggerUp = function(){
        for( key in this.keys ){
            if(this.keys[key] == false )
                this.eventsUp[key]();
        }
    }
}
