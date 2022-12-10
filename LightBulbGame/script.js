let bulb = '💡'
let lightedIndex = []

function permaSave(attributeName, value){
    window.localStorage.setItem(attributeName, JSON.stringify(value))
}

function permaLoad(attributeName){
    return JSON.parse(window.localStorage.getItem(attributeName))
}

function delegate(parent, child, when, what){
    function eventHandlerFunction(event){
        let eventTarget  = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if(eventHandler.contains(closestChild)){
            what(event, closestChild)
        }
    }

    parent.addEventListener(when, eventHandlerFunction)
}
let level = 0
let blockage = [];
let count = 0;
let MapType;
function difficulty() {
    document.getElementById("tablesize").style.display = 'none'
    DynamicTable.style.display = 'none'
    var PlayerName = prompt("Please enter your name", "");
    if (PlayerName!= null) {
        document.getElementById("username").innerText = PlayerName;
    }
    homepage.style.display = "none";
    gamepage.style.display = "block"

    let table2 = document.querySelector('table');
    table2.innerHTML = '';

    lightedIndex = []
    let e = document.getElementById("diff");
    const expr = e.value;
    switch (expr) {
            case '1':
                level = 7;
                blockage = [
                [0,3,1],[1,1,0],[1,5,2],[3,0,null],[3,3,null],[3,6,null],[5,1,null],
                [5,5,2],[6,3,3]
                ];
                MapType = "Easy 7*7"
            break;
            case '2':
                level = 7;
                blockage = [
                [0,2,0],[0,4,null],[2,0,null],[2,2,null],[2,4,3],[2,6,null],[3,3,1],[4,0,2],[4,2,null],[4,4,null],[4,6,null],[6,2,null],[6,4,2]
                ];
                MapType = "Advance 7*7"
            break;    
            case '3':
                level = 10;
                blockage = [
                   [0,1,null],[1,5,3],[1,7,2],[1,9,null],[2,1,0],[2,2,null],[2,7,null],[3,4,null],[4,1,null],[4,4,null],[4,5,1],[4,6,null],[5,3,null],
                   [5,4,null],[5,5,null],[5,8,3],[6,5,null],[7,2,1],[7,7,0],[7,8,null],[8,0,3],[8,2,null],[8,4,0],[9,8,0]
                ];
                MapType = "Extreme 7*7"
            break;
            default:
                level = 7;
                blockage = [
                [0,3,1],[1,1,0],[1,5,2],[3,0,null],[3,3,null],[3,6,null],[5,1,null],
                [5,5,2],[6,3,3]
                ];
                MapType = "Easy 7*7"
            }
    document.getElementById('clock').style.display = 'block'
    createLayout(level,blockage);
    totalSeconds = 0;
}

let table = document.querySelector('table')
let size;
let newROW = document.querySelectorAll('tr');
let newCOL = document.querySelectorAll('td');
let smallCol = document.querySelector('td');

let NumberedTiles = Array.from(newCOL).filter(x => (x.classList.contains('fill') && (parseInt(x.innerText) >= 0)))
//*********************************************************************************************************************************************

