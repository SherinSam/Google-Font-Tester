const input  = document.querySelector('#size')
const text   = document.querySelector('.text')   
const select = document.querySelector('.fontselect') 
const instr  = document.querySelector('.instr')


function fontsizeUpdate() {         
    // const size = document.querySelector('.fontsize')     
    const suffix = this.dataset.sizing || '';
    //document.documentElement selects <html>
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)  
    // size.textContent = this.value + suffix
}


function colorUpdate() {   
    const color  = document.querySelector('.colorname')    
    //generate and apply a random color on text
    const randColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    text.style.setProperty('color', randColor)                          
    //display the color name and hex code. refer index.html for info on ntc
    color.textContent = `${ntc.name(randColor)[1]} ${randColor}`  
    color.style.setProperty('color', randColor)            
}


function fontfamilyUpdate() {
    const fontlink = document.querySelector('#fontlink')  

    //generate font url. eg: url: 'https://fonts.googleapis.com/css?family=Anonymous+Pro:italic&subset=greek'
    const apiUrl = [];
    apiUrl.push('https://fonts.googleapis.com/css?family=');
    apiUrl.push(this.value.replace(/ /g, '+'));
    const url = apiUrl.join('');
       
    //replaces href='#' with the href='url' in <head>
    fontlink.setAttribute('href', `${url}`) 
    //changes font family of the text           
    text.style.setProperty('font-family', this.value)  
}

function showInstr() {
    const instrlist = document.querySelector('.instrlist')
    instrlist.classList.toggle('hidden')
    if (this.innerText == "Instructions"){
        this.innerText = "Hide Instructions"
    } else {
        this.innerText = "Instructions"
    }
}

//Populates dropdown menu with Google font family names from the response JSON
function fontOptions(fonts) {
    fonts.forEach(function(font){
        const option = document.createElement('option')
        option.text = font.family
        select.add(option)
    })
}

const fetchInfo = () => { 
    const url ='https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB0EB5dJQ-v_VkdWVNipodZag2i0-FhTsc';
    fetch(url)
        .then(resp => resp.json())
        .then(json => fontOptions(json.items))
        .catch(error => console.log(error));
}

fetchInfo();                                           //Fetch Google fonts in JSON format
input.addEventListener('change', fontsizeUpdate)       //update fontsize when slider is moved    
text.addEventListener('mousemove', colorUpdate)        //show text in a random color on mouse move. display colorcode
select.addEventListener('change', fontfamilyUpdate)    //update font family as per the selected option
instr.addEventListener('click', showInstr)