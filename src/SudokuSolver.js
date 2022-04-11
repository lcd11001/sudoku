const TABLE_SIZE = 9
const TABLE_BOX = 3

const emptyTable = Array(TABLE_SIZE).fill().map(_ =>
{
    return Array(TABLE_SIZE).fill(0)
})

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

const solverNumber = async (board, stackCount, hook, ms) =>
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
                        if (hook)
                        {
                            hook(deepCopy(board))
                            await timer(ms)
                        }
                        // console.log(`board success ${i} ${j} ${number}`, print(board))

                        if (await solverNumber(board, stackCount, hook, ms))
                        {
                            return true
                        }
                        else
                        {
                            board[i][j] = 0
                        }
                    }
                }

                if (hook)
                {
                    hook(deepCopy(board))
                    await timer(ms)
                }
                // console.log(`board fail ${i} ${j}`, print(board))
                return false
            }
        }
    }
    return true
}

const solver = async (inputBoard, hook, ms) =>
{
    var outputBoard = deepCopy(inputBoard)

    if (solverNumber(outputBoard, [1], hook, ms))
    {
        return outputBoard
    }

    return null
}

const generateNumber = async (board, totalNumber, stackCount, hook, ms) =>
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
        if (hook)
        {
            hook(deepCopy(board))
            await timer(ms)
        }
        totalNumber--
    }

    return generateNumber(board, totalNumber, stackCount + 1, hook, ms)
}

const generate = async (difficult, hook, ms) =>
{
    var output = deepCopy(emptyTable)

    var totalNumber = Math.round(difficult * 1.0 * TABLE_SIZE * TABLE_SIZE / 100.0)
    await generateNumber(output, totalNumber, 1, hook, ms)

    return output
}

const deepCopy = (board) =>
{
    return board.map(arr =>
    {
        return arr.slice()
    })
}

const print = (board) =>
{
    var printBoard = deepCopy(board)
    console.log(printBoard)
}

// return a promise that resolve after "ms" miliseconds
const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

export
{
    TABLE_BOX,
    TABLE_SIZE,
    solver,
    generate,
    deepCopy,
    emptyTable
}