function light(event,element) {

    let newROW = document.querySelectorAll('tr');
    let newCOL = document.querySelectorAll('td');
    if ((element.innerText != bulb) && (!element.classList.contains('fill')) && (!element.classList.contains('sphere'))) {
        element.innerText  = bulb
        let Rindex = element.dataset.rowIndex;
        let Cindex = element.dataset.colIndex;
        lightedIndex.push(String(Rindex)+String(Cindex));
       
        let Rwall = [];
        var Rwallcnt = 0;
        let Cwall = [];
        var Cwallcnt = 0;

        for (let col of newCOL) {
            if (col.dataset.rowIndex == Rindex || col.dataset.colIndex == Cindex) {
                if (col.classList.contains('fill') && col.dataset.rowIndex == Rindex) {
                    Rwall[Rwallcnt] = col.dataset.colIndex;
                    Rwallcnt++;
                }
                if (col.classList.contains('fill') && col.dataset.colIndex == Cindex) {
                    Cwall[Cwallcnt] = col.dataset.rowIndex;
                    Cwallcnt++;
                }
            }
        }

//        console.log(Rwall,Cwall)
        
        var left;
        var right;
        var up;
        var down;
        for (let i = 0; i < Rwall.length; i++) {
            if (Cindex < Rwall[0]) {
                left = 0;
                right = parseInt(Rwall[0]);
                break;
            }
            else if (Cindex < Rwall[i]) {
                left = parseInt(Rwall[i-1]) + 1;
                right = parseInt(Rwall[i]);
                break;
            }
            else if (Cindex > Rwall[Rwall.length - 1]) {
                left = parseInt(Rwall[Rwall.length - 1]) + 1;
                right = size;
                break;
            }
        }
        if (Rwall.length == 0) {
            left = 0;
            right = size;
        }

        for (let i = 0; i < Cwall.length; i++) {
           if (Rindex < Cwall[0]) {
               up = 0;
               down = parseInt(Cwall[0]);
               break;
           }
           else if (Rindex < Cwall[i]){
               up = parseInt(Cwall[i-1])+1;
               down = parseInt(Cwall[i]);
               break;
           }
           else if (Rindex > Cwall[Cwall.length - 1]) {
               up = parseInt(Cwall[Cwall.length - 1]) + 1;
               down = size;
               break;
           }
        }
        if (Cwall.length == 0) {
            up = 0;
            down = size;
        }
        // console.log(left,right,up,down)
        for (let row of newROW) {
            let bulbCnt = 0
            while(left < right && (row.dataset.lineIndex == Rindex))
            {
                if (row.cells.item(left).innerText == bulb) {
                    bulbCnt++;
                }
                row.cells.item(left).classList.add('sphere')
                row.cells.item(left).dataset.lB++;
                left++;
            }
            if (bulbCnt > 1) {
                element.style.backgroundColor = "red";
            }
        }
        let bulbCnt = 0
        
        while(up < down)
        {
            if (newROW[up].cells.item(Cindex).innerText == bulb) {
                 bulbCnt++;
            }
            newROW[up].cells.item(Cindex).classList.add('sphere');
            newROW[up].cells.item(Cindex).dataset.lB++;
            up++;
        }
        if (bulbCnt > 1) {
            element.style.backgroundColor = "red";
        }

    }
    //########################################################################################################################################

    else if((!element.classList.contains('fill'))  && (element.innerText == bulb))
    {
        element.innerText  = ''
        let Rindex = element.dataset.rowIndex;
        let Cindex = element.dataset.colIndex;
        
        let Rwall = [];
        var Rwallcnt = 0;
        let Cwall = [];
        var Cwallcnt = 0;

        for (let col of newCOL) {
            if (col.dataset.rowIndex == Rindex || col.dataset.colIndex == Cindex) {
                if (col.classList.contains('fill') && col.dataset.rowIndex == Rindex) {
                    Rwall[Rwallcnt] = col.dataset.colIndex;
                    Rwallcnt++;
                }
                if (col.classList.contains('fill') && col.dataset.colIndex == Cindex) {
                    Cwall[Cwallcnt] = col.dataset.rowIndex;
                    Cwallcnt++;
                }
            }
        }
        
        var left;
        var right;
        var up;
        var down;

        for (let i = 0; i < Rwall.length; i++) {
            if (Cindex < Rwall[0]) {
                left = 0;
                right = parseInt(Rwall[0]);
                break;
            }
            else if (Cindex < Rwall[i]) {
                left = parseInt(Rwall[i-1]) + 1;
                right = parseInt(Rwall[i]);
                break;
            }
            else if (Cindex > Rwall[Rwall.length - 1]) {
                left = parseInt(Rwall[Rwall.length - 1]) + 1;
                right = size;
                break;
            }
        }
        if (Rwall.length == 0) {
            left = 0;
            right = size;
        }

        for (let i = 0; i < Cwall.length; i++) {
           if (Rindex < Cwall[0]) {
               up = 0;
               down = parseInt(Cwall[0]);
               break;
           }
           else if (Rindex < Cwall[i]){
               up = parseInt(Cwall[i-1])+1;
               down = parseInt(Cwall[i]);
               break;
           }
           else if (Rindex > Cwall[Cwall.length - 1]) {
               up = parseInt(Cwall[Cwall.length - 1]) + 1;
               down = size;
               break;
           }
        }
        if (Cwall.length == 0) {
            up = 0;
            down = size;
        }                
        for (let row of newROW) {
            while(left < right && (row.dataset.lineIndex == Rindex))
            {
                if (row.cells.item(left).dataset.lB - 1 == 0) {
                    row.cells.item(left).classList.remove('sphere');
                    row.cells.item(left).dataset.lB--;
                    left++;
                }
                else
                {
                row.cells.item(left).dataset.lB--;
                left++;
                }
            }
        }
        while(up < down)
        {
            if (newROW[up].cells.item(Cindex).dataset.lB - 1 == 0) {
                newROW[up].cells.item(Cindex).classList.remove('sphere');
                newROW[up].cells.item(Cindex).dataset.lB--;
                up++;
            }
            else
            {
                newROW[up].cells.item(Cindex).dataset.lB--;
                up++;
            }
        } 
    }
    else if (element.classList.contains('sphere')) 
    {
        element.classList.remove('sphere')
        //element.dataset.lB--;
        setTimeout(() =>  {element.classList.remove('error')} , 500);
        setTimeout(() =>  {element.classList.add('sphere')} , 500);
        element.classList.add('error');
    }

    lighted(element)

    if (winCheck()) {
        let PlayerName;
        console.log("YOU WIN")
        PlayerName = document.getElementById("username").innerText;
        document.getElementById('playername').innerText = PlayerName;
        document.getElementById('map').innerText = MapType
        document.getElementById('time').innerText = "Time :-  " + minutes.innerText + " : " + seconds.innerText
        document.getElementById('scoreboard').style.display = 'block'
        document.getElementById('gamepage').style.display = 'none'
        document.getElementById('homepage').style.display = 'none'
    }

}
function Around(smallCol) {
    let newROW = document.querySelectorAll('tr');
    let newCOL = document.querySelectorAll('td');
    let r = parseInt(smallCol.dataset.rowIndex);
    let c = parseInt(smallCol.dataset.colIndex);
    let left = (c-1);
    let right = (c+1);
    let up = (r-1);
    let down = (r+1);
    
    let around = [];
    for (let col of newCOL) { 
        if (parseInt(col.dataset.rowIndex) === r && parseInt(col.dataset.colIndex) === left) {
            around.push(col);
        }
        else if(parseInt(col.dataset.rowIndex) === r && parseInt(col.dataset.colIndex) === right)
        {
            around.push(col);
        }
        else if(parseInt(col.dataset.rowIndex) === up && parseInt(col.dataset.colIndex) === c)
        {
            around.push(col);
        }
        else if(parseInt(col.dataset.rowIndex) === down && parseInt(col.dataset.colIndex) === c)
        {
            around.push(col);
        }
    }
    return around;
}
function lighted(smallCol) {
    let newROW = document.querySelectorAll('tr');
    let newCOL = document.querySelectorAll('td');
   let around = Around(smallCol);  
//    console.log(around) 
   let black = Array.from(newCOL).filter(x => (x.classList.contains('fill') && x.innerText >= 0))
   for(e of black)
   {
    let hahaa = Around(e).filter(x=>x.innerText === bulb)
    if(hahaa.length == e.innerText)
    {
        e.style.color = 'green'
    }
    else
    {
        e.style.color = 'white'
    }
   }
}

