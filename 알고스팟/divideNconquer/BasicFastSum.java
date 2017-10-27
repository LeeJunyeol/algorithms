package divideNconquer;

public class BasicFastSum {
	//1부터 n까지의 합을 구하는 분할정복 알고리즘
	
	//필수조건: n은 자연수
	//1+2+...+n을 반환한다.
	int fastSum(int n) {
		//기저사례
		if(n == 1) return 1;
		if(n%2 == 1) return fastSum(n-1) + n;
		return 2*fastSum(n/2) + (n/2)*(n/2);
	}
}
