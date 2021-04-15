class Vec3{
    constructor( x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    //task 2

    min(){
        var min = this.x;
        if(this.y < this.z){
            if(this.y < min){
                min = this.y;
            }
        }else if(this.z < min){
            min = this.z;
        }
        return min;
    }

    max(){
        var max = this.x;
        if(this.y > this.z){
            if(this.y > max){
                max = this.y;
            }
        }else if(this.z > max){
            max = this.z;
        }
        return max;
    }

    mid(){
        var vec = [ this.x, this.y, this.z];
        var min = this.min();
        var max = this.max();
        var vec_new = [ min, 0, max];
        var min_num,max_num;

        for(var i=2; i>=0; i--){
            if(vec[i] == min){
                min_num = i;
            }
            if(vec[i] == max){
                max_num = i;
            }
        }

        for(var i=0; i<3; i++){
            if(i!=min_num && i!=max_num){
                vec_new[1] = vec[i];
            }
        }
        return vec[1];
    }


    //task 3
    
    sub(v){
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
}
        