//*************************************************************************************************************** */

let homepage = document.getElementById("homepage")
let gamepage = document.getElementById("gamepage")

//------------------------------------------------------------------------------------------------------------------
let clock = document.getElementById("clock")
let Newgame = document.querySelector("#NewGame")
let Resume = document.querySelector("#Resume")
let Reset = document.querySelector("#reset")
let Back = document.querySelector('#back')
let Save = document.querySelector('#save')
let CreateCustomTable = document.querySelector('#create')
let DynamicTable = document.querySelector('#dynamic')
let RpostLabel = document.querySelector('#rlabel')
let CpostLabel = document.querySelector('#clabel')
let ValLabel = document.querySelector('#vallabel')
let Rpost = document.querySelector('#row')
let Cpost = document.querySelector('#col')
let ValAt = document.querySelector('#val')
let PlaceTiles = document.querySelector('#placetiles')
let LayoutCompleted = document.querySelector('#layout-completed')
let StartPlaying = document.querySelector('#startplaying')
let BackToMainPage = document.querySelector('#backtomain')

Newgame.addEventListener("click",difficulty)
Resume.addEventListener("click",ResumeGame)
Reset.addEventListener("click",ResetLayout)
Save.addEventListener("click",doSave)
Back.addEventListener("click",backpage)
CreateCustomTable.addEventListener("click",CreateNewPage)
DynamicTable.addEventListener("click",CreateDynamicTable)
PlaceTiles.addEventListener("click",PutTiles)
LayoutCompleted.addEventListener("click",LayoutComp)
StartPlaying.addEventListener("click",StartPlayingCustomGame)
BackToMainPage.addEventListener("click",backTomain)

