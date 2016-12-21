 function Vector2D(x, y) {
     this.x = x || 0;
     this.y = y || 0;

     this.add = function(vector) {
         this.x += vector.x;
         this.y += vector.y;
         return this;
     }

     this.sub = function(vector) {
         this.x -= vector.x;
         this.y -= vector.y;
         return this;
     }

     this.mult = function(n) {
         this.x *= n || 0;
         this.y *= n || 0;
         return this;
     };
 }