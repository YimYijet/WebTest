package main

import (
	"fmt"
)

func main() {
	fmt.Println(sqrtNewton(2))
}

/**
 * 牛顿迭代法开平方 x=x-f(x)/f'(x), f(x)=a
 */
func sqrtNewton(num float64) (result float64) {
	var preResult float64
	result = 0.5*num + 1
	for result != preResult {
		preResult = result
		result = (result + num/result) * 0.5
	}
	return
}
