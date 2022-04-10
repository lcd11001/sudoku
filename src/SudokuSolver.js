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

const solverNumber = (board) =>
{
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
                        if (!solverNumber(board))
                        {
                            board[i][j] = 0
                        }
                        else
                        {
                            return true
                        }
                    }
                }
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

    if (solverNumber(outputBoard))
    {
        return outputBoard
    }
    return null
}

export
{
    TABLE_BOX,
    TABLE_SIZE,
    solver
}