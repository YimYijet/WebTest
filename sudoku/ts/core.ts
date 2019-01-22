function getRandNum(numbers: number[]): number {
    const len = numbers.length
    return numbers[Math.floor(len * Math.random())]
}

function fliterNum(main: number[], minus: number[]): number[] {
    let len = minus.length, result = []
    if (!len) {
        return main
    }
    for (let j = 0; j < main.length; j++) {
        for (let i = 0; i < len; i++) {
            if (i == len - 1 && main[j] != minus[i]) {
                result.push(main[j])
            }
            if (main[j] == minus[i]) {
                break
            }
        }
    }
    return result
}

class Sudoku {
    private points: number[][] = []

    constructor() {
        for (let i = 0; i < 9; i++) {
            this.points[i] = []
            for (let j = 0; j < 9; j++) {
                this.points[i][j] = 0
            }
        }
        this.createNewSudoku()
    }

    private getColNums(x: number, y: number): number[] {
        const result = []
        for (let i = 0; i < y; i++) {
            result.push(this.points[i][x])
        }
        return result
    }

    private getRowNums(x: number, y: number): number[] {
        const result = []
        for (let i = 0; i < x; i++) {
            result.push(this.points[y][i])
        }
        return result
    }

    private getCellNums(x: number, y: number): number[] {
        const result = []
        let subX = Math.floor(x / 3) * 3, supX = subX + 3, subY = Math.floor(y / 3) * 3
        for (let i = subY; i < y; i++) {
            for (let j = subX; j < supX; j++) {
                result.push(this.points[i][j])
            }
        }
        for (let i = subX; i < x; i++) {
            result.push(this.points[y][i])
        }
        return result
    }

    public createNewSudoku(): void {
        const stack: number[][] = [], nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let tmp: number[] = [],
        x = 0, y = 0
        for (let i = 0; i < 81; i++) {
            stack[i] = []
        }
        while (y <= 8) {
            let index = y * 9 + x
            tmp = fliterNum(nums, this.getColNums(x, y))
            tmp = fliterNum(tmp, this.getRowNums(x, y))
            tmp = fliterNum(tmp, this.getCellNums(x, y))
            tmp = fliterNum(tmp, stack[index])
            if (tmp.length) {
                this.points[y][x] = getRandNum(tmp)
                if (x + 1 == 9) {
                    y++
                }
                x = (x + 1) % 9
            } else {
                stack[index] = []
                if (x - 1 == -1) {
                    y--
                }
                x = (x + 8) % 9
                stack[index - 1].push(this.points[y][x])
            }
        }
    }

    public getSudoku(): number[][] {
        return this.points
    }
}

console.time('cost')
const sudoku = new Sudoku()
console.timeEnd('cost')
console.log(sudoku)