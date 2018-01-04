//快速排序 时间复杂度 O(nlogn) - O(n^2) 不稳定

function quickSort(arr,sub,sup){
	let pivot = arr[sup], tail = sub, temp;
	if(sub<sup){
		for(let i=sub;i<sup;i++){
			if(arr[i]<=pivot){
				temp = arr[tail];
				arr[tail] = arr[i];
				arr[i] = temp;
				tail++;
			}
		}
		temp = arr[sup];
		arr[sup] = arr[tail];
		arr[tail] = temp;
		quicksort(arr,sub,tail-1);
		quicksort(arr,tail+1,sup);
	}
}

//堆排序 时间复杂度 O(nlogn) 不稳定

function heapify(arr,index,heapsize){
	let left = 2*index+1, right = 2*index+2, largest, temp;
	if(left<heapsize&&arr[left]<arr[index]){
		largest = index;
	}else {
		largest = left;
	}
	if(right<heapsize&&arr[largest]<arr[right]){
		largest = right;
	}
	if(largest!=index){
		temp = arr[index];
		arr[index] = arr[largest];
		arr[largest] = temp;
	}
}

function buildHeap(arr,heapsize){
    for (let index=Number.parseInt(heapsize / 2 - 1);index>= 0;index--) 
        heapify(arr,index,heapsize);
}

function heapsort(arr){
	let temp;
	for(let i=arr.length-1;i>=0;i--){
		buildHeap(arr,i);
		temp = arr[0];
		arr[0] = arr[i];
		arr[i] = temp;
	}
}

//归并排序 时间复杂度 O(nlogn) 稳定

function mergeSort(arr,left,right){
	let middle = Number.parseInt((right-left)/2+left);
	if(left<right){
		mergeSort(arr,left,middle);
		mergeSort(arr,middle+1,right);
		merge(arr,left,right,middle);
	}
}

function merge(arr,left,right,middle){
	let lArr=[], rArr=[], lCount=0, rCount=0;
	for(let i=left;i<=middle;i++){
		lArr.push(arr[i]);
	}
	for(let i=middle+1;i<=right;i++){
		rArr.push(arr[i]);
	}
	lArr.push(Infinity);	//用无穷大作哨兵值放在子数组的末尾，免去检查某个子数组是否已读完的步骤，很重要！否则会出现无元素对比无法放入数组；
	rArr.push(Infinity);
	for(let i=left;i<=right;i++){
		if(lArr[lCount]<=rArr[rCount]){
			arr[i] = lArr[lCount];
			lCount++;
		}else {
			arr[i] = rArr[rCount];
			rCount++;
		}
	}
}

//定向冒泡排序 时间复杂度 O(n) - O(n^2) 稳定

function bubbleSort(arr){
	let left = 0, right = arr.length-1,temp;
	while(left<right){
		for(let i=left;i<right;i++){
			if(arr[i]>arr[i+1]){
				temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
			}
		}
		right--;
		for(let i=right;i>left;i--){
			if(arr[i]<arr[i-1]){
				temp = arr[i];
				arr[i] = arr[i-1];
				arr[i-1] = temp;
			}
		}
		left++;
	}

}

//二分查找 时间复杂度 O(logn)

function binarySearch(arr,target){
	let low = 0, high = arr.length-1, middle = Number.parseInt((high-low)/2+low);
	while(low<=high){
		if(arr[middle]==target){
			return middle;	
		}else if(arr[middle]>target){
			high = middle - 1;
		}else{
			low = middle + 1;
		}
	}
	return -1;
}

//BFPRT线性查找算法 时间复杂度 O(n)

/*插入排序*/

function insertSort(arr,start,end){
	let insert;
	for(let i=start;i<=end;i++){
		insert = arr[i]
		for(var j=i;j>start;j--){
			if(insert<arr[j-1]){
				arr[j] = arr[j-1];
			}else{
				break;
			}
		}
		if(j!=i) {
      		arr[j] = insert;
	    }
	}
}

/*查找*/

function partition(arr,left,right,pivotIndex){
	let pivot = arr[pivotIndex], temp;
	temp = arr[left];
	arr[left] = arr[pivotIndex];
	arr[pivotIndex] = temp;

	while(left<right){
		while(left<right&&arr[right]>=pivot){
			right--;
		}
		if(left<right){
			arr[left++] = arr[right];
		}
		while(left<right&&arr[left]<=pivot){
			left++;
		}
		if(left<right){
			arr[right--] = arr[left];
		}
	}
	arr[left] = pivot; 
	return left;
}

function select(arr,left,right,k){		//k指第几小（大）元素
	const kGroupSize = 5;
	let size = right-left+1, temp;

	if(size<kGroupSize){
		insertSort(arr,left,right);
		return arr[left+k-1];
	}

	const groupNum = (size%kGroupSize)>0?Number.parseInt(size/kGroupSize)+1:Number.parseInt(size/kGroupSize);
	for(let i=0;i<groupNum;i++){
		var subLeft = left +i*kGroupSize, subRight = subLeft+kGroupSize-1;
		if(subRight>right){
			subRight = right;
		}
		insertSort(arr,subLeft,subLeft);

		let median = subLeft + ((subRight - subLeft) >> 1);
		temp = arr[left+i];
		arr[left+i] = arr[median];
		arr[median] = temp;
	}

	let pivotIndex = left + ((groupNum - 1) >> 1);

	select(arr,left,left+groupNum-1,(groupNum+1)>>1);

	let midIndex = partition(arr, left, right, pivotIndex);
    let index = midIndex - left + 1;

    if (k==index) {
        return arr[midIndex];
     } else if (k<index) {
        return select(arr, left, midIndex - 1, k);
     } else {
      	return select(arr, midIndex + 1, right, k - index);
     }
}


//深度优先搜索

/*class Node{

	#value;
	#leftChild;
	#rightChild;

	constructor(value){
		#value = value;
	}

	get value(){
		return value;
	}

	set value(value){
		#value = value;
	}

	get leftChild(){
		return leftChild;
	}

	set leftChild(value){
		#leftChild = value;
	}

	get rightChild(){
		return rightChild;
	}

	set rightChild(value){
		#rightChild = value;
	}
}*/

class Node{

	constructor(value){
		this.val = value;
		this.left = null;
		this.right = null;
	}

	get value(){
		return val;
	}

	set value(value){
		this.val = value;
	}

	get leftChild(){
		return left;
	}

	set leftChild(value){
		this.left = value;
	}

	get rightChild(){
		return right;
	}

	set rightChild(value){
		this.right = value;
	}
}

function buildTree(arr,index,node){
	if(node == null && index<arr.length){
		var node = new Node(arr[index]);
	}

	let leftIndex = 2 * index + 1, rightIndex = 2 * index + 2;

	if(leftIndex<arr.length){
		var leftChild = new Node(arr[leftIndex]);
		node.leftChild = leftChild;		
	}

	if(rightIndex<arr.length){
		var rightChild = new Node(arr[rightIndex]);
		node.rightChild = rightChild;		
	}
	if(index<arr.length){
		buildTree(arr,leftIndex,leftChild);
		buildTree(arr,rightIndex,rightChild);
	}	
	return node;
}