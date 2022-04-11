const TABLE_SIZE = 9
const TABLE_BOX = 3

const isNumberInRow = (board, number, row) =>
{
    for (var i = 0; i < TABLE_SIZE; i++)
    {
        if (number === board[row][i])
        {
            return true
        }
    }
    return false
}

const isNumberInColumn = (board, number, column) =>
{
    for (var i = 0; i < TABLE_SIZE; i++)
    {
        if (number === board[i][column])
        {
            return true
        }
    }
    return false
}

const isNumberInBox = (board, number, row, column) =>
{
    let boxRow = row - (row % TABLE_BOX)
    let boxColumn = column - (column % TABLE_BOX)
    for (var i = boxRow; i < boxRow + TABLE_BOX; i++)
    {
        for (var j = boxColumn; j < boxColumn + TABLE_BOX; j++)
        {
            if (number === board[i][j])
            {
                return true
            }
        }
    }
    return false
}

const isNumberValid = (board, number, row, column) =>
{
    return !isNumberInRow(board, number, row) && !isNumberInColumn(board, number, column) && !isNumberInBox(board, number, row, column)
}

const solverNumber = (board, stackCount) =>
{
    console.log('solverNumber called', stackCount[0])
    // because of roll back, we MUST store stack count as reference variable
    stackCount[0] = stackCount[0] + 1

    for (var i = 0; i < TABLE_SIZE; i++)
    {
        for (var j = 0; j < TABLE_SIZE; j++)
        {
            if (board[i][j] === 0)
            {
                for (var number = 1; number <= TABLE_SIZE; number++)
                {
                    if (isNumberValid(board, number, i, j))
                    {
                        board[i][j] = number
                        // console.log(`board success ${i} ${j} ${number}`, print(board))

                        if (solverNumber(board, stackCount))
                        {
                            return true
                        }
                        else
                        {
                            board[i][j] = 0
                        }
                    }
                }

                // console.log(`board fail ${i} ${j}`, print(board))
                return false
            }
        }
    }
    return true
}

const solver = (inputBoard) =>
{
    var outputBoard = inputBoard.map(arr =>
    {
        return arr.slice()
    })

    if (solverNumber(outputBoard, [1]))
    {
        return outputBoard
    }
    return null
}

const generateNumber = (board, totalNumber, stackCount) =>
{
    console.log('generateNumber called', stackCount)
    if (totalNumber === 0)
    {
        return true
    }

    let row = Math.floor(Math.random() * TABLE_SIZE)
    let col = Math.floor(Math.random() * TABLE_SIZE)
    let number = Math.floor(Math.random() * TABLE_SIZE) + 1

    if (isNumberValid(board, number, row, col))
    {
        board[row][col] = number
        totalNumber--
    }

    return generateNumber(board, totalNumber, stackCount + 1)
}

const generate = (difficult) =>
{
    var board = []
    for (var i = 0; i < TABLE_SIZE; i++)
    {
        board.push(new Array(TABLE_SIZE).fill(0))
    }

    var totalNumber = Math.round(difficult * 1.0 * TABLE_SIZE * TABLE_SIZE / 100.0)
    generateNumber(board, totalNumber, 1)

    return board
}

const print = (board) =>
{
    var printBoard = board.map(arr =>
    {
        return arr.slice()
    })

    console.log(printBoard)
}

export
{
    TABLE_BOX,
    TABLE_SIZE,
    solver,
    generate
}