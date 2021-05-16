'use srtict'

let leftImgElement= document.getElementById('leftImg');
let centerImgElement= document.getElementById('centerImg');
let rightImgElement= document.getElementById('rightImg');

let leftImgIndex;
let centerImgIndex;
let rightImgIndex;

let maxClicks=25;
let userClicksNum=0;

let allImgs=[];

function Product(name, source){
this.name=name;
this.source=source;
this.clicks=0;
this.views=0;
allImgs.push(this);


}

new Product('bag','imgs/bag.jpg');
new Product('banana','imgs/banana.jpg');
new Product('bathroom','imgs/bathroom.jpg');
new Product('boots','imgs/boots.jpg');
new Product('breakfast','imgs/breakfast.jpg');
new Product('bubblegum','imgs/bubblegum.jpg');
new Product('chair','imgs/chair.jpg');
new Product('cthulhu','imgs/cthulhu.jpg');
new Product('dog-duck','imgs/dog-duck.jpg');
new Product('dragon','imgs/dragon.jpg');
new Product('pen','imgs/pen.jpg');
new Product('pet-sweep','imgs/pet-sweep.jpg');
new Product('scissors','imgs/scissors.jpg');
new Product('shark','imgs/shark.jpg');
new Product('sweep','imgs/sweep.png');
new Product('tauntaun','imgs/tauntaun.jpg');
new Product('unicorn','imgs/unicorn.jpg');
new Product('water-can','imgs/water-can.jpg');
new Product('wine-glass','imgs/wine-glass.jpg');


console.log(allImgs);

//  generate random index of imgs:
function randomImgsIndex (){
return Math.floor(Math.random() * allImgs.length);
}
//console.log(randomImgsIndex());

function renderThreeImgs(){
leftImgIndex=randomImgsIndex();
centerImgIndex=randomImgsIndex();
rightImgIndex=randomImgsIndex();

do{
  leftImgIndex=randomImgsIndex();
  centerImgIndex=randomImgsIndex();
  rightImgIndex=randomImgsIndex();
 }
 while ( leftImgIndex===rightImgIndex || leftImgIndex=== centerImgIndex || rightImgIndex===centerImgIndex);

console.log(leftImgIndex);
console.log(centerImgIndex);
console.log(rightImgIndex);


leftImgElement.src = allImgs[leftImgIndex].source;
centerImgElement.src = allImgs[centerImgIndex].source;
rightImgElement.src = allImgs[rightImgIndex].source;

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
            allImgs[leftImgIndex].clicks = allImgs[leftImgIndex].clicks + 1;

        }else if (event.target.id === 'centerImg') {
            allImgs[centerImgIndex].clicks = allImgs[centerImgIndex].clicks + 1;

        } else {
            allImgs[rightImgIndex].clicks = allImgs[rightImgIndex].clicks + 1;

        }
       

        renderThreeImgs();
    } else {
        leftImgElement.removeEventListener('click', handleUserClick);
        rightImgElement.removeEventListener('click', handleUserClick);

        // getting the element
        let list = document.getElementById('result');
        let liElement;
        for (let i = 0; i < allImgs.length; i++) {
          



            liElement = document.createElement('li');
            list.appendChild(liElement);
            liElement.textContent = `${allImgs[i].name} has ${allImgs[i].clicks}  votes and was seen ${allImgs[i].views} times. `;

        }
    }
}
console.log(allImgs);