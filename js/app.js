'use srtict';

let leftImgElement= document.getElementById('leftImg');
let centerImgElement= document.getElementById('centerImg');
let rightImgElement= document.getElementById('rightImg');

let leftImgIndex;
let centerImgIndex;
let rightImgIndex;

let maxClicks=25;
let userClicksNum=0;

// global products names array:
let imgsNames=['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];

//global objects array:
let allImgs=[];

// Shown and clicked imgs arrays:
let ShownImgs=[];
let clickedImgs=[];

let compareArray=[];

function Product(name, source){
    this.name=name;
    this.source=source;
    this.clicks=0;
    this.shown=0;
    allImgs.push(this);
    
}

for (let i = 0; i < imgsNames.length; i++) {
    
    new Product(imgsNames[i],`imgs/${imgsNames[i]}.jpg`);
}



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



leftImgElement.src = allImgs[leftImgIndex].source;
centerImgElement.src = allImgs[centerImgIndex].source;
rightImgElement.src = allImgs[rightImgIndex].source;

allImgs[leftImgIndex].shown++;
allImgs[centerImgIndex].shown++;
allImgs[rightImgIndex].shown++;

leftImgIndex.alt=allImgs[leftImgIndex].name;
centerImgIndex.alt=allImgs[centerImgIndex].name;
rightImgIndex.alt=allImgs[rightImgIndex].name;

compareArray.push(leftImgIndex.alt);
compareArray.push(centerImgIndex.alt);
compareArray.push(rightImgIndex.alt);

}
renderThreeImgs();


function notSameImgs(){
    while (compareArray.includes(allImgs[leftImgIndex]) || compareArray.includes(allImgs[centerImgIndex]) || compareArray.includes(allImgs[rightImgIndex]));{
        leftImgIndex=randomImgsIndex();
        centerImgIndex=randomImgsIndex();
        rightImgIndex=randomImgsIndex();
    }

}
notSameImgs();



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

      
        
            
        
    }
}
console.log(allImgs);



let list = document.getElementById('result');
let button = document.getElementById('btn');
button.addEventListener('click',showResult);

function showResult(){
    for (let i = 0; i < allImgs.length; i++) {
        ShownImgs.push(allImgs[i].shown);
        clickedImgs.push(allImgs[i].clicks);


        let liElement = document.createElement('li');
        list.appendChild(liElement);
        liElement.textContent = `${allImgs[i].name} has ${allImgs[i].clicks}  votes and was seen ${allImgs[i].shown} times. `;
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
