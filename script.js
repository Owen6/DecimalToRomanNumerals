const inputValue = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const output = document.getElementById('output');
const original = document.getElementById('original');
const outputLabel = document.getElementById('output-label');

const romanValues = [
  {name: 'M', value: 1000},
  {name: 'D', value: 500},
  {name: 'C', value: 100},
  {name: 'L', value: 50},
  {name: 'X', value: 10},
  {name: 'V', value: 5},
  {name: 'I', value: 1},
];

const convertRoman = (number, iter=0) => {
  if(iter === 7){
    return '';
  }else{
    return Math.floor(number/romanValues[iter].value) + ` ${convertRoman(number%romanValues[iter].value, iter + 1)}`
  }
}

const decimalToRoman = (number) => {
  const arrayValues = convertRoman(number).split(" ").slice(0,7).map(Number);
  console.log(arrayValues)
  const convertedArray = [];
  arrayValues.forEach((item,index,arr)=>{
    if(arr[index+1] > 3){
      switch(item){
        case 0: 
          convertedArray.push(romanValues[index+1].name, romanValues[index].name);
          break;
        default:
          convertedArray.push(romanValues[index+1].name, romanValues[index-1].name);
          break;
      }
      item = 0;
      arr[index+1] = 0;
    }else if(item !== 0){
      convertedArray.push(romanValues[index].name.repeat(item));
    }
  })
  return convertedArray.join('');
}

const checkInput = () => {
  const inputVal = parseInt(inputValue.value);

  original.innerText = "";
  output.innerText = "";

  if(!inputValue.value || isNaN(inputVal)){
    //console.log("Please enter a valid number")
    output.innerText = "Please enter a valid number";
    return NaN;
  }else if(inputVal <= 0){
    output.innerText = "Please enter a number greater than or equal to 1";
    return null;
  }else if(inputVal >= 4000){
    output.innerText = "Please enter a number less than or equal to 3999";
    return null;
  }else{
    original.innerText = inputValue.value;
    output.innerText = decimalToRoman(inputVal);
    inputValue.value = "";
    return true;
  }
}

convertButton.addEventListener('click', ()=>{
  console.log(checkInput());
})

//add Event listener to submit when enter is pressed
inputValue.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
})