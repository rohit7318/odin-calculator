const buttonsContainer = document.querySelector('.buttons-container');
const finalResultEl = document.querySelector('#final-result');
const typedTextEl = document.querySelector('#typing');
const htmlEl = document.documentElement;
const toggleThemeBtn = document.querySelector('#toggle-theme');


const showHistoryDiv  = document.querySelector('.show-history');
const showHistoryBtn = document.querySelector('.show-history-btn');
const closeHistoryBtn = document.querySelector('.close-history-btn');


let operatorsArray = ['%', '-', '+', '*', '÷'];



toggleThemeBtn.addEventListener('click',()=>{

    htmlEl.classList.toggle('dark');
})


showHistoryBtn.addEventListener('click',()=>{

    showHistoryDiv.style.visibility = 'visible';
})

closeHistoryBtn.addEventListener('click',()=>{
    showHistoryDiv.style.visibility = 'hidden';
})


buttonsContainer.addEventListener('click',buttonClicked);


window.addEventListener('keydown',(event)=>{

    
   
   
    switch(event.key)
    {
        case '1':
                appendNum(event.key)
                break;
        case '2':
                appendNum(event.key)
                break;
        case '3':
                appendNum(event.key)
                break;
        case '4':
                appendNum(event.key)
                break;
        case '5':
                appendNum(event.key)
                break;
        case '6':
                appendNum(event.key)
                break;
        case '7':
                appendNum(event.key)
                break;
        case '8':
                appendNum(event.key)
                break;
        case '9':
                appendNum(event.key)
                break;
        case '0':
                appendNum(event.key)
                break;
        case 'Backspace':
                removeLastChar();
                break;
        case 'Delete':
            removeAll();
            break;
        case '+':
            if(event.shiftKey) appendOperator('+');
            break;
        case '-':
             appendOperator('-');
            break;
        case '/':
            appendOperator('/');
            break;
        case '*':
            if(event.shiftKey) appendOperator('*');
            break;
        case '%':
            if(event.shiftKey) appendOperator('%');
            break;
        case 'Enter':
            startCalculation();
            break;
        case 'H':
            if(event.shiftKey)
            {
                showHistoryDiv.style.visibility = 'visible';

            };
        case 'c':
            if(event.ctrlKey)
                {
                    showHistoryDiv.style.visibility = 'hidden';
                }
            break;
        


    }

    console.log(event.key);

    
    
    
})


function appendOperator(id)
{
    
    // checkLastOperator();
    if(isLastCharOperator())
        {
            console.log('yes last char is operator');
            // do nothing if last char is operator
        }
    else 
    {
        switch(id)
        {
            case 'all-clear':
                break;
            case 'one-clear':
                break;
            case 'percent':
                typedTextEl.textContent+='%';
                break;
            case 'divide':
                typedTextEl.textContent+='÷';
                break;
            case 'multiply':
                typedTextEl.textContent+='*';
                break;
            case 'subtract':
                typedTextEl.textContent+='-'
                break;
            case 'addition':
                typedTextEl.textContent+='+';
                break;
            case 'decimal':
                typedTextEl.textContent+='.';
                break;
            case '+':
                typedTextEl.textContent+='+'
                break;
            case '-':
                typedTextEl.textContent+='-';
                break;
            case '/':
                typedTextEl.textContent+='/';
                break;
            case '*':
                typedTextEl.textContent+='*';
                break;
            case '%':
                typedTextEl.textContent+='%';
                break;
            
            default : alert('nothing');
                break;
        }
    }
}


function appendNum(num)
{
    if(typedTextEl.textContent == '0')
        {
            typedTextEl.textContent = '';
            typedTextEl.textContent = num;
        }
        else 
        {
            typedTextEl.textContent +=num;
        }
}



