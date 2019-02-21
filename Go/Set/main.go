package main

import (
	"fmt"
	"sync"
)

type ISet interface {
	Add(item interface{})
}

type Set struct {
	m map[interface{}]bool

}

func main()  {
	
}