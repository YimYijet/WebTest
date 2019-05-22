package main

import (
	"fmt"
	"math/rand"
	"time"
)

type Coordinate struct {
	x int
	y int
}

type Sudoku struct {
	points [9][9]int
}

type ISudoku interface {
	CreateSudoku()
	GetSudoku() (points [][]int)
	getColNums(c Coordinate) (nums []int)
	getRowNums(c Coordinate) (nums []int)
	getCellNums(c Coordinate) (nums []int)
}

func getRandNum(numbers []int) (num int) {
	len, r := len(numbers), rand.New(rand.NewSource(time.Now().UnixNano()))
	num = numbers[r.Intn(len)]
	return
}

func fliterNum(main, minus []int) (result []int) {
	len, l := len(minus), len(main)
	if len == 0 {
		result = main
		return
	}
	for i := 0; i < l; i++ {
		for j := 0; j < len; j++ {
			if j == len-1 && main[i] != minus[j] {
				result = append(result, main[i])
			}
			if main[i] == minus[j] {
				break
			}
		}
	}
	return
}

func (s Sudoku) GetSudoku() (points [9][9]int) {
	points = s.points
	return
}

func (s *Sudoku) CreateSudoku() {
	var stack [81][]int
	var tmp []int
	nums, c := [9]int{1, 2, 3, 4, 5, 6, 7, 8, 9}, Coordinate{x: 0, y: 0}
	for c.y <= 8 {
		index := c.y*9 + c.x
		tmp = fliterNum(nums[:], (*s).getColNums(c))
		tmp = fliterNum(tmp, (*s).getRowNums(c))
		tmp = fliterNum(tmp, (*s).getCellNums(c))
		tmp = fliterNum(tmp, stack[index])
		if len(tmp) != 0 {
			(*s).points[c.y][c.x] = getRandNum(tmp)
			if c.x+1 == 9 {
				c.y++
			}
			c.x = (c.x + 1) % 9
		} else {
			stack[index] = []int{}
			if c.x-1 == -1 {
				c.y--
			}
			c.x = (c.x + 8) % 9
			stack[index-1] = append(stack[index-1], ((*s).points[c.y][c.x]))
		}
	}
}

func (s Sudoku) getColNums(c Coordinate) (result []int) {
	for i := 0; i < c.y; i++ {
		result = append(result, s.points[i][c.x])
	}
	return
}

func (s Sudoku) getRowNums(c Coordinate) (result []int) {
	for i := 0; i < c.x; i++ {
		result = append(result, s.points[c.y][i])
	}
	return
}

func (s Sudoku) getCellNums(c Coordinate) (result []int) {
	subX := c.x / 3 * 3
	supX, subY := subX+3, c.y/3*3
	for i := subY; i < c.y; i++ {
		for j := subX; j < supX; j++ {
			result = append(result, s.points[i][j])
		}
	}
	for i := subX; i < c.x; i++ {
		result = append(result, s.points[c.y][i])
	}
	return
}

func main() {
	sudoku := Sudoku{}
	start := time.Now()
	sudoku.CreateSudoku()
	spend := time.Since(start)
	fmt.Println("cost:", spend)
	fmt.Println(sudoku.GetSudoku())
}
