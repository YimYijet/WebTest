//js数据在内存中存储在栈(stack)和堆(heap)中
//js的数据分为基本数据类型（值类型）和引用类型
//值类型有5种：null、undefined、number、boolean、string；引用类型有：function、Object、Array（typeof运算符的值有6个：number、Object、string、function、boolean、undefined）
//值类型数据因为值的大小固定，所以存放在栈内存中，引用类型内存随时都会发生变化存放在堆内存中，但至少有一个引用存放在栈中（否则会被回收内存）
//