function createLayout(n,blockage) 
{
    let table = document.querySelector('table')
    table.innerHTML = ''
    for(let row = 0; row < n; row++){
        let newTR = document.createElement('tr')
        newTR.dataset.lineIndex = row;
        for(let col = 0; col < n; col++){
            let newTD = document.createElement('td')
            newTD.dataset.rowIndex = row
            newTD.dataset.colIndex = col
            newTD.dataset.lB = 0
            for (let i = 0; i < blockage.length; i++) {
                if (row == blockage[i][0] && col == blockage[i][1]) {
                    newTD.classList.add('fill')
                    newTD.innerText = blockage[i][2];
                    newTD.classList.add('text')
                 }
            }
    
            newTR.appendChild(newTD)       
        }
        table.appendChild(newTR)
    }
    size = n;
}
function ResetLayout() {
    let newCOL = document.querySelectorAll('td');
    for (let col of newCOL) {
        if (col.classList.contains('sphere')) {
            col.classList.remove('sphere');
            col.innerText = '';
        }
        
        if (col.style.color === "green") {
            col.style.color = "white";
        }

        if (col.style.backgroundColor === "red") {
            col.style.backgroundColor = "white"
        }
        if (col.style.backgroundColor === "yellow") {
            col.style.backgroundColor = "white"
        }
        col.dataset.lB = 0;
    }
     document.getElementById("username").innerText = '';
     var PlayerName = prompt("Please enter your name", "");
    if (PlayerName!= null) {
    document.getElementById("username").innerText = PlayerName;
    }
    totalSeconds = 0;
    document.getElementById('clock').style.display = 'block'
}
function winCheck()
{
    let newCOL = document.querySelectorAll('td')
    let Allcol = Array.from(newCOL);
    let NumberedBlackTiles = Array.from(newCOL).filter(x => (x.classList.contains('fill') && (parseInt(x.innerText) >= 0)))
    let BlackTiles = Array.from(newCOL).filter(x => (x.classList.contains('fill')))
    let YellowTiles = Array.from(newCOL).filter(x => (x.classList.contains('sphere') || (x.style.backgroundColor === "yellow")))
    let totaltiles = BlackTiles.length + YellowTiles.length
    let temp = 0;
    for (let e of NumberedBlackTiles) {
        if (e.style.color === "green") {
            temp++;
        }
    }   
    if (totaltiles == Allcol.length && temp == NumberedBlackTiles.length ) {
        return true;
    }
}
function backpage() {
    gamepage.style.display = "none"
    homepage.style.display = "block"
    totalSeconds = 0;
}
function CreateNewPage() {
    var PlayerName = prompt("Please enter your name", "");
    if (PlayerName!= null) {
    document.getElementById("username").innerText = PlayerName;
    }
    table = document.querySelector('table')
    table.innerHTML = ''
    homepage.style.display = 'none';
    gamepage.style.display = 'block';
    DynamicTable.style.display = 'block'
    var Tablesize = document.getElementById('tablesize');
    Tablesize.style.display = 'block'
    Back.style.display = 'none'
    Reset.style.display = 'none'
    Save.style.display = 'none'
    clock.style.display = 'none'
}
function CreateDynamicTable() {

    var Tablesize = document.getElementById('tablesize');
    var value = parseInt(Tablesize.value)
    let table = document.getElementById('tab');
    table.innerHTML = ''
    for (let row = 0; row < value; row++) {       
        let newTR = document.createElement('tr')
        newTR.dataset.lineIndex = row;
         for (let col = 0; col < value; col++) {
            let newTD = document.createElement('td')
            newTD.dataset.rowIndex = row
            newTD.dataset.colIndex = col
            newTD.dataset.lB = 0
            newTR.appendChild(newTD)       
         }
         table.appendChild(newTR)
    }
    size = value;
    PlaceTiles.style.display = "block"
    Tablesize.style.display = 'none'
    DynamicTable.style.display = 'none'
    Rpost.style.display = "block"
    RpostLabel.style.display = "block"
    CpostLabel.style.display = "block"
    Cpost.style.display = "block"
    ValAt.style.display = "block"
    ValLabel.style.display = "block"
    clock.style.display = 'none'
    table.style.display = 'none'
    MapType = "Custom "+size+"*"+size;
}
function PutTiles() {
    let allCol = document.querySelectorAll('td');
    for (const col of allCol) {
        if (col.dataset.rowIndex == Rpost.value && col.dataset.colIndex == Cpost.value) {
            col.innerText = ValAt.value;
            col.classList.add('fill')
            col.classList.add('text')
        }
    }
    LayoutCompleted.style.display = "block"
    clock.style.display = 'none'
}
function LayoutComp() {
    PlaceTiles.style.display = 'none';
    LayoutCompleted.style.display = 'none';
    StartPlaying.style.display = 'block'
    Rpost.style.display = "none"
    RpostLabel.style.display = "none"
    CpostLabel.style.display = "none"
    Cpost.style.display = "none"
    ValAt.style.display = "none"
    ValLabel.style.display = "none"
    clock.style.display = 'none'
}
function StartPlayingCustomGame() {
    table.style.display = 'table'
    StartPlaying.style.display = 'none'
    Save.style.display = 'block'
    Back.style.display = 'block'
    Reset.style.display = 'block'
    totalSeconds = 0;
    clock.style.display = 'block'
}

