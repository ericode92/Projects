class Rectagle{

    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    set width(newWidth){
        if(newWidth > 0){
            this._width = newWidth;
        }
        else{
            console.error("Width must be a positive number");
        }
    }
}

const rectangle = new Rectagle(-1000000, "Pizza");

console.log(rectangle.width);
console.log(rectangle.height);