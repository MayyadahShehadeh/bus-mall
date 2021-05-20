'use srtict';

let leftImgElement= document.getElementById('leftImg');
let centerImgElement= document.getElementById('centerImg');
let rightImgElement= document.getElementById('rightImg');

let leftImgIndex;
let centerImgIndex;
let rightImgIndex;

let maxClicks=10;
let userClicksNum=0;

// global products names array:
let imgsNames=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];

//global objects array:

// Shown and clicked imgs arrays:
let ShownImgs=[];
let clickedImgs=[];

let compareArray=[];

function Product(name){
    this.name=name;
    this.source=`imgs/${name}.jpg`;
    this.clicks=0;
    this.shown=0;
    Product.allImgs.push(this);
    addItems();
    
}
Product.allImgs=[];

//local storage//
function addItems(){
    let data=JSON.stringify(Product.allImgs);
//    console.log('stringfied obj',data);
   localStorage.setItem('products', data); 

}
function displayData() {
    let bussData = localStorage.getItem('product');
    let storedData = JSON.parse(bussData);
    if (storedData !== null) {
      Product.allImgs = storedData;
    }
  
  }




for (let i = 0; i < imgsNames.length; i++) {
    
    new Product(imgsNames[i]);
}


console.log(Product.allImgs);

//  generate random index of imgs:
function randomImgsIndex (){
return Math.floor(Math.random() * imgsNames.length);
}
//console.log(randomImgsIndex());

compareArray=[leftImgIndex, centerImgIndex,rightImgIndex];

function renderThreeImgs(){
leftImgIndex=randomImgsIndex();
centerImgIndex=randomImgsIndex();
rightImgIndex=randomImgsIndex();


do{
  leftImgIndex=randomImgsIndex();
  centerImgIndex=randomImgsIndex();
  rightImgIndex=randomImgsIndex();
 }
 while ( leftImgIndex===rightImgIndex || leftImgIndex=== centerImgIndex || rightImgIndex===centerImgIndex||
        compareArray.includes(leftImgIndex)||
        compareArray.includes(centerImgIndex) ||
        compareArray.includes(rightImgIndex)
    )


leftImgElement.src = Product.allImgs[leftImgIndex].source;
centerImgElement.src = Product.allImgs[centerImgIndex].source;
rightImgElement.src = Product.allImgs[rightImgIndex].source;

Product.allImgs[leftImgIndex].shown++;
Product.allImgs[centerImgIndex].shown++;
Product.allImgs[rightImgIndex].shown++;

leftImgIndex.alt=Product.allImgs[leftImgIndex].name;
centerImgIndex.alt=Product.allImgs[centerImgIndex].name;
rightImgIndex.alt=Product.allImgs[rightImgIndex].name;

compareArray.push(leftImgIndex.alt);
compareArray.push(centerImgIndex.alt);
compareArray.push(rightImgIndex.alt);

}
renderThreeImgs();






leftImgElement.addEventListener('click',handleUserClick);
centerImgElement.addEventListener('click',handleUserClick);
rightImgElement.addEventListener('click',handleUserClick);



function handleUserClick(event) {

    userClicksNum++;
    if (userClicksNum <= maxClicks) {
        console.log(userClicksNum);

        if (event.target.id === 'leftImg') {
            Product.allImgs[leftImgIndex].clicks = Product.allImgs[leftImgIndex].clicks + 1;

        }else if (event.target.id === 'centerImg') {
            Product.allImgs[centerImgIndex].clicks = Product.allImgs[centerImgIndex].clicks + 1;

        } else {
            Product.allImgs[rightImgIndex].clicks = Product.allImgs[rightImgIndex].clicks + 1;

        }
       
      

        renderThreeImgs();
    } else {
        leftImgElement.removeEventListener('click', handleUserClick);
        rightImgElement.removeEventListener('click', handleUserClick);

      
        
            
        
    }
}
console.log(Product.allImgs);


let list = document.getElementById('result');
let button = document.getElementById('btn');
button.addEventListener('click',showResult);

function showResult(){

    for (let i = 0; i < imgsNames.length; i++) {
        ShownImgs.push(Product.allImgs[i].shown);
        clickedImgs.push(Product.allImgs[i].clicks);


        let liElement = document.createElement('li');
        list.appendChild(liElement);
        liElement.textContent = `${Product.allImgs[i].name} has ${Product.allImgs[i].clicks}  votes and was seen ${Product.allImgs[i].shown} times. `;

    }

    viewChart();
}

function viewChart(){
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgsNames,
            datasets: [{
                label: '# of Votes',
                data: clickedImgs,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)'
                  
                ],
                borderColor: [
                   
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1

            }, {
                label: '# of shown',
                backgroundColor:'lightblue',
                borderColor: 'rgba(255, 159, 64, 1)',
                data: ShownImgs,

            }]
        },
        options: {
            
        }
    });


}
displayData();