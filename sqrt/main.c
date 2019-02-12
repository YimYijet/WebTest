#include <stdio.h>

// 函数经过xi时切线方程为f(x) = f(xi) + f’(xi)(x - xi)，通过使其为0，可以得出迭代公式为xi+1 = xi - f(xi) / f'(xi)，将函数f(xi) = a带入得到迭代公式

/**
 * 快速求开平方倒数
 */
float fastInvSqrt(float x) {
    float x2 = 0.5f * x;
    int i = *(int *)&x;     // 将浮点型二进制表示转换为整形二进制表示，而非类型的强制转换
    //i = 0x5f3759df - (i >> 1);  // 0x5f375a86为更优值
    i = 0x5f375a86 - (i >> 1);
    x = *(float *)&i;
    x = x * (1.5f - x2 * x * x);  // 牛顿迭代提高精度
    x = x * (1.5f - x2 * x * x);
    return x;
}

/**
 * 快速求开平方
 */
float fastSqrt(float x) {
    float num = x;
    int i = *(int *)&x;
    i = 0x1fbd1df5 + (i >> 1);
    x = *(float *)&i;
    x = (x + num / x) * 0.5f;
    x = (x + num / x) * 0.5f;
    return x;
}

int main(int argc, char *args[]) {
    printf("%f\n", fastInvSqrt(2));
    printf("%f", fastSqrt(2));
    return 0;
}


