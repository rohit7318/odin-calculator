const buttonsContainer = document.querySelector('.buttons-container');
const finalResultEl = document.querySelector('#final-result');
const typedTextEl = document.querySelector('#typing');
const htmlEl = document.documentElement;
const toggleThemeBtn = document.querySelector('#toggle-theme');


const showHistoryDiv  = document.querySelector('.show-history');
const showHistoryBtn = document.querySelector('.show-history-btn');
const closeHistoryBtn = document.querySelector('.close-history-btn');


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
                calculateResult(typedTextEl.textContent);
                break;
        case '2':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '3':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '4':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '5':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '6':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '7':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '8':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '9':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case '0':
                appendNum(event.key)
                calculateResult(typedTextEl.textContent);
                break;
        case 'Backspace':
                removeLastChar();
                break;
        case 'Delete':
            removeAll();
            break;



    }
})


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
                    let expression = typedTextEl.textContent;
                    console.log(expression);
                    calculateResult(expression);


                }
            
            
        }
}


function calculateResult(expression)
{
    let operatorsArray = ['%', '-', '+', '*', '÷'];
    // Create a regex pattern that matches any of the operators or numbers (including decimals)
    let pattern = new RegExp(`(\\d+(?:\\.\\d+)?|[${operatorsArray.join('')}]|\\D)`, 'g');
    // Split the expression
    let expressionArray = expression.match(pattern);
    console.log(expressionArray);

    if(expressionArray.length>1 && expressionArray.length%2!==0)
        {
            console.log('calculating..');
            calculateArray(expressionArray);
        }
    else 
    {
        console.log('waiting');
    }



}




        




function calculateArray(array)
{
    let [leftOperand,operator,rightOperand] = array;
    updateHistory(array);
    
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



    finalResultEl.textContent = result;
    typedTextEl.textContent = result;





    console.log('leftOperand : ' + leftOperand);
    console.log('operator : ' + operator);
    console.log('rightOperand : ' + rightOperand);

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
            default : alert('nothing');
            break;
        }
    }


    // console.log(typedTextEl.textContent[typedTextEl.textContent.length-1])
}


function isLastCharOperator()
{
    let string = typedTextEl.textContent;
    let lastChar = string[string.length-1];

    let operatorsArray = ['%','-','+','*','÷','.'];
    return operatorsArray.includes(lastChar);
        
}


function updateHistory(array)
{
   let span =  document.createElement('span');
   span.textContent = array.join(' ');
   showHistoryDiv.appendChild(span);
   

}