function buttonClicked(event)
{
   
    if(!event.target.classList.contains('buttons-container'))
        {

            let target = event.target;

            // Setting conditions for number buttons
            if(target.classList.contains('num'))
                {
                    if(typedTextEl.textContent ==='0')
                        {
                            typedTextEl.textContent = '';
                            typedTextEl.textContent = target.textContent;
                        }
                        else 
                        {
                            typedTextEl.textContent +=target.textContent;
                        }

                        // calculateResult(typedTextEl.textContent);
                }

            // Setting conditions for operator's
            if(target.classList.contains('operator'))
                {
                    let targetId = target.getAttribute('id');
                    appendOperator(targetId);
                }
            
            // Setting conditions for all-clear 
            if(target.classList.contains('all-clear'))
                {
                    removeAll();
                }

            // Setting conditions for one-clear btn
            if(target.classList.contains('one-clear'))
                {
                    removeLastChar();
                }

            // Setting conditions for equal || result
            if(target.classList.contains('equal'))
                {
                    startCalculation();
                }
        }
}


function startCalculation()
{
    let arrayExpression = converStringToArray(getTextForCalculation());
    let result = calculateExp(arrayExpression);
    updateResult(result);
}


function updateResult(result)
{
    typedTextEl.textContent = result;
    finalResultEl.textContent = result;
}

function getTextForCalculation()
{
    return typedTextEl.textContent;
}

function converStringToArray(str)
{
    let arrayExpression = splitStringExpressionToArray(str);
    return arrayExpression;
}


function calculateExp(fullArray)
{
    // make array of operators in fullArray
    let operatorsInExpression = fullArray.filter((elem)=>{
        return operatorsArray.includes(elem)
    });

    let totalNumberOfOperators = operatorsInExpression.length;
    let i = 0;
    while(i<totalNumberOfOperators)
        {
            if(fullArray.length>=3)
                {
                    let firstThreeElemsArray = fullArray.slice(0,3);
                    let result = calculateArray(firstThreeElemsArray);
                    fullArray.splice(0,3);
                    fullArray.splice(0,0,result);
                }
                i++;
        }
        return fullArray[0];
}


function splitStringExpressionToArray(expression)
{
    // Create a regex pattern that matches any of the operators or numbers (including decimals)
    let pattern = new RegExp(`(\\d+(?:\\.\\d+)?|[${operatorsArray.join('')}]|\\D)`, 'g');
    // Split the expression
    let expressionArray = expression.match(pattern);
    return expressionArray;
}



function calculateArray(arrayOfThreeElems)
{

    let [leftOperand,operator,rightOperand] = arrayOfThreeElems;
    updateHistory(arrayOfThreeElems);
    let result ;
    switch(operator)
    {
        case '+':
            result = addition(leftOperand,rightOperand);
            break;

        case '-':
            result = subtract(leftOperand,rightOperand);
            break;

        case '*':
            result = multiply(leftOperand,rightOperand);
            break;
                
        case '÷':
            result = division(leftOperand,rightOperand);
            break;
        
        case '%':
            result = percent(leftOperand,rightOperand);
            break;
                
        default:
            alert('default is running');
            break;
    }


    return result;

}


function addition(leftOperand,rightOperand)
{
    return Number(leftOperand) + Number(rightOperand);
}
function multiply(leftOperand,rightOperand)
{
    
    return Number(leftOperand) * Number(rightOperand);
}

function subtract(leftOperand,rightOperand)
{
    return Number(leftOperand) - Number(rightOperand);
}

function division(leftOperand,rightOperand)
{
    return Number(leftOperand)/Number(rightOperand);
}

function percent(leftOperand,rightOperand)
{
    return Number(leftOperand) % Number(rightOperand);
}



function removeAll()
{
    typedTextEl.textContent ='0';
    finalResultEl.textContent ='';
}

function removeLastChar()
{
        let currentText = typedTextEl.textContent;
        if(currentText.length===1)
            {
                typedTextEl.textContent='0';
            }
        else 
        {
            let newText = currentText.slice(0,-1);
            typedTextEl.textContent = newText;
        }
}



function isLastCharOperator()
{
    let string = typedTextEl.textContent;
    let lastChar = string[string.length-1];

    let operatorsArray = ['%','-','+','*','÷','.','/'];
    return operatorsArray.includes(lastChar);
        
}


function updateHistory(array)
{
   let span =  document.createElement('span');
   span.textContent = array.join(' ');
   showHistoryDiv.appendChild(span);
   

}