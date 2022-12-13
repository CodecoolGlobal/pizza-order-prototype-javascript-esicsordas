function iter (array){
    function next (item, index){
        console.log(item);
        if (index + 1 < array.length){
            next(array[index + 1], index + 1);
        }
    }
    next(array[0], 2);
}

const valami = [0,1,2,3,4,5,6,7,8,9,10];

iter(valami);
