class VirusDna{
    /*
A = 1;
T = 2;
C = 4;
G = 8;
ATCG
*/
    constructor(){
        this.sequence = "ATCG"
    }


    toValue(){
        let value = 0;
        for (let i = 0; i < 4; i++) {
            switch(this.sequence[i]){
                case 'A': value+=0;break;
                case 'T': value+=1;break;
                case 'C': value+=2;break;
                case 'G': value+=4;break;
            }
        }   
        return value;
    }
    fromValue(number){

        if(number>16){
            number = number%16;
        }

        for (let i = 4; i > 0; i--) {
            
        }
        /*
            

        */
    }

    set(string){
        this.sequence = string;
    }
}