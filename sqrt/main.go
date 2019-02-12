package main

import (
	"fmt"
)

func main() {
	fmt.Println(sqrt_Newton(2))
}

/** 
 * 牛顿迭代法开平方 x=x-f(x)/f'(x), f(x)=a
 */
func sqrt_Newton(num float64) (result float64) {
	var preResult float64 = 0
	result = 0.5 * num + 1
	for result != preResult {
		preResult = result
		result = (result + num / result) * 0.5
	}
	return
}