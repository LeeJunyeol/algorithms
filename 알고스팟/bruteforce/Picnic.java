package bruteforce;

import java.util.Scanner;

/*
3 
2 1 
0 1 
4 6 
0 1 1 2 2 3 3 0 0 2 1 3 
6 10 
0 1 0 2 1 2 1 3 1 4 2 3 2 4 3 4 3 5 4 5
 */

public class Picnic {
	static int c, n, m; // c(테스트케이스)<=50, 2<=n<=10, 0<=m<=n*(n-1)/2
	static boolean[][] areFriends;

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		c = Integer.parseInt(sc.nextLine().trim());

		for (int i = 0; i < c; i++) {
			n = sc.nextInt();
			m = sc.nextInt();
			sc.nextLine();
			areFriends = new boolean[10][10];
			for (int j = 0; j < m; j++) {
				int first = sc.nextInt();
				int second = sc.nextInt();
				areFriends[first][second] = true;
				areFriends[second][first] = true;
			}
			sc.nextLine();
			boolean[] taken = new boolean[10];
			System.out.println(countPairings(taken));
		}

		sc.close();

	}

	static int countPairings(boolean[] taken) {
		int firstFree = -1;

		for (int i = 0; i < n; i++) {
			if (!taken[i]) {
				firstFree = i;
				break;
			}
		}

		if (firstFree == -1)
			return 1;

		int ret = 0;

		for (int pairWith = firstFree + 1; pairWith < n; ++pairWith) {
			if (!taken[pairWith] && areFriends[firstFree][pairWith]) {
				taken[firstFree] = taken[pairWith] = true;
				ret += countPairings(taken);
				taken[firstFree] = taken[pairWith] = false;
			}
		}
		return ret;
	}
}