class TicTacToe{
    constructor() {
        //console.log("Rendered Html");
        this.playerTurn = 'X';
        this.turnDisplayElement = document.getElementsByClassName('turn')[0];
        this.boardState = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.renderBoard();  
    }
    renderBoard(){
        this.showPlayerTurn();
        this.updateBoard();
    }
    showPlayerTurn(){
        if(this.playerTurn === 'X'){
            this.turnDisplayElement.innerText = "Player 1's Turn";
        }
        if(this.playerTurn === 'O'){
            this.turnDisplayElement.innerText = "Player 2's Turn";
        }
    }
    updateBoard(){
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                const gridItemId = this.convertIndextoId(i, j);
                document.getElementById(gridItemId).innerText = this.boardState[i][j]; 
            }
        }
    }
    convertIndextoId(i, j){
        return (3*i)+(j+1);
    }
    playerClick(id){
        const[i, j] = this.convertIdToIndex(id);
        if(this.boardState[i][j] === ''){
            this.boardState[i][j] = this.playerTurn;
            this.changePlayerTurn(); 
        }
    }

    convertIdToIndex(id){
        const numericId = Number(id);
        return [ Math.ceil(numericId/3) - 1, (numericId - 1)%3 ];
    }
    changePlayerTurn(){
        this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
        this.renderBoard();
        //this.checkGameEnd();
        setTimeout(() => this.checkGameEnd(), 0);

    }
    checkGameEnd(){
        let won = true;

        //check for rows
        for(let i=0; i<3; i++){
            won=true;

            for(let j=1; j<3; j++){
                if(this.boardState[i][j] !== this.boardState[i][j-1]){
                    won=false;
                    break;
                }
            }
            if(won && this.boardState[i][0] !== ''){
            return this.alertWin(this.boardState[i][0]);
            }
        }
        


        //check for cols
        for(let j=0; j<3; j++){
            won=true;

            for(let i=1; i<3; i++){
                if(this.boardState[i][j] !== this.boardState[i-1][j]){
                    won=false;
                    break;
                }
            }
            if(won && this.boardState[0][j] !== ''){
            return this.alertWin(this.boardState[0][j]);
            }
        }
        

        //check for forward diagonal
        won = true;
        for(let i=1; i<3; i++){
            if(this.boardState[i][i] !== this.boardState[i-1][i-1]){
                won=false;
                break;
            }
        }
        
        if(won && this.boardState[0][0] !== ''){
            return this.alertWin(this.boardState[0][0]);
        }

         //check for anti-diagonal
        won = true;
        for(let i=1; i<3; i++){
            if(this.boardState[i][2-i] !== this.boardState[i - 1][2-i+1]){
                won=false;
                break;
            }
        }
        if(won && this.boardState[2][0] !== ''){
            return this.alertWin(this.boardState[2][0]);
        }



        //check for draw
        let draw = true;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(this.boardState[i][j] === ''){
                    draw = false;
                    break;
                }
            }
            if(draw == false){
                break;
            }
        }
        if(draw){
            return this.alertDraw();
        }
        
    }

    alertWin(playerWon){
        if(playerWon === 'X'){
            alert('Congratulations! Player1 wins');
        }else{
            alert('Congratulations! Player2 wins');
        }
        initializeGame();
    }
    alertDraw(){
        alert('Draw!');
        initializeGame();
    }
}

let currentGame;

function initializeGame(){
    currentGame = new TicTacToe();
}
initializeGame();

function playTurn(that){
    currentGame.playerClick(that.id);
}