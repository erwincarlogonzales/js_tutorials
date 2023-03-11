// Learn JS in 1 project
// source: https://www.youtube.com/watch?v=E3XxeE7NF30

// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again

// instatiate this node.js package
const prompt = require('prompt-sync')();

// create global variables
// slot machine attributes
const ROWS = 3;
const COLS = 3;

// create an Object (key, value pairs)
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

// 1. deposit some money
const deposit = () => {
    // this while loop will run until the user enters a positive number
    while (true) {
        const depositAmount = prompt('Enter a deposit amount: ');
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

// 2. Determine number of lines to bet on
const getNumberOfLines = () => {
    while (true) {
        const lines = prompt('Enter the number of lines to bet on (1-3): ');
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

// 3. Collect a bet amount
// lines represents the number of lines x the bet amount
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt('Enter the bet per line: ');
        const numberBet = parseFloat(bet);
        
        // if the bet amount is greater than the balance / the number of lines the bet amount will be invalid
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines ) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }
};

// 4. Spin the slot machine

// create a function that spins the slot machine
const spin = () => {
    // create an empty array to store the values of the symbols in the slot machine
    const symbols = [];

    // create a for loop that will run until the user enters a symbol
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        // console.log(symbol, count) use this to check if the loop returns the values of the SYMBOLS_COUNT object

        // create a loop that will run until the user enters a symbol and push the values to the empty symbols array
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
        // console.log(symbols); check this to see if the loop returns the random values of the symbols array
    }
        // create a variable to store the values of the symbols array
        const reels = [];

        // create a loop that will run that will fill the nested const reels array
        for (let i = 0; i < COLS; i++) {

            // for every COL selected push an array into the reels array
            reels.push([]);

            // create an empty array that will store the random values of the symbols array and remove them from the symbols array
            const reelSymbols = [...symbols];

            for (let j = 0; j < ROWS; j++) {
                // create a random index value for the reelSymbols array
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);

                // select a random symbol from the reelSymbols array and place it in the reels array
                const selectedSymbol = reelSymbols[randomIndex];

                reels[i].push(selectedSymbol);

                // remove the selectedSymbol from the reels array
                reelSymbols.splice(randomIndex, 1);
            }
        }

        return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = '';
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i!= row.length - 1) {
                rowString += ' | ';
            }
        }
        console.log(rowString)
    }
}

// 5. Check if the user won

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }

    }

    return winnings;
}

// 6. Give the user their winnings

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);

        const numberOfLines = getNumberOfLines();
            const bet = getBet(balance, numberOfLines);
            balance -= bet * numberOfLines;

        const reels = spin();
        const rows = transpose(reels);

        printRows(rows);
            const winnings = getWinnings(rows, bet, numberOfLines);
                balance += winnings;
                    console.log("You won, $" + winnings.toString());

            if (balance < 0) {
                console.log("You ran out of money, you lose $");
                break;
            }

            const playAgain = prompt('Would you like to play again? (y/n): ');

            if (playAgain.toLowerCase() != 'y') 
            break;
    } 
};

game();



