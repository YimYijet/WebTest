package main

import (
	"fmt"
	"bufio"
	"os"
)

type Coordinate struct {
	x int
	y int
}

var direction = make(map[string]Coordinate, 4)
var dirList [4]string

func init() {
	direction["e"] = Coordinate{1, 0}
	direction["n"] = Coordinate{0, 1}
	direction["w"] = Coordinate{-1, 0}
	direction["s"] = Coordinate{0, -1}
	dirList[0] = "e"
	dirList[1] = "n"
	dirList[2] = "w"
	dirList[3] = "s"
}

func main() {
	var edgeNum, blockNum int
	var block []Coordinate
	stdin := bufio.NewReader(os.Stdin)
	fmt.Println("请输入路线的最大边长(<=20)，城市中的障碍数(<=50)")
	_, err := fmt.Scan(&edgeNum, &blockNum)
	if err != nil {
		fmt.Println("输入数据错误")
		return
	}
	for i := 1; i <= blockNum; i++ {
		var x, y int
		fmt.Println("已输入坐标：", block)
		fmt.Printf("请输入第%d个坐标\n", i)
		_, err := fmt.Fscan(stdin, &x, &y)
		block = append(block, Coordinate{x, y})
		if err != nil {
			fmt.Println("输入数据错误")
			break
		}
	}
	
}

func moveForward(step int) () {
	
}

func canComeBack(edgeNum, curNum int, point Coordinate) (result bool) {
	var max, pointMax int
	len := edgeNum - curNum + 1
	if len % 2 == 0 {
		max = (curNum + edgeNum + 1) * len / 4
	} else {
		max = (curNum + edgeNum) * (len + 1) / 4
	}
	if point.x > point.y {
		pointMax = point.x
	} else {
		pointMax = point.y
	}
	result = pointMax < max
	return
}

func checkClear(block []Coordinate, start, end Coordinate) (result bool) {
	result = true
	for _, item := range block {
		if item.x == start.x && item.x == end.x {
			result = false
			break
		}
		if item.y == start.y && item.y == end.y {
			result = false
			break
		}
	}
	return
}