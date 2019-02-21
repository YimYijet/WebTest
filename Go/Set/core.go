package main

import (
    "fmt"
    "sync"
)

type Set struct {
    m map[interface{}]bool
    sync.RWMutex
}

func New() (set *Set) {
    set = &Set{
        m: map[interface{}]bool{},
    }
    return
}

func (s *Set) Add(item interface{}) {
    s.Lock()
    defer s.Unlock()
    s.m[item] = true
}

func (s *Set) Remove(item interface{}) {
    s.Lock()
    defer s.Unlock()
    delete(s.m, item)
}

func (s *Set) Has(item interface{}) (ok bool) {
    s.RLock()
    defer s.RUnlock()
    _, ok = s.m[item]
    return
}

func (s *Set) Len() (length int) {
    length = len(s.List())
    return
}

func (s *Set) Clear() {
    s.Lock()
    defer s.Unlock()
    s.m = map[interface{}]bool{}
}

func (s *Set) IsEmpty() (empty bool) {
    if s.Len() == 0 {
        empty = true
    } else {
        empty = false
    }
    return
}

func (s *Set) List() (list []interface{}) {
    s.RLock()
    defer s.RUnlock()
    for item := range s.m {
        list = append(list, item)
    }
    return
}

func main() {
    // 初始化
    s := New()
    
    a := []int{}

    s.Add(1)
    s.Add(1)
    s.Add(a)

    fmt.Println(s.List())

    s.Clear()
    if s.IsEmpty() {
        fmt.Println("0 item")
    }
    
    s.Add(1)
    s.Add(2)
    s.Add(3)
    
    if s.Has(2) {
        fmt.Println("2 does exist")
    }
    
    s.Remove(2)
    s.Remove(3)
    fmt.Println("list of all items", s.List())
}