let totalSeconds = 0;
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

function clockRunning(totalSeconds)
{
  setInterval(setTime, 1000);
}
function setTime()
{
    ++totalSeconds;
    seconds.innerText = totalSeconds%60;
    minutes.innerText = parseInt(totalSeconds/60);
}
function doSave() {
    let tableData = []
    let timeData;
    let arrayofCol = Array.from(document.querySelectorAll('td'))
    let name = document.getElementById('username').innerText;
    timeData = totalSeconds
    for(cell of arrayofCol)
    {
        let litby = cell.dataset.lB
        let r = cell.dataset.rowIndex
        let c = cell.dataset.colIndex
        let innerData = cell.innerText
        let color = cell.classList;
        let styleBgC = cell.style.backgroundColor
        tableData.push({
            "lib" : litby,
            "rind": r,
            "cind" : c,
            "num" : innerData,
            "bgcolor" : color,
            "sColor" : styleBgC
        })
    }
    permaSave('TimeData',timeData)
    permaSave('Name',name);
    permaSave('TableData',tableData)
    permaSave('TableSize',size)
    permaSave('Map',MapType)
    gamepage.style.display = 'none';
    homepage.style.display = 'block';

}

function ResumeGame() {;
    totalSeconds = permaLoad('TimeData')
    let name = permaLoad('Name')
    let data = permaLoad('TableData');
    size = permaLoad('TableSize')
    MapType = permaLoad('Map')
    //console.log(data)
    document.getElementById('username').innerText = String(name);
    let table = document.getElementById('tab')
    table.innerHTML = '';
    cnt = 0;
    let tsize = parseInt(Math.sqrt(data.length))
    for(let row = 0; row < tsize; row++){
        let newTR = document.createElement('tr')
        newTR.dataset.lineIndex = row;
        for(let col = 0; col < tsize; col++){
            let newTD = document.createElement('td')
            newTD.dataset.lB = data[cnt]['lib']
            newTD.dataset.rowIndex = row
            newTD.dataset.colIndex = col
            newTD.innerText = data[cnt]['num']
            for(let x = 0; x < Object.keys(data[cnt]['bgcolor']).length; x++)
            {
                if (String(data[cnt]['bgcolor'][x]) !== 'undefined') {
                    // console.log(String(data[cnt]['bgcolor'][x]))
                    newTD.classList.add(String(data[cnt]['bgcolor'][x]))
                }
            }
            newTD.style.backgroundColor = String(data[cnt]['styleBgC']) 
            newTR.appendChild(newTD) 
            cnt++;      
        }
        table.appendChild(newTR)
    }
    size = tsize;
    homepage.style.display = 'none';
    gamepage.style.display = 'block'
    document.getElementById('tablesize').style.display = 'none'
    document.getElementById('dynamic').style.display = 'none'
}
function backTomain()
{
    homepage.style.display = 'block'
    document.getElementById('scoreboard').style.display = 'none'

    totalSeconds = 0;
}

clockRunning(totalSeconds);

delegate(table,'td','